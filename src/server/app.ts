import * as bodyParser from "body-parser";
import * as cluster from "cluster"; // increase performance for NodeJs
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
// import * as expressJwt from 'express-Jwt';
import * as http from "http";
import * as morgan from "morgan";
import * as os from "os";
import * as path from "path";
// import * as cors from "cors";
import { configs } from "../configs/configs";
import { logger, skip, stream } from "./utils/logger";
// import { router as productRouter } from "./routers/product-router";
import { sequelize } from "./models/index";
import { Express, Request, Response } from "express";
import { Worker } from "cluster";
import { globalRoute } from "./routers/index";
// import { flash } from 'connect-flash';
// import { session } from 'express-session';
// import { passport } from 'passport';
// import { setupStrategies } from './services/profile/passport';

//options for cors midddleware ---> should review it carefully
// const options: cors.CorsOptions = {
//     allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"], // "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, X-Access-Token"
//     credentials: true,
//     methods: "GET,POST", // 'PUT, GET, POST, DELETE, OPTIONS'
//     // origin: configs.getServerConfig().apiUrl, // *
//     origin: "*", // *
//     preflightContinue: false
// };

interface ServerAddress {
    address: string;
    port: number;
    addressType: string;
}

class Server {
    private _app: Express;
    private _server: http.Server;

    constructor() {
        this._app = express();
        // this.passportSetup();

        this._app.use(compression());
        this._app.use(bodyParser.json()); // Parses urlencoded bodies
        this._app.use(bodyParser.urlencoded({ extended: false })); // Send JSON responses
        this._app.use(cookieParser());
        this._app.use(express.static(configs.getServerConfig().publicPath));
        this._app.use(morgan("combined", { skip: skip, stream: <any>stream }));
        // this._app.use(cors(options)); //deal with any Cross Origin Resource Sharing (CORS) issues we might run into
        this._app.use((error: Error, req: Request, res: Response, next: Function) => {
            if (error) {
                logger.error(`Request got error = ${error.message}`);
                res.status(400).send(error);
            }
        });

        // use JWT auth to secure the api
        // this._app.use(expressJwt({ secret: configs.getServerConfig().session.secret }).unless({ path: ['/profiles/authen', '/profiles/signup','/profiles/signin'] }));
        globalRoute(this._app);

        this._app.get('/*', function (req, res) {
            res.sendFile(configs.getServerConfig().publicPathHtml);
        });
        //enable pre-flight
        // this._app.options("*", cors(options));
        this._server = http.createServer(this._app);
       
    }

   
    private _onError(error: NodeJS.ErrnoException): void {
        if (error.syscall) {
            logger.error(`${error.syscall} with message = ${error.message}`);
            throw error;
        }

        let port = configs.getServerConfig().port;
        let bind = `Port ${port}`;

        switch (error.code) {
            case "EACCES":
                logger.error(`[EACCES] ${bind} requires elevated privileges.`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                logger.error(`[EADDRINUSE] ${bind} is already in use.`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };

    private _onListening(): void {
        let address = this._server.address();
        let bind = `port ${address.port}`;
        logger.info(`Server is Listening on ${bind}.`);
    };

    start(): void {
        if (cluster.isMaster) {
            sequelize.sync().then(() => {
                logger.info("Database synced.");

                for (let c = 0; c < os.cpus().length; c++) {
                    cluster.fork();
                }

                // Listen for dying workers
                cluster.on("exit", (worker: Worker, code: number, signal: string) => {
                    // Replace the dead worker, we're not sentimental
                    logger.info(`Worker ${worker.process.pid} died.`);
                });

                cluster.on("listening", (worker: Worker, address: ServerAddress) => {
                    logger.info(`Worker ${worker.process.pid} connected to port ${address.port}.`);
                });
            }).catch((error: Error) => {
                logger.error(error.message);
            });
        } else {
            this._server.listen(configs.getServerConfig().port);
            this._server.on("error", error => this._onError(error));
            this._server.on("listening", () => this._onListening());
        }
    }

    stop(): void {
        this._server.close();
        process.exit(0);
    }
}

let server = new Server();
server.start();
process.on("SIGINT", () => {
    server.stop();
});

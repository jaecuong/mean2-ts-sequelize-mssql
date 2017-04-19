There are a few dependencies here, so let’s talk through what each of them does:

bcrypt-nodejs ---> allows us to use a hashing algorithm to secure passwords stored in our database
body-parser ---> is middleware for our express server, that allows us to parse request bodies
cors ---> will deal with any Cross Origin Resource Sharing (CORS) issues we might run into
express ---> is of course the express server itself, which is a simple server framework for Node
jsonwebtoken ---> allows us to create, sign, and read JSON Web Tokens
mongoose ---> allows us to easily work with objects in our MongoDB database
morgan ---> outputs some useful debugging information for us
passport ---> is our authentication middleware
passport-jwt ---> is one of Passport’s authentication “Strategies” which are like plugins
passport-local ---> is another Passport Strategy, which uses simple username and password authentication

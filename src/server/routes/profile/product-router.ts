import { ProductRepository } from "../../services/index";
import { ProductInstance } from "../../models/interfaces/product-interface";
import { Request, Response, Router } from "express";

// export const router = Router();

export const InsertProduct = (req: Request, res: Response) => {
  ProductRepository.createProduct(req.body).then((product: ProductInstance) => {
    return res.status(201).send(product);
  }).catch((error: Error) => {
    return res.status(409).send(error);
  });
}

export const GetAllProducts = (req: Request, res: Response) => {
  ProductRepository.retrieveProducts().then((products: Array<ProductInstance>) => {
    return res.send(products);
  }).catch((error: Error) => {
    return res.status(500).send(error);
  });
}

// router.post("/:name", (req: Request, res: Response) => {
//   ProductRepository.updateProduct(req.params.name, req.body).then(() => {
//     return res.sendStatus(200);
//   }).catch((error: Error) => {
//     return res.status(409).send(error);
//   });
// });

// router.get("/:name", (req: Request, res: Response) => {
//   ProductRepository.retrieveProduct(req.params.name).then((product: ProductInstance) => {
//     if (product) {
//       return res.send(product);
//     } else {
//       return res.sendStatus(404);
//     }
//   }).catch((error: Error) => {
//     return res.status(500).send(error);
//   });
// });


// router.delete("/:name", (req: Request, res: Response) => {
//   ProductRepository.deleteProduct(req.params.name).then(() => {
//     return res.sendStatus(200);
//   }).catch((error: Error) => {
//     return res.status(500).send(error);
//   });
// });

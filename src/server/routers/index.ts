import { Express } from "express";
import { router as productRouter } from "./product-router";
import { router as profileRouter } from "./profile-router";

export const globalRoute = (app: Express) => {
  app.use("/api/products", productRouter);
  app.use("/api/profiles", profileRouter);
}
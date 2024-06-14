import { Router } from "express";
import { addproduct, totalNoProductSold, totalRevenues } from "./product.controllers.js";

const productRouter = Router();

productRouter.post('/product', addproduct);
productRouter.get('/product', totalRevenues);
productRouter.get('/product2', totalNoProductSold);


export default productRouter;
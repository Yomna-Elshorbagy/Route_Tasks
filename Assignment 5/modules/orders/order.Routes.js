import { Router } from "express";
import { addorder, avgOrderValue, customerEarliestOrder, customerNoOrder, customerPercentage, customersTopOrder, mostSpent, totalitems } from "./order.controler.js";
const orderRouter = Router();

orderRouter.post('/order', addorder)
orderRouter.get('/order', avgOrderValue)
orderRouter.get('/order2', customerNoOrder)
orderRouter.get('/order3', totalitems)
orderRouter.get('/order4', mostSpent)
orderRouter.get('/order5', customersTopOrder)
orderRouter.get('/order6', customerPercentage)
orderRouter.get('/order7', customerEarliestOrder)

export default orderRouter;
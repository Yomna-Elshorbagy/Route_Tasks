import express from 'express';
import customerRouter from './modules/customers/customers.Routes.js';
import productRouter from './modules/products/product.Routes.js';
import orderRouter from './modules/orders/order.Routes.js';

const server = express();
const port = 4000;

server.use(express.json());
server.use(customerRouter);
server.use(productRouter);
server.use(orderRouter);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
import { dbConnection } from "../../database/dbconnection.js";
const connection = dbConnection();

const addproduct = (req, res)=>{
    connection.query(`insert into product set ?`,req.body, (err,data)=>{
        if (err) return res.status(500).json({message: 'Query Error..', err});
        res.status(200).json({message:'product added sucessfully..'})
    });
};

const totalRevenues = (req, res)=>{
    connection.execute(`SELECT product.category, sum(orderitem.quantity * orderitem.unit_price) as TotalRevenues FROM product JOIN orderitem ON product.id = orderitem.product_id GROUP BY product.category;`, (err,data)=>{
        if (err) return res.status(500).json({message: 'Query Error..', err});
        res.status(200).json({message:'totalRevenue calculated sucessfully..', totalRevenue: data});
    });
};

const totalNoProductSold = (req, res)=>{
    connection.execute(`SELECT product.product_name, sum(orderitem.quantity) as TotalNoProduct FROM product JOIN orderitem ON product.id = orderitem.product_id GROUP BY product.product_name;`, (err,data)=>{
        if (err) return res.status(500).json({message: 'Query Error..', err});
        res.status(200).json({message:'totalNoProductSold calculated sucessfully..', totalNoProductSold: data});
    });
};


export {
    addproduct,
    totalRevenues,
    totalNoProductSold
};
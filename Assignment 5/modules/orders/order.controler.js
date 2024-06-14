import { dbConnection } from "../../database/dbconnection.js";
const connection = dbConnection();

//1- Create order.
const addorder = (req, res)=>{
    connection.query(`insert into orders set ?`,req.body, (err,data)=>{
        if (err) return res.status(500).json({message: 'Query Error..', err});
        res.status(200).json({message:'order added sucessfully..'})
    });
};

//2- API to calculate the average order value.
const avgOrderValue =(req, res)=>{
    connection.query(`SELECT AVG(total_amount) from orders`, (err,data)=>{
        if (err) return res.status(500).json({message: 'Query Error..', err});
        res.status(200).json({message:'Average Order Value :  ', data})
    });
};

//3- Write a query to list all customers who have not made any orders.
const customerNoOrder =(req, res)=>{
    connection.query(`SELECT CONCAT(customer.first_name,' ',customer.last_name) as FullName from customer WHERE NOT EXISTS (SELECT orders.id FROM orders WHERE customer.id = orders.customer_id);`, (err,data)=>{
        if (err) return res.status(500).json({message: 'Query Error..', err});
        res.status(200).json({message:'Customer With No Order :  ', data})
    });
};

//4- API to find the customer who has purchased the most items in total.
const totalitems = (req, res)=>{
    connection.execute(`SELECT customer.first_name , sum(orderitem.quantity)AS T_Items FROM customer 
JOIN orders ON  customer.id = orders.customer_id 
JOIN orderitem ON orderitem.order_id = orders.id
GROUP BY customer.id
ORDER BY T_Items  DESC
LIMIT 1;`, (err, data)=>{
    if (err) return res.status(500).json({message: 'Query Error..', err});
    res.status(200).json({message:'Customer:  ', data})
})
};

//5- API to list the top 10 customers who have spent the most money.

const mostSpent = (req, res)=>{
    connection.execute(`SELECT customer.first_name , sum(orders.total_amount)AS T_price FROM customer 
JOIN orders ON  customer.id = orders.customer_id 
GROUP BY customer.id
ORDER BY T_price  DESC
LIMIT 10;`, (err, data)=>{
    if (err) return res.status(500).json({message: 'Query Error..', err});
    res.status(200).json({message:'Customer :  ', data})
})
};

//6- API to list all customers who have made at least 5 orders.
const customersTopOrder = (req, res)=>{
    connection.execute(`SELECT customer.first_name , count(orders.id)AS T_items FROM customer 
JOIN orders ON  customer.id = orders.customer_id 
GROUP BY customer.id
HAVING T_items >=5
ORDER BY T_items  DESC;`, (err, data)=>{
    if (err) return res.status(500).json({message: 'Query Error..', err});
    res.status(200).json({message:'Customers :  ', data})
})
};

//7-API to find the percentage of customers who have made more than one order.
const customerPercentage = (req, res)=>{
    connection.execute(`SELECT customer.first_name , count(orders.id)AS T_items FROM customer 
JOIN orders ON  customer.id = orders.customer_id 
GROUP BY customer.id
HAVING T_items >=5
ORDER BY T_items  DESC;`, (err, data)=>{
    if (err) return res.status(500).json({message: 'Query Error..', err});
    res.status(200).json({message:'Customers percentage :  ', data})
})
};

//8- API to find the customer who has made the earliest order.
const customerEarliestOrder = (req, res)=>{
    connection.execute(`SELECT(SELECT COUNT(customer.id) FROM customer) AS total_customers,
        (SELECT COUNT(DISTINCT orders.customer_id) FROM orders GROUP BY customer_id HAVING COUNT(id) > 1) AS total_C_Orders;`, (err, data)=>{
    if (err) return res.status(500).json({message: 'Query Error..', err});
    const { total_customers, total_C_Orders } = data[0];
    const percent = (total_C_Orders / total_customers) * 100;
    res.status(200).json({message:'Customers percentage :  ', percent})
})
};

export {
    addorder,
    avgOrderValue,
    customerNoOrder,
    totalitems,
    mostSpent,
    customersTopOrder,
    customerPercentage,
    customerEarliestOrder
}
import { dbConnection } from "../database/dbconnection.js";
const connection = dbConnection();

export const emailCheck = (req,res,next)=>{
    connection.execute(`select email from customer where customer.email = ?`, [req.body.email], (err, data)=>{
        if (err) return res.status(500).json({ message: 'Database query error', error: err });
        if (data.length != 0) return res.status(409).json({message: 'email already exist'});
        next()
    });
}


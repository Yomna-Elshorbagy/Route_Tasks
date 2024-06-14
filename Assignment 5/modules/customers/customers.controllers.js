import { dbConnection } from '../../database/dbconnection.js';
import bcyrpt from 'bcryptjs'
const connection = dbConnection();


const signup=  (req,res)=>{

    // if there is apaswsword:
    // const {password} = req.body;
    // const hashedpass = bcyrpt.hashSync(password, 8);
    // connection.query(`insert into customer set ?`,{first_name , email , password : hashedpass}, (err, data)=>{

     connection.query(`insert into customer set ?`,req.body, (err, data)=>{
        if (err) return res.status(500).json({message: 'Query Error..', err});
        res.status(201).json({messae: 'Db added sucessfully.', customer: data});
    });
};

const signin = (req,res)=>{
    const {email} = req.body
    connection.execute(`select * from customer where customer.email = ?`,[email], (err, data)=>{
        if (err) return res.status(500).json({ message: 'Database query error', error: err });
        if (data.length !=0 ) return res.status(200).json({message: 'Login sucessfully...', userid: data[0].id});
        res.status(401).json({message: 'Email doesnot exist'});
    })
    
};

export {
    signup,
    signin
}
import { dbConnection } from "../database/coonection.js";
const connection = dbConnection();
import bcrypt from 'bcrypt'

export const checEmailExist = (req, res, next)=>{
    const Email = req.body.email;
    connection.execute(`select email from users where email = '${Email}'`, (err, data)=>{
        // connection.execute('SELECT email FROM users WHERE email = ?', [Email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query error', error: err });
        if (data.length != 0) return res.status(409).json({message: 'email already exist'});
        req.body.password = bcrypt.hashSync(req.body.password , 8)
        next()
    }) 
};
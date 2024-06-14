
import { dbConnection } from "../../database/coonection.js";
const connection = dbConnection();
import bcrypt from 'bcrypt'

const signup = (req, res)=>{
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    // without middleware : ...
    // connection.execute(`select email from users where email = ${email}`, (err,data)=>{
    //     console.log(data.length != 0);
    //     if (data) return res.json({message : "Already register"})
    //         else {
    //             connection.query( 'insert into users set ?', req.body, (err,data)=>{  //req.body this is the object
    //                 if (err) return res.status(500).json({ message: 'Database query error', error: err });
    //                 res.status(201).json({messae: 'Db added sucessfully.', user});
    //             })
    //     }
    // })

        connection.query( 'insert into users set ?', req.body, (err,data)=>{  //req.body this is the object
        if (err) return res.status(500).json({ message: 'Database query error', error: err });
        res.status(201).json({messae: 'Db added sucessfully.', user});
    
    });
}

const signin = (req, res)=>{
    const emaill = req.body.email;
    connection.execute(`select  id,email,password from users where email = '${emaill}'`, (err,data)=>{
        if (err) return res.status(500).json({ message: 'Database query error', error: err });
        if (data.length != 0){ 
            ////return array
            let match = bcrypt.compareSync(req.body.password , data[0].password); // data[0].password: hashed pass
            if (match){
              res.status(200).json({message: 'Login sucessfully...', userid: data[0].id});
            } else{
                res.status(401).json({message: 'invalid email or pass ...'});
            }
        }else {
            res.status(401).json({message: 'Email doesnot exist'})
        }
    }) 
}

const resetPassword = (req, res)=>{
  
}
export {
    signup,
    signin,
    resetPassword
}


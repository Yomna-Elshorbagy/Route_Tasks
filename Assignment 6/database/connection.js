import { Sequelize } from "sequelize";

//connection without env file:

// const sequelize = new Sequelize('FacebookDb', 'root', '',{
//     host: 'localhost',
//     dialect : 'mysql'
// });


//connection with env file:

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.user,
//     process.env.password,
//     {
//       host: process.env.hOST,
//       dialect: 'mysql',
//     }
// );

const sequelize = new Sequelize(process.env.URI)

sequelize
.authenticate()
.then(()=> console.log('DB connected sucessfully')) 
.catch((err)=>{console.log(err)});

export default sequelize;
import { Sequelize } from "sequelize";

//const connection = sql.createConnection('mysql://uiqc8si81wjrbpl8:BATU5nTS4JaSXJ24yF7J@bj5c8eambm4q2kiswdsq-mysql.services.clever-cloud.com:3306/bj5c8eambm4q2kiswdsq')
const sequelize = new Sequelize('my_posts', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
});

sequelize
.authenticate()
.then(()=> console.log('DB connected sucessfully')) 
.catch((err)=>{console.log(err)})

export default sequelize ;
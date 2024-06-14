import  sql from 'mysql2';

export const dbConnection = ()=>{

    // const connection = sql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'linked_posts'
    //     // database: 'node_db'
    // })
// = retuen sql.createconnection ({ })

     const connection = sql.createConnection('mysql://uiqc8si81wjrbpl8:BATU5nTS4JaSXJ24yF7J@bj5c8eambm4q2kiswdsq-mysql.services.clever-cloud.com:3306/bj5c8eambm4q2kiswdsq')

    connection.connect((err)=>{ // first error parameter
        if(err) return console.log('database error ...', err);
        else return console.log('DattaBase connected suceesfully ...');
    });
    return connection;
} 
import  sql from 'mysql2';

export const dbConnection = ()=>{

    const connection = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'linked_posts'
    })

    connection.connect((err)=>{ // first error parameter
        if(err) return console.log('database error ...', err);
        else return console.log('DattaBase connected suceesfully ...');
    });
    return connection;
} 
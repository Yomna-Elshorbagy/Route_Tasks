import sql from'mysql2';

export const dbConnection = ()=>{
    const connection = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node_db'
    });

    connection.connect((err)=>{
        if (err) return console.log('Db error...', err);
        else return console.log('DB connected sucessfully ...');
    });

    return connection;
}
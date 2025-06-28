import { PUBLIC_MYSQL_HOST, PUBLIC_MYSQL_PORT, PUBLIC_MYSQL_USERNAME, PUBLIC_MYSQL_PASSWORD, PUBLIC_MYSQL_DB, PUBLIC_MYSQL_POOLSIZE } from "$env/static/public";

import mysql2 from 'mysql2/promise';

let mysqlConfig = ({
    connectionLimit : 100, //important
    host     : PUBLIC_MYSQL_HOST,
    user     : PUBLIC_MYSQL_USERNAME,
    password : PUBLIC_MYSQL_PASSWORD,
    database : PUBLIC_MYSQL_DB,
    port     : PUBLIC_MYSQL_PORT,
    connectionLimit: PUBLIC_MYSQL_POOLSIZE,
    debug    :  false,
    waitForConnections: true,
    queueLimit: 0
})

let pool = mysql2.createPool(mysqlConfig);

export default pool;
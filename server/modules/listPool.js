const pg = require('pg');


//create link to sql database
const pool = new pg.Pool9{
    database: 'todo_list',
    host: 'localhost',
    port: 5432
});









module.exprots = pool;

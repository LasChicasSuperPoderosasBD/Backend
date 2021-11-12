const { Pool } = require('pg');
const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "admin",
    database: "ProyectoFinal",
})

pool.query(`select * from encuestado;`, (err, res) => {
    console.log("Los resultados del query son: ")
    console.log(res.rows);
    pool.end()
});

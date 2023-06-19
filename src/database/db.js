//Para establecer la conexión a mysql
const { createPool} = require('mysql2/promise');

const conexion = createPool({
    host:process.env.MYSQLHOST || 'localhost',
    user:process.env.MYSQLUSER || 'root',
    password:process.env.MYSQLPASSWORD || '',
    database:process.env.MYSQLDATABASE || 'siveo3',  
    port:process.env.MYSQLPORT || '3306',
})

const getConexion = ()=> {
    return conexion;
}

module.exports.miConexion = getConexion;
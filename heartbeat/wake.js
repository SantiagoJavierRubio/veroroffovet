require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
const date = new Date().toLocaleString('es', {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit"
})
connection.query(
    'INSERT INTO `Dummy` (message) values (?);', [`Prevencion automatica ${date}`],
    (err, results) => {
        if (err) throw new Error(`Error al reactivar BBDD: ${err}`)
        console.log(`Base de datos operando correctamente`)
    }
)
connection.end()

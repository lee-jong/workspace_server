const mysql = require('mysql')
const dbconfig = require('../config/database')
const connection = mysql.createConnection(dbconfig)

module.exports = app => {
    app.post('/getUserInfo', (req, res) => {
        const { token } = req.body
        if (!token) return res.json({ status: 402, message: 'go wrong request' })

        let sql = `select * from kp_user where token = '${token}'`

        connection.query(sql, (err, result) => {
            if (err) return res.json({ message: 'err', err })
            return res.json({ status: 200, message: 'get user success', result: result[0] })
        })
    })
}

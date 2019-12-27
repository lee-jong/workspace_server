const mysql = require('mysql')
const dbconfig = require('../config/database')
const connection = mysql.createConnection(dbconfig)
const jwt = require('jsonwebtoken')

const { getDate } = require('../helper/util')

module.exports = app => {
    app.post('/getToken', (req, res) => {
        if (req.body.id == undefined) return res.json({ status: 401, message: 'id undefined' })
        if (req.body.password == undefined) return res.json({ status: 401, message: 'password undefined' })
        if (!req.body.id || !req.body.password) return res.json({ status: 402, message: 'go wrong request' })
        let sql = `select * from kp_user where id = '${req.body.id}'`
        connection.query(sql, (err, result) => {
            if (err) return res.json({ status: 500, message: 'err', err })
            if (result.length == 0) return res.json({ status: 401, message: 'id undefined' })
            if (result[0].password !== req.body.password)
                return res.json({ status: 402, message: 'go wrong request pw' })

            let token = jwt.sign({ id: req.body.id }, 'secret', { expiresIn: '12h' })
            let sql2 = `update kp_user set connection_date = ${getDate(
                new Date(),
                'YYMMDD'
            )}, token='${token}' where id ='${req.body.id}'`
            connection.query(sql2, (err2, result2) => {
                if (err2) return res.json({ status: 500, message: 'err', err2 })
                console.log('check', result2)
                return res.json({ status: 200, message: 'login success', token })
            })
        })
    })

    app.post('/vaildToken', (req, res) => {
        let token = req.body.token
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.json({ status: 401, message: 'Token is not valid' })
            } else {
                console.log('check', decoded)
                return res.json({ status: 200, message: 'Token is valid', decoded })
            }
        })
    })
}

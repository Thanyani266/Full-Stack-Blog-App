const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = (req, res) => {
    // Check existing user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!")

        // Hash password and create user
        const hashedPassword = bcrypt.hash(req.body.password, saltRounds);
        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES(?)"
        const values = [req.body.username, req.body.email, hashedPassword]

        db.query(q, [values], (err, data) => {
            if(err) return res.json(err)
            return res.status(200).json("User has been created!")
        })
    })
}

const login = (req, res) => {}

const logout = (req, res) => {}

module.exports = { register, login, logout }
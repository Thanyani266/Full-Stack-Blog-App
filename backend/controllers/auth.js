const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const userRegister = (req, res) => {
    // Check existing user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], async (err, data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!")

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES(?)"
        const values = [req.body.username, req.body.email, hashedPassword]

        db.query(q, [values], (err, data) => {
            if(err) return res.json(err)
            return res.status(200).json("User has been created!")
        })
    })
}

const userLogin = (req, res) => {
    // Check User
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        // Check password
        const isPasswordCorrect = bcrypt.compare(req.body.password, data[0].password)
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

        const token = jwt.sign({id: data[0].user_id}, "jwtkey")
        const {password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
        res.status(200).json(other)
    })
}

const userLogout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: 'none',
        secure: true
    }).status(200).json("User has been logged out.")
}

module.exports = {userRegister, userLogin, userLogout}
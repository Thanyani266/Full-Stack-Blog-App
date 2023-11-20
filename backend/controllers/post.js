const db = require('../db')
const jwt = require('jsonwebtoken')

const getPosts = (req, res) => {
    const q = req.query.category ? "SELECT * FROM posts WHERE category=?" : "SELECT * FROM posts";

    db.query(q, [req.query.category], (err, data) => {
        if(err) return res.status(500).send(err)
 
        return res.status(200).json(data)
    })
}

const getPost = (req, res) => {
    const q = "SELECT `post_id`, `username`, `title`, `desc`, `image`, `author_id`, `category`, `date` FROM users u JOIN posts p ON u.user_id=p.author_id WHERE p.post_id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}

const addPost = (req, res) => {
    const q = "INSERT INTO posts(`title`, `desc`, `image`, `date`, `author_id`, `author_name`, `category`) VALUES(?)"

    const values = [
        req.body.title,
        req.body.desc,
        req.file.filename,
        req.body.date,
        req.body.author_id,
        req.body.author_name,
        req.body.category
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json({err: err.message})
        return res.json("Post has been created")
    })
}

const deletePost = (req, res) => {
    /*const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not Authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!") */

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `post_id` = ?"

        db.query(q, [postId], (err, data) => {
            if(err) return res.status(403).json("You can only delete your post!")

            return res.json("Post has been deleted!")
        })
    //})
}

const updatePost = (req, res) => {
    const q = "UPDATE posts SET `title`=?, `desc`=?, `image`=?, `category`=? WHERE `post_id`=?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.image,
        req.body.category
    ]

    const postId = req.params.id

    db.query(q, [...values, postId], (err, data) => {
        if(err) return res.status(500).json({err: err.message})
        return res.json("Post has been updated")
    })
}

module.exports = { getPosts, getPost, addPost, deletePost, updatePost }
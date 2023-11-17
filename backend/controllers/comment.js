const db = require('../db')

const getComments = (req, res) => {
    const q = "SELECT c.*, p.post_id FROM comments c JOIN posts p ON c.content_id=p.post_id WHERE content_id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}

const addComment = (req, res) => {
    const q = "INSERT INTO comments(`comment`, `content_id`, `account_id`, `writer_id`) VALUES(?)"

    const values = [
        req.body.comment,
        req.body.content_id,
        req.body.account_id,
        req.body.writer_id
    ]

    console.log(values);
    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json({err: err.message})
        return res.json("Comment has been created")
    })
}

const deleteComment = (req, res) => {

        const commentId = req.params.comment_id
        const q = "DELETE FROM comments WHERE `comment_id` = ?"

        db.query(q, [commentId], (err, data) => {
            if(err) return res.status(403).json("You can only delete your Comment!")

            return res.json("Comment has been removed!")
        })
    //})
}

const updateComment = (req, res) => {
    const q = "UPDATE comments SET `comment`=?, WHERE `comment_id`=?"

    const values = [
        req.body.comment
    ]

    const commentId = req.params.comment_id

    db.query(q, [...values, commentId], (err, data) => {
        if(err) return res.status(500).json({err: err.message})
        return res.json("Post has been updated")
    })
}

module.exports = { getComments, addComment, deleteComment, updateComment }
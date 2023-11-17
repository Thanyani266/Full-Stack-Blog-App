const express = require('express')
const { getComments, addComment, deleteComment, updateComment } = require('../controllers/comment')
const router = express.Router()

router.get('/:id', getComments)
router.post('/', addComment)
router.delete('/:id', deleteComment)
router.put('/:id', updateComment)

module.exports = router
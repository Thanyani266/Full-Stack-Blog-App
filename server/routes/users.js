const express = require('express')
const addPost = require('../controllers/user')

const router = express.Router()

router.get('/', addPost)

module.exports = router
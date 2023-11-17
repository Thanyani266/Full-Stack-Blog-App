const express = require('express')
const multer = require('multer')
const { getPosts, getPost, addPost, deletePost, updatePost } = require('../controllers/post')
const router = express.Router()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', upload.single('file'), addPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

module.exports = router
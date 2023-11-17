const express = require('express')
const cors = require('cors')
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const commentRoutes = require('./routes/comments')
const cookieParser = require('cookie-parser')
const multer = require('multer')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(express.static('images'))
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/comments', commentRoutes)

app.listen(5000, () => {
    console.log("Running on port 5000");
})
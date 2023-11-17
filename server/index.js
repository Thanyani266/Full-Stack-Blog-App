const express = require('express');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.listen(5000, () => {
    console.log("connected!");
})
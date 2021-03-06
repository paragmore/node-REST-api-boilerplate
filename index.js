const express= require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()


const PORT = 3000

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true} ,()=>{
    console.log("[CONNECTION] Connected to DB")
})

app.use(express.json())

const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)



app.listen(PORT, ()=>{
    console.log(`Server running @ ${PORT}`)
})
const express = require('express');
const path = require("path");
const staticRoute = require('./Routes/staticRoute')
const userRoute = require('./Routes/user')
const mongoose = require('mongoose')
const app = express()
const PORT = 8000;
const cookieParser = require('cookie-parser')
const {checkCookie} = require('./MiddleWares/Authentication')

mongoose.connect('mongodb://localhost:27017/new-project').then((e)=>console.log("Mongo DB Connected"))



app.set('view engine','ejs')
app.set('views',path.resolve('./Views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false})) // Form Data
app.use(cookieParser())
app.use(checkCookie("token"))



app.use("/",staticRoute)
app.use('/user',userRoute)

app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`))
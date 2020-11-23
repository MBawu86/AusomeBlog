//dependencies

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

//env configs
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGO_URI

// mongodb configs
const db = mongoose.connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// mongodb error / success ===============
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
//routes
app.get('/', (req, res)=>{
res.render('landing')
})
//copntrollers
const postController = require('./controllers/post')
app.use('/blog', postController)
//listener
app.listen(3000, ()=> console.log(`server is listening on port: ${PORT}`))

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const { default: MongoStore } = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const uploadRoutes = require('./routes/upload')
const savedRoutes = require('./routes/saved')
const authRoutes = require('./routes/auth')
const methodOverride = require("method-override");
const cors = require('cors')
const path = require('path');

require('dotenv').config({path: './config/.env'})
require('./config/passport')(passport)
connectDB()

//app.set('view engine', 'ejs')
app.use(express.static('public'))
// app.use(express.urlencoded({extended: true}))
// app.use(express.json())

app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true                // Cookies
}))

//Use forms for put / delete
//app.use(methodOverride("_method"));
app.use(logger('dev'))

// Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/api/', homeRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/saved', savedRoutes)

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/(.*)', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    


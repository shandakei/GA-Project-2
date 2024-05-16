require('dotenv').config()  

const express = require('express')
const app = express()
const port = 9090


const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')

const setCurrentUser = require('./middlewares/set_current_user')

const sessionRouter = require('./routes/session_router')
const homeRouter = require('./routes/home_router')
const postsRouter = require('./routes/posts_router')
const commentsRouter = require('./routes/comments_router')
const imagesRouter = require('./routes/images_router')
const session = require('express-session')
const favourites = require('./middlewares/favourites')




app.set('view engine', 'ejs')

app.use(expressLayout)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded())




app.use(session({
    cookie: { maxAge: 260000000 }, 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(setCurrentUser)

app.use(homeRouter)
app.use(sessionRouter)
app.use(postsRouter) //ensurelogin to view but not change
app.use(commentsRouter)
app.use(imagesRouter)
app.use(favourites)


app.listen(port, () => {
    console.log(`----------${port} IS LIVE-----------`);
})
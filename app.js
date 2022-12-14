const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()
const MongoStore = require('connect-mongo')


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SECRET, 
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    resave: false,
    saveUninitialized: true
}))


// App settings
app.set('view engine', 'jsx') 
app.engine('jsx', require('express-react-views').createEngine())

// Router setting
app.use('/blog', require('./controllers/BlogRouter'))
app.use('/users', require('./controllers/UsersRouter'))

app.get('/', (req, res) => {
    res.render('pages/HomePage')
})


app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);

    // connect to MongoDB
    mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });
    // confirm that we have a connection to MongoDB
    mongoose.connection.once('open', ()=> {
        console.log('connected to mongo');
    });


})
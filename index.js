// Modules
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

// import archives
const conn = require('./db/conn')

// Models
const Think = require('./models/Think')
const User = require('./models/User')
const Answer = require('./models/Answer')

// Routes
const thinkRoutes = require('./routes/thinkRoutes')
const authRoutes = require('./routes/authRoutes')
const answersRoutes = require('./routes/answerRoutes')

// Controllers
const ThinkController = require('./controllers/ThinkController')
const AuthController = require('./controllers/AuthController')

// Middleware
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Body answers
app.use(
    express.urlencoded({
        extended: true
    })
)

// public path
app.use(express.static('public'))
app.use(express.static('public/users'));

app.use(express.json())

// Session middleware
app.use(session({
    name: 'session',
    secret: 'nosso-secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 36000),
        httpOnly: true
    }
}))

// Bug do cookie
// https://acervolima.com/cookies-de-sessao-em-nodejs/

// set session to res
app.use((req, res, next) => {
    // Verifica se o usuario está logado, se estiver, salva no res para utilizar no front-end
    if(req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

// Flash messages
app.use(flash())

// Routes
app.use('/thinks', thinkRoutes)

// Auth Routes
app.use('/', authRoutes)

// Answer Routes
app.use('/answers', answersRoutes)

app.get('/', ThinkController.showThinks)

// conn.sync({force: true}).then(() => {
conn.sync().then(() => {
    app.listen(3333)
}).catch((err) => console.log(err))
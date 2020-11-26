const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening in', port)
})

require('dotenv').config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.SITE}/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('Database Connected'))
    .catch(e => console.log(e))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Passport config
require(('./config/passport'))(passport);


// Express Session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});




app.use('/', require('./router/index-router.js'));
app.use('/record', require('./router/record-router.js'));
app.use('/user', require('./router/user-router.js'));

app.use((req, res, next) => {
    res.status(404).render('404')
});
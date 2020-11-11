const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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


app.use('/', require('./router/record-router.js'));

app.use((req, res, next) => {
    res.status(404).render('404')
});
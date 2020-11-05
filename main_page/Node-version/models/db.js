const mongoose = require('mongoose');

const userName = 'admin';
const password = 'password';

mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.ylynn.mongodb.net/Budget?retryWrites=true&w=majority`, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./record-model');
const mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
    itemName: {
        type: String
    },
    amount: {
        type: String
    },
    date:{
        type: String
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
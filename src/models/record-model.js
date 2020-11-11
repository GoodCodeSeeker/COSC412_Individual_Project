const mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: 'This field is required.'
    },
    amount: {
        type: Number,
        required: 'This field is required.'
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
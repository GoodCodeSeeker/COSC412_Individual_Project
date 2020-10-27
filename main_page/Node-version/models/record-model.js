const mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
    vendorName: {
        type: String
    },
    itemName: {
        type: String,
        required: 'This field is required.'
    },
    amount: {
        type: String,
        required: 'This field is required.'
    },
    date: {
        type: String
    }
});


recordSchema.path('amount').validate((val) => {
    amountRegex = /[${1}](\d+)(.{0,1})(\d{0,2})/;
    return amountRegex.test(val);
    }, 'invalid amount');

recordSchema.path('date').validate((val) => {
dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
return dateRegex.test(val);
}, 'invalid date: YYYY-MM-DD');

mongoose.model('Record', recordSchema);
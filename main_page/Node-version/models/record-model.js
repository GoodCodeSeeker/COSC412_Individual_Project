const mongoose = require('mongoose');
const Validator = require('validator');

var recordSchema = new mongoose.Schema({
    vendorName: {
        type: String
    },
    itemName: {
        type: String,
        required: 'This field is required.'
    },
    amount: {
        type: Number,
        required: 'This field is required.'
    },
    date: {
        type: String,
        validate:{
        validator: (value) => {
            if (value === "") {
                return true;
              }
              return validator.isDate();
        },
        message: "{VALUE} is not valid"
    }

    }
});


recordSchema.path('amount').validate((val) => {
    amountRegex = /(\d+)(.{0,1})(\d{0,2})/;
    return amountRegex.test(val);
    }, 'invalid amount');

Validator.isDate('date', function(value, requirement, attribute) { // requirement parameter defaults to null
    if(value.toString()==""){return true;}
    return value.match(/(\d{4})-(\d{2})-(\d{2})/);
  }, 'The :attribute date is not in the format YYYY-MM-DD.');


mongoose.model('Record', recordSchema);
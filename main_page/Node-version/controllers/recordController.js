const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Record = mongoose.model('Record');

router.get('/', (req, res) => {
    res.render("record/addOrEdit", {
        viewTitle: "Insert Record"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var record = new Record();
    record.vendorName = req.body.vendorName;
    record.itemName = req.body.itemName;
    record.amount = req.body.amount;
    record.date = req.body.date;
    record.save((err, doc) => {
        if (!err)
            res.redirect('record/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("record/addOrEdit", {
                    viewTitle: "Insert Record",
                    record: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Record.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('record/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("record/addOrEdit", {
                    viewTitle: 'Update Record',
                    record: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Record.find((err, docs) => {
        if (!err) {
            res.render("record/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving record list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'itemName':
                body['itemNameError'] = err.errors[field].message;
                break;
            case 'amount':
                body['amountError'] = err.errors[field].message;
                break;
            case 'date':
                body['dateError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Record.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("record/addOrEdit", {
                viewTitle: "Update Record",
                record: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Record.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/record/list');
        }
        else { console.log('Error in record delete :' + err); }
    });
});

module.exports = router;
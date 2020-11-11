const express = require('express');
const router = express.Router();
const Record = require('../models/record-model');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', async (req, res) => {
    
    try {
        const arrayRecordDB = await Record.find()
        console.log(arrayRecordDB)
    
        res.render('record', {
            arrayRecord: arrayRecordDB
        })

    } catch (error) {
        console.log(error)
    }
    
})

router.get('/create', (req, res) => {
    res.render('create')
});

router.post('/', urlencodedParser,[
    check('itemName',"Item Name cannot be empty.").exists(),
    check('amount', "Amount cannot be empty or non numeric.").exists().isCurrency({require_symbol: false, allow_decimal: true, require_decimal: false, digits_after_decimal: [2]}),
    check('date',"date not in format of YYYY/MM/DD").exists().isDate()
],async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('create', {
            alert
        })
}else{
    const body = req.body;

    try {
        await Record.create(body)
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}
});

router.get('/:id', async (req, res) => {
    
    const id = req.params.id
    
    try {
        const recordDB = await Record.findOne({ _id: id })
        console.log(recordDB);
        res.render('detail', {
            record: recordDB,
            error: false
        })
    } catch (error) {
        console.log(error)
        res.render('detail', {
            error: true,
            message: 'The selected id is not found'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const recordDB = await Record.findByIdAndDelete({ _id: id })

        if (recordDB) {
            res.json({
                status: true,
                message: 'Deleted'
            })
        } else {
            res.json({
                status: false,
                message: 'Cannot be deleted'
            })
        }

    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body

    try {

        const recordDB = await Record.findByIdAndUpdate(id, body, { useFindAndModify: false })
        console.log(recordDB)
        
        res.json({
            status: true,
            mensaje: 'Editado'
        })

    } catch (error) {
        console.log(error)

        res.json({
            status: false,
            mensaje: 'No editado'
        })

    }
})

module.exports = router;
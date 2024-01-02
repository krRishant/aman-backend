const express = require('express')
const colors = require('colors');
const {get_data,create_record,update_record,delete_record} = require('../controller/dataController')
const userModel = require('../model/data_model');

// router
const router = express.Router()


// endpoint for getting all the records and custom middleware to find specific records

router.post('/getRecords',async (req,res,next)=>{

    // destructuring from request body for finding specific records 
    // if not found then showing all records 
    const {_id, enrollment} = req.body;
    if(_id || enrollment){
        try {
            const record = await userModel.findOne({
                $or: [
                    { enrollment: req.body.enrollment},
                    { _id: req.body._id }
                ]
            })
            
            return res.status(200).json(record);
        } catch (error) {

            //handling errors if record with specific enrollment or -id is not found
            return res.status(404).json(error.message);
        }
    }

    next() 
},get_data)


// endpoint for creating new record


router.post('/createRecord',(req, res, next)=>{
    // handling errors or insufficient data
    const { enrollment, first_name} = req.body;

    if (!enrollment || !first_name ) {
        console.log('enrollment , first_name not found'.bgRed.blue);
        return res.status(400).json({ error: 'Incomplete data. Please provide enrollment, first_name, email, and contact.' });
    }
    next();

},create_record)



// end point for updating records
router.post('/updateRecord', update_record);


// end point for deleting records 
router.post('/deleteRecord', delete_record);

module.exports = router;
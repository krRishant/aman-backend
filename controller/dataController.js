const userModel = require('../model/data_model');
const colors = require('colors');

// controller function for getting all the records from tha database
const get_data = async (req,res) =>{
    try {
        const data = await userModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(404).json(error.message);
    }
}

//controller function for creating a new record
const create_record = async (req,res) =>{
    try {
        const data = await userModel.create(req.body);
        console.log(`data id : ${data._id}`.bgGreen);
        return res.status(200).json(`new record created with id ${data._id}`);
    } catch (error) {
        console.log(`${error}`.bgRed);
        return res.status(400).json(`error creating record ${error.message}`);
    }
}

// controller function for updating a record
const update_record = async (req, res ) => {
    try {
        const existing_record = await userModel.findOne({
            $or: [
                { enrollment: req.body.enrollment},
                { _id: req.body._id }
            ]
        })
        if(existing_record){
            const new_record = {
                "first_name": req.body.first_name ? req.body.first_name : existing_record.first_name,
                "last_name": req.body.last_name ? req.body.last_name : existing_record.last_name,
                "email": req.body.email ? req.body.email : existing_record.email,
                "contact": req.body.contact ? req.body.contact : existing_record.contact
            }
            const updatedRecord = await userModel.findOneAndUpdate({
                $or: [
                    { enrollment: req.body.enrollment},
                    { _id: req.body._id }
                ]
            },new_record);
            console.log(`Updated record : ${updatedRecord}`.bgGreen);
            res.status(200).json(`Record updated : ${updatedRecord._id}`);
        }else{
            res.status(404).json(`Response : NO user record found`);
        }
    } catch (error) {
        console.log(`Error : ${error.message}`.bgRed);
        res.status(404).json(error.message);
    }
}


// controller function for deleting a record
const delete_record = async (req, res) => {
    try {
        const existing_record = await userModel.findOneAndDelete({
            $or: [
                { enrollment: req.body.enrollment},
                { _id: req.body._id }
            ]
        })

        console.log(`delete_record: ${existing_record.enrollment}`.bgGreen);
        res.status(200).json(`Record Deleted : ${existing_record.enrollment}`);

    } catch (error) {
        console.log(`Error : ${error.message}`.bgRed);
        res.status(404).json(error.message);
    }
}


module.exports = {get_data,create_record,update_record,delete_record}

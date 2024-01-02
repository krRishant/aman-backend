const mongoose = require('mongoose')

//schema design

const userSchema = new mongoose.Schema({
    enrollment: {
        type: String,
        required: [true, "Enrollment delail is required"],
        unique: true //one enrollment per user 
    },
    first_name: {
        type:String,
        required:[true,"Name is Required"]
    },
    last_name: {
        type:String
    },
    email: { 
        type:String,
        unique:true // multiple users cant have same email
    },
    contact:{
        type: String,
        required:[true,"contact no  is Required"]
    }
    
},{ timestamps:true} // automatically adds timestamps to all the records 
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

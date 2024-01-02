const mongoose = require('mongoose');
const colors = require('colors');

// connection to database.. 

const connectDb = async () =>{

        mongoose.connect(process.env.MONGO_URL)
                .then(()=>{console.log(`connected to ${mongoose.connection.host}`.bgWhite.green.bold)})
                .catch(err => console.log(`Error : ${err}`.bgRed ))
        
        

}

module.exports = connectDb;
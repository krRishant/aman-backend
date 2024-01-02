const mongoose = require('mongoose');
const colors = require('colors');


// connection to database.. 

const connectDb = async (MONGO_URL) =>{
        
        
        mongoose.connect(MONGO_URL)
                .then(()=>{console.log(`connected to ${mongoose.connection.host}`.bgWhite.green.bold)})
                .catch(err => console.log(`Error : ${err}`.bgRed ))
        
        

}
// connectDb();
module.exports = connectDb;
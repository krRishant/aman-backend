const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv')
const mongoDb = require('./config/connectDb');
const Routes = require('./routes/Routes');
const bodyParser = require('body-parser');


PORT = process.env.PORT || 8000;


//dotenv configuration
dotenv.config();

// database connection
const MONGO_URL = process.env.MONGO_URL;
mongoDb(MONGO_URL);

//server creation
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//testing server endpoint
app.get('/', (req, res) => {
    res.send("hellow world");
})

//using routes for CRUD endpoints 
app.use('/records',Routes)


app.listen(PORT, () =>{
    console.log(`listenting on prt ${PORT}`.bgCyan);
})
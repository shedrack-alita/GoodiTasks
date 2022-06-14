
// Module importations
const express = require("express");
const bodyParser = require("body-parser");  
const path = require("path");
const app = express();

// Connection port is 4500
const PORT = process.env.APP_PORT || 4500

// A library that process data sent through HTTP request body
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

// Importing functions from another Object or class
const route = require("./src/routes/userRoute");
const {db_Connection} = require("./dbConfig/db");
const cookieParser = require("cookie-parser");

// Instances of a class
app.use(route);
app.use(cookieParser);
db_Connection();

// Event listener
app.listen(PORT, ()=>{
    console.log("Server running on port: ", PORT);
})
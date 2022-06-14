

const mongoose = require("mongoose");

const db_Connection = ()=>{
    let dbConn = mongoose.connect("mongodb://localhost:27017/Task");
    if (dbConn) {
        console.log("DB Connected")
    }
    else{
        console.log("Connection Error");
    }

};

module.exports = {db_Connection};
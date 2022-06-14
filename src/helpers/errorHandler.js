const res = require("express/lib/response");

const errorHandler = (error)=>{
let errors = {email:" ", phone_no:" ",};
    if (error.code === 11000){
        if (err.message.includes("email_1 dup key")){
            errors.email = "Email address has already been taken"
        };
        if (error.message.includes("phone_no_1 dup key")){
            errors.phone_no = "Phone number already exist"
        };
        return {errors}
    }
        
    console.log(error.message);
}

module.exports = {errorHandler};
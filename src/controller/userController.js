

// Importing the user model
const Register = require("../model/userModel");
const {errorHandler} = require("../helpers/errorHandler");

// Importing Modules
const jwt = require('jsonwebtoken');
const { cookie } = require("express/lib/response");


// The user registration callback function
module.exports = {
    register: async(req,res)=> {
        let {first_name, last_name, email, phone_no, gender, occupation, password, confirm_pass} = req.body;

// User input validation
        let regexName = /^[\w][^0-9_!¡?÷?¿\s./\\+=@#$%ˆ&*(){}|~<>;\-:[\]]{1,30}$/;
        let regexEmail =  /(^[a-zA-Z0-9\.]{2,10})+@([\w-]+\.)+[\w-]{1,3}$/;
        let regexPhoneNo =  /(^(\+[0-9]{1,3}|0)[0-9]{3}( ){0,1}[0-9]{7,8}){1,11}\b/;
        let regexGender = /^((M|m)ale)$|^((F|f)emale)$/
        let regexPassword = /([a-zA-Z0-9]{6,16})+([\+=*&^%$#@!~?":.,])+/;

            if (first_name.length<1) {
                return res.status(401).json({error: "First name is required"});
            }
            if (!regexName.test(first_name)) {
                return res.status(401).json({error: "Name format not accepted"});
            }

            if (last_name.length<1) {
                return res.status(401).json({error: "Last name is required"});
            }
            if (!regexName.test(last_name)) {
                return res.status(401).json({error: "Name format not accepted"});
            }

            if (email.length<1) {
                return res.status(401).json({error: "Email is required"});
            }
            if (!regexEmail.test(email)) {
                return res.status(401).json({err: "Invalid email address"});
            }

            if (phone_no.length<1) {
                return res.status(401).json({error: "Enter your phone number"});
            }
            if (!regexPhoneNo.test(phone_no)) {
                return res.status(401).json({error: "Invalid phone number"});
            }

            if (password.length<1) {
                return res.status(401).json({error: "Enter your password"});
            }
            if (!regexPassword.test(password)) {
                return res.status(401).json({error: "Invalid password format"});
            }
            if (!confirm_pass === password) {
                return res.status(401).json({error: "Incorrect password"});
            }
            
            if (gender.length<1) {
                return res.status(401).json({error: "Gender field should not be empty"});
            }
            if (!regexGender.test(gender)) {
                return res.status(401).json({error: "Gender should be either male or female "});
            }

            if (occupation.length<1) {
                return res.status(401).json({error: "Identify your occupation"});
            }
        try {
           const User = await Register.create({
              first_name: first_name,
              last_name: last_name,
              email: email,
              phone_no: phone_no,
              gender: gender,
              occupation: occupation,
              password: password,
            })

            let secrete = 'Provide a long and strong security key here';

            const privateToken = jwt.sign({first_name:User.first_name, last_name:User.last_name, email:_user.email},secrete, {expiresIn: 60*60*24*1000});
            console.log(privateToken)

            res.cookie('token', privateToken, 60*60*24*1000);
            
            // console.log("New user has registered: ", _user)
            return res.status(200).json({privateToken})

        }catch (error) {
            let err = errorHandler(error);
           //console.log(error)
           return res.status(200).json({err});
        }
        }
}
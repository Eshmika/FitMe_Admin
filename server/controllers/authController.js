const Admin = require('../model/Admin');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

    

const registerAdmin = async(req, res) => {
    try {
        const { name, email, username, aid, password, SecAnswer } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: 'Email is required'
            })
        };

        if(!contactnumber){
            return res.json({
                error: 'Phone number is required'
            })
        };

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };      
        
        if(!SecAnswer){
            return res.json({
                error: 'Security answer is required'
            })
        };    

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be minimum 6 characters long'
            })
        };

        const existemail = await Admin.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Admin.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const admin = await Admin.create({
            name,
            email,
            contactnumber,
            username,
            password: hashedPassword,
            SecAnswer
        });

        return res.json({
            admin
        })

    } catch (error) {
        console.log(error);
    }
}

//view profile student
const getProfile = async (req, res) =>{
    Admin.find()
    .then(admin => res.json(admin))
    .catch(err => res.json(err));
     
}


module.exports = {
    test,
    registerAdmin,
    getProfile
}
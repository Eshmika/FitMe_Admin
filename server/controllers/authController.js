const Admin = require('../model/Admin');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

    

//Register
const registerAdmin = async(req, res) => {
    try {
        const { name, email, username, aid, password } = req.body;

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

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };  
        
        if(!aid || aid.length < 9 || aid.length > 9){
            return res.json({
                error: 'Admin id is required and should be minimum 8 characters long'
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

        const existstdid = await Admin.findOne({aid});
        if(existstdid){
            return res.json({
                error: 'Admin id is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const admin = await Admin.create({
            name,
            email,
            username,
            aid,
            password: hashedPassword
        });

        return res.json({
            admin
        })

    } catch (error) {
        console.log(error);
    }
}
    
//Login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({username});

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        }; 

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        if(!admin){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, admin.password);

        if(match){
            jwt.sign({
                id: admin._id
            }, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(admin)
            })                
           
        }
        if(!match){
            res.json({
                error: 'Password is incorrect'            
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//logout
const logout = (req, res) => {
    res.clearCookie('token').json({
        message: 'Logged out successfully'
    })
}

//view profile 
const getProfile = async (req, res) =>{
    Admin.find()
    .then(admin => res.json(admin))
    .catch(err => res.json(err));
     
}


module.exports = {
    test,
    registerAdmin,
    loginAdmin,
    getProfile,
    logout
}
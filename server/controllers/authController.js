const Admin = require('../model/Admin');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

//Register 
// const registerAdmin = async(req, res) => {
//     try {
//         const { name, email, username, aid, password } = req.body;

//         if(!name){
//             return res.json({
//                 error: 'Name is required'
//             })
//         };

//         if(!email){
//             return res.json({
//                 error: 'Email is required'
//             })
//         };

//         if(!username){
//             return res.json({
//                 error: 'Username is required'
//             })
//         };  
        
//         if(!aid || aid.length < 9 || aid.length > 9){
//             return res.json({
//                 error: 'Admin id is required and should be minimum 8 characters long'
//             })
//         }; 

//         if(!password || password.length < 6){
//             return res.json({
//                 error: 'Password is required and should be minimum 6 characters long'
//             })
//         };

//         const existemail = await Admin.findOne({email});
//         if(existemail){
//             return res.json({
//                 error: 'Email is already in use'
//             })
//         };

//         const existusername = await Admin.findOne({username});
//         if(existusername){
//             return res.json({
//                 error: 'Username is already in use'
//             })
//         };

//         const existstdid = await Admin.findOne({aid});
//         if(existstdid){
//             return res.json({
//                 error: 'Admin id is already in use'
//             })
//         };

//         const hashedPassword = await hashPassword(password);

//         const user = await Admin.create({
//             name,
//             email,
//             username,
//             aid,
//             password: hashedPassword
//         });

//         // const wallet = await Wallet.create({
//         //     stdid,
//         //     studentname: name,
//         //     walletid,
//         //     balance: "0.00"
//         // });

//         return res.json({
//             user,
//             // wallet
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }
    
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

// // froget password student
// const forgotPasswordstudent = async (req, res) => {
//     try {
//         const { username, SecAnswer, newPassword } = req.body;
//         if (!username) {
//             return res.json({ message: "Username is required" });
//         }
//         if (!SecAnswer) {
//             return res.json({ message: "Answer is required" });
//         }
//         if (!newPassword) {
//             return res.json({ message: "New Password is required" });
//         }
//         //check
//         const student = await Student.findOne({ username, SecAnswer });
//         //validation
//         if (!student) {
//             return res.json({
//             success: false,
//             message: "Wrong username Or security answer",
//           });
//         }
//         const hashed = await hashPassword(newPassword);
//         await Student.findByIdAndUpdate(student._id, { password: hashed });
//         return res.json({
//           success: true,
//           message: "Password Reset Successfully",
//         });
//       } catch (error) {
//         console.log(error);
//         return res.json({
//           success: false,
//           message: "Something went wrong",
//           error,
//         });
//       }
// }

//view profile student
// const getProfile = async (req, res) =>{
//     const { token } = req.cookies;
//     if(token){
//         jwt.verify(token, process.env.JWT_SECRET, {}, (err, student)=>{
//             if(err) throw err;
//             Student.findById({_id:student.id})
//             .then(student => res.json(student))
//             .catch(err => res.json(err));
//         })
//     }else{
//         res.json(null);
//     }        
// }

// //view profile student by id
// const getProfileid = (req, res) => {
//     const id = req.params.id;
//     Student.findOne({stdid:id})
//     .then(id => res.json(id))
//     .catch(err => res.json(err));
// }

// //update get profile student
// const getupdateProfile = (req, res) =>{

//     const { token } = req.cookies;
//     if(token){
//         jwt.verify(token, process.env.JWT_SECRET, {}, (err, student)=>{
//             if(err) throw err;
//             Student.findById({_id:student.id})
//             .then(student => res.json(student))
//             .catch(err => res.json(err));
//         })
//     }else{
//         res.json(null);
//     }       
// }

// //update profile student by id
// const updateProfileid = (req, res) => {
//     const id = req.params.sid;
//     Student.findByIdAndUpdate({_id:id},{
//         name: req.body.name,
//         email: req.body.email,
//         gender: req.body.gender,
//         contactnumber: req.body.contactnumber,
//         username: req.body.username,
//         parentname: req.body.parentname,
//         parentphonenumber: req.body.parentphonenumber,
//         SecAnswer: req.body.secanswer
//     })
//     .then(student => res.json(student))
//     .catch(err => res.json(err));
// }

// //update profile student
// const updateProfile = async(req, res) =>{

//     const { token } = req.cookies;  
    
//     if(token){
//         jwt.verify(token, process.env.JWT_SECRET, {}, async (err, student)=>{
//             if(err) throw err;            
            
//             // const hashedPassword = await hashPassword(pass);
//             Student.findByIdAndUpdate({_id:student.id},{
//                 name: req.body.name,
//                 email: req.body.email,
//                 gender: req.body.gender,
//                 contactnumber: req.body.contactnumber,
//                 username: req.body.username,
//                 parentname: req.body.parentname,
//                 parentphonenumber: req.body.parentphonenumber,
//                 SecAnswer: req.body.secanswer
//             })
//             .then(student => res.json(student))
//             .catch(err => res.json(err));
//         })
//     }else{
//         res.json(null);
//     }  
// }    

// //logout
// const logout = (req, res) => {
//     res.clearCookie('token').json({
//         message: 'Logged out successfully'
//     })
// }


module.exports = {
    test,
    // registerAdmin,
    loginAdmin,
    // getProfile,
    // getProfileid,
    // getupdateProfile,
    // updateProfile,
    // updateProfileid,
    // logout
}
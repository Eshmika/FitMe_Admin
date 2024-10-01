const Feedback = require('../model/Feedback');


const getall = async (req, res) =>{
    Feedback.find()
    .then(pay => res.json(pay))
    .catch(err => res.json(err));
}



module.exports = {
    getall
    
}
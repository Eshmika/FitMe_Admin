const Pay = require('../model/OnlinePayments');

const getall = async (req, res) =>{
    Pay.find()
    .then(pay => res.json(pay))
    .catch(err => res.json(err));
}

module.exports = {
    getall
}
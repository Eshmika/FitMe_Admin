const Pay = require('../model/OnlinePayments');

const getall = async (req, res) =>{
    Pay.find()
    .then(pay => res.json(pay))
    .catch(err => res.json(err));
}

//delete Online
const deleteonline = (req, res) => {
    const id = req.params.id;
    Pay.findByIdAndDelete({_id:id})
    .then(Payments => res.json(Payments))
    .catch(err => res.json(err));
}

module.exports = {
    getall,
    deleteonline
}
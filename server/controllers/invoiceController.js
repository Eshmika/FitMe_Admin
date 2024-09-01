const Invoice = require('../model/Invoice');


const getall = async (req, res) =>{
    Invoice.find()
    .then(invoice => res.json(invoice))
    .catch(err => res.json(err));
}

//delete Online
const deleteinvoice = (req, res) => {
    const id = req.params.id;
    Invoice.findByIdAndDelete({_id:id})
    .then(invoice => res.json(invoice))
    .catch(err => res.json(err));
}

module.exports = {
    getall,
    deleteinvoice
}
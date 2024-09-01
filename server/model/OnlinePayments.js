const mongoose = require('mongoose');

const OnlineSchema = new mongoose.Schema({
    cardname:'String',
    cardnumber: 'Number',
    expiredate: 'String', 
    securitycode: 'Number',    

});

const OnlineModel = mongoose.model('OnlinePayments' ,OnlineSchema)

module.exports = OnlineModel;
const mongoose = require('mongoose');

const feedbackschema = new mongoose.Schema({
    customername:'String',
    email: 'String',
    product: 'String',
    comment: 'String', 
    rate: 'Number',
    submitdate: 'Date',
        

});

const feedbackModel = mongoose.model('Feedback' ,feedbackschema)

module.exports = feedbackModel;
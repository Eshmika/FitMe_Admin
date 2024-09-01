const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoicenumber:'Number',
    invoicedate: 'Date',
    customername: 'String', 
    customeremail: 'String',
    customeraddress: 'String', 
    itemname: 'String',
    itemqunatity:'Number',
    itemprice: 'String',
    deliverycharge: 'String',
    total: 'String',       

});

const Invoicemodel = mongoose.model('Invoice' ,InvoiceSchema)

module.exports = Invoicemodel;
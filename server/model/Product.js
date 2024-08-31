const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: 'String', required: true},    
    code: {type: 'String', required: true, unique: true},
    category: {type: 'String', required: true},
    subcategory: {type: 'String', required: true},
    brand: {type: 'String', required: true},
    size: {type: 'String', required: true},
    color: {type: 'String', required: true},
    material: {type: 'String', required: true},
    price: {type: 'Number', required: true},
    stock: {type: 'Number', required: true}

},{timestamps: true})

const ProductModel = mongoose.model('product_details', productSchema);

module.exports = ProductModel;
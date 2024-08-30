const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {type: 'String', required: true},
    email: {type: 'String', required: true},
    username: {type: 'String', required: true},
    aid: {type: 'String', required: true, unique: true},
    password: {type: 'String', required: true},
    SecAnswer: {type: 'String', default: 'None'},

},{timestamps: true})

const AdminModel = mongoose.model('admin_details', adminSchema);

module.exports = AdminModel;
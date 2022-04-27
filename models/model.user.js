const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    password: String,
    phoneNumber: String,
    email: String,
    name: String,
    address: String,
    age: String,
    typeUser: String,
    order: Boolean,
    product: Object
});

const users = mongoose.model('users',userScheme,'users');


module.exports = users;
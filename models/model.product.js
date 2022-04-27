const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    name: String,
    price: String,
    priceNew: String,
    dateUse: {
        apply: Boolean,
        date: String
    },
    moreInfor: String,
    mainInforProduct: String,
    descript: String,
    imgDemo: [String],
    linkVideoDemo: String
});

const products = mongoose.model('products',productScheme,'products');


module.exports = products;
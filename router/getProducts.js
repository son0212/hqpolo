const express = require('express');

const products = require('../models/model.product.js');

const router = express.Router();

router.get('/selling-product',async (req,res)=>{
    const listProduct = await products.find();
    res.send(listProduct);
});

router.get('/get-product',async(req,res)=>{
    const product = await products.findById(req.query._id);
    res.send(product);
});

module.exports = router;
const express = require('express');
const fs = require('fs');

const products = require('../models/model.product.js');

const router = express.Router();

router.post("/uploadfile",(req,res)=>{
  if(!req.files){
      return res.status(400).json({
          errCode: true,
          message: "No image upload"
      });
  }
  const file = req.files.file;
  try {
    if(fs.existsSync(`${__dirname.split('\\').splice(0,__dirname.split('\\').length-1).join('/')}/fontend/public/uploads/${file.name}`)){
      fs.unlinkSync(`${__dirname.split('\\').splice(0,__dirname.split('\\').length-1).join('/')}/fontend/public/uploads/${file.name}`)
    }
    // let data = fs.readFileSync(`${__dirname.split('\\').splice(0,__dirname.split('\\').length-1).join('/')}/fontend/public/uploads/${file.name}`)
    // if(data){
    //   fs.unlink(`${__dirname.split('\\').splice(0,__dirname.split('\\').length-1).join('/')}/fontend/public/uploads/${file.name}`)
    // }
  } finally {
    file.mv(`${__dirname.split('\\').splice(0,__dirname.split('\\').length-1).join('/')}/fontend/public/uploads/${file.name}`,err=>{
      return res.status(500).send(err);
    });

    res.status(200).json({
        'nameFileUploaded':file.name,
        'pathFileUploaded': `/uploads/${file.name}`,
        errCode:false
    });
  }
  
});

router.post("/remove-file",(req,res)=>{
  fs.unlink(`${__dirname.split('\\').splice(0,__dirname.split('\\').length-1).join('/')}/fontend/public${req.body.removePath}`,(err)=>{
    return res.status(400).json({
      errCode: true,
      message: "Can't remove this file with your path"
    });
  });
  
})

router.post('/upload-product',async (req,res)=>{
  await products.create({
    name: req.body.name,
    price: req.body.price,
    priceNew: req.body.priceNew,
    dateUse: {
        apply: false,
        date: req.body.dateUse
    },
    moreInfor: req.body.moreInfor,
    mainInforProduct: req.body.mainInforProduct,
    descript: req.body.descript,
    imgDemo: req.body.imgDemo,
    linkVideoDemo: req.body.linkVideoDemo
});
  return res.status(200).json({
    message:"success"
  });
})

module.exports = router;
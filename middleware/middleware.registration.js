const bcrypt = require('bcrypt');
const users = require('../models/model.user.js');

module.exports = async (req,res,next)=>{
  var errors = "";
  function ResError(err){
    return res.status(400).json({
      errCode: true,
      message: err
    });
  }
  if(!req.body.email||!req.body.password||!req.body.phoneNumber||!req.body.name||!req.body.address||!req.body.age){
    errors = "You left a box blank. please check it again!!!!"
    ResError(errors);
    return;
  }
  if(req.body.email){
    if(/["'`!#$%!&^*(){},[]\\|:;<>?-_=+~,/.test(req.body.email)){
      errors = "This email does not exist";
      ResError(errors);
      return;
    }
  }
  if(req.body.password){
    
    if(/['"@.`#$%!&^*[A-Z](){}[]\,\|:;<>?-_=+~/.test(req.body.password)){
      errors = "Passwords cannot contain special characters such as: ' ` { [ ) . ; : ....."
      ResError(errors);
      return;
    }
    
  }
  if(req.body.phoneNumber){
    if(typeof parseInt(req.body.phoneNumber) != "number"){
      errors = "This is not a phone number";
      ResError(errors);
      return;
    }
    if(req.body.phoneNumber.length != 10){
      errors = "This is not a phone number";
      ResError(errors);
      return;
    }
  }
  if(req.body.name){
    
    if(/[@.'`!#$%!&^*[A-Z](){}[\]\\|,:;<>?\/-_=+~1234567890]/.test(req.body.name)){
      errors = "This is not a name"
      ResError(errors);
      return;
    }
    
  }
  if(req.body.address){
    
    if(/[@'`!#$%!&^*()[A-Z]{}[\]\\|,:;<>\/?-_=+~]/.test(req.body.address)){
      errors = "This is not a address"
      ResError(errors);
      return;
    }
    
  }
  if(req.body.age){
    if(typeof parseInt(req.body.age) !== "number"){
      errors = "This is not a age";
      ResError(errors);
      return;
    }
  }

  const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(req.body.password,salt);
	users.create({
		name:req.body.name,
		phoneNumber:req.body.phoneNumber,
		address:req.body.address,
		email:req.body.email,
		password: hash,
    age: req.body.age
	});
  next();
}
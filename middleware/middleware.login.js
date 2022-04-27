const bcrypt = require('bcrypt');
const users = require('../models/model.user.js');

module.exports = async (req,res,next)=>{
  var errors = "";
  console.log(req.body);
  function ResError(errors){
    return res.status(400).json({
      errCode: true,
      message: errors
    });
  }
  const user = await users.findOne({email:req.body.email});
	if(!user||user.length<=0){
		errors = 'Account does not exist';
		ResError(errors);
	}
	if(req.body.password.length == 0){
		errors = "You can't leave the password field blank."
		ResError(errors);
	}
    if(await bcrypt.compare(req.body.password,user.password) == false){
		errors = 'wrong password!!!';
		ResError(errors);
	}
  next();
}
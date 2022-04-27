module.exports = (req,res)=>{
    return res.status(200).json({
        errCode: false,
        message: "ok"
    });
}
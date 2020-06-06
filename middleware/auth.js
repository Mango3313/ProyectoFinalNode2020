const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(404).json({code:"404",message:"Ups! Algo salio mal..."});
    }
};
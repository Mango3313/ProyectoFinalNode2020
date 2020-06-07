const express = require('express');
const rutaAcceso = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/basedatos');

rutaAcceso.get('/',(req,res,next)=>{
    res.send('Estas en login');
});
rutaAcceso.post('/', async (req,res,next)=>{
    const {correo,contrasena} = req.body;
    let query = "SELECT id_us,tipousr FROM usuarios WHERE correo = ? AND contrasena = ? AND tipousr = ?;";
    const resultado = await db.query(query,[correo,contrasena,'A']).catch((error)=>{
        console.log(error);
        res.status(500).json({code:500,message:"Ocurrio un errror"});
    });
    console.log(resultado);
    if(resultado.length == 1){
        const token = jwt.sign({
            id_usu:resultado[0].id_usu,
            tipousr:resultado[0].tipousr
        },process.env.SECRET);
        res.status(200).json({code:200,message:token});
    }else{
        res.status(404).json({code:404,message:"Parece que ese usuario no existe, revisa las credenciales e intentalo de nuevo"});
    }
});

module.exports = rutaAcceso;
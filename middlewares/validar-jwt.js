const { request } = require("express");
const jwt= require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async(req= request, res, next)=>{
    const token =req.header("x-token");
    //verificar que venga el token
    if(!token){
        return res.status(401).json({
            msg:"No se reconoce token",
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuario
        const usuario= await Usuario.findById(uid);

         //verificar si el usuario existe
        if(!usuario){
            return res.status(401).json({
                msg:"El token no valido - usuario no existe",
            })
        }
        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(401).json({
                msg:"El token no valido - usuario suspendido",
            })

        }
        //guardando en la request los datos del usuario
        req.usuario= usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:"Token no valido",
        })
    }

    


}

module.exports={
    validarJWT,
}
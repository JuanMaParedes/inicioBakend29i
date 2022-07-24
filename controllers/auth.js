const bcrypt= require("bcryptjs");
const { generarJWT } =require ("../helpers/generar-jwt")
const Usuario = require("../models/usuario");






const login= async(req, res) =>{
    const {email, password}=req.body;

    try {
         //verificar si el email existe
         const usuario= await Usuario.findOne({email});
         if(!usuario){
            return res.status(400).json({
                msg: "Email | Passaword Incorrectos",
            });
         }


        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"Usuario suspendido |  Comuniquese con el administrador",
            });
        }

        //verificar contraseña
        const validPassword= bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                 msg: "Email | Passaword Incorrectos",
             });
        }
    

         //genegar token
        const token =await generarJWT(usuario.id);


         res.status(200).json({
            usuario,
            token,
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Comuniquese con el Administrador",
        })
        
    }
  
}

module.exports={
    login,
}
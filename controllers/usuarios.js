const{request, resolve} = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs");

const usuariosGet= async(req=request, res=resolve)=> {
    const {limite=5, desde=0}= req.query;
    const usuario=await Usuario.find({estado:true})
    .skip(desde)
    .limit(limite)

    const total= await Usuario.countDocuments({estado:true});

    //hacer peticiones simultaneas
   /*  const {usuario, total}= await Promise.all([
    Usuario.find({estado:true})
    .skip(desde)
    .limit(limite),
    Usuario.countDocuments({estado:true})
    ]) */
    res.json({
    total,
    usuario,
  
}); 
}

const usuariosPost= async(req=request, res=resolve)=> {
    /* // varificar validaciones. si el correo es valido
    const errors= validationResult(req);
    //isEmpty = si esta vacio
    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    } */

    const {nombre, email, password,role}= req.body;
    const usuario=new Usuario({nombre, email, password,role});

    // validar si el email ya existe.
    /* const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        return res.status(400).json({
            msg: "El correo ingresado ya existe"
        });
    } */

    //encriptar la contraseña
    const salt=bcrypt.genSaltSync();
    usuario.password= bcrypt.hashSync(password, salt);
    await usuario.save();

    res.status(201).json({
    //msg:'Peticion POST - controller',
    usuario,
}); 
}
const usuariosPut= async(req, res)=> {
    const {id}= req.params;
    const {_id,password,email, ...datos}= req.body;
    //validar contra la base de datos
    if(password){
        //encriptar contraseña
        const salt=bcrypt.genSaltSync();
        datos.password= bcrypt.hashSync(password, salt);   
    }

    const usuario= await Usuario.findByIdAndUpdate(id,datos,{new:true});
    res.json({
    msg:'Usuario Actualizado',
    usuario,
}); 
}
const usuariosDelete= async(req, res)=> {
    const {id}= req.params;
    //inactivar al usuario
    const query={estado:false};
    const usuarioBorrado= await Usuario.findByIdAndUpdate(id, query,{new:true});

    //borrar fisicamente un registro
    //const usuarioBorrado= await Usuario.findByIdAndDelete(id);
    //const usuarioAutenticado= req.usuario;

    res.json({
    msg:'Usuario borrado de la base de datos',
    usuarioBorrado,
   // usuarioAutenticado,
}); 
}


module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}
const {validationResult}= require("express-validator");

// varificar validaciones. si el correo es valido
const validarCampos=(req, res, next)=>{
    const errors= validationResult(req);
    //isEmpty = si esta vacio
    if (!errors.isEmpty()){
       return res.status(400).json(errors);
    }
    next();
}


module.exports={
    validarCampos,
}
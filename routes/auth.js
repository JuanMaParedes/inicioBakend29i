const { Router }= require("express");
const { check }=require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth');


const router= Router();

router.post('/login',[
    check("email","El correo es obligatirio").isEmail(),
    check("password","La contraseña es obligatirio").notEmpty(),
    validarCampos,

], login);


module.exports= router;
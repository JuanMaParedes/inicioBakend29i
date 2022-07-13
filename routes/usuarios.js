const {Router}= require("express");
const {check} =require('express-validator');
const { Error } = require("mongoose");

const {
    usuariosGet , 
    usuariosPost, 
    usuariosPut, usuariosDelete
}= require("../controllers/usuarios");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router= Router();

router.get('/', usuariosGet);
router.post('/', [
    check("email","El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    check('password',"La contraseña debe tener como minimo 6 caracteres").isLength({min:6}),
    check("nombre","El nombre no debe estar vacio").notEmpty(),
    /* check("role","No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    check("role").custom(esRoleValido),
    validarCampos
    ],usuariosPost);
router.put('/:id',[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRoleValido),
    validarCampos

], usuariosPut);
router.delete('/:id',[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos

], usuariosDelete);

module.exports= router;
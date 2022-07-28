const {Router}= require('express');
const { validarJWT }= require ("../middlewares/validar-jwt");
const { check }= require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');
const { existeBlogById } = require('../helpers/db-validators');
const {esAdminRole} = require("../middlewares/validar-role");
const { blogGet, blogPost, blogByIdGet, blogPut, blogDelete } = require('../controllers/blogs');

const router= Router();

//get
router.get("/",[
    validarJWT,
], blogGet);
router.get("/:id",[
    validarJWT,
    check("id","No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeBlogById),
    validarCampos, 
], blogByIdGet);

// post
router.post("/",[
    validarJWT,
    check("title", "el titulo es obligatorio").notEmpty(),
    check("body","El cuerpo del blog es ogligatorio").notEmpty(),
    validarCampos,
], blogPost);

//put
router.put("/:id",[
    validarJWT,
    check("id","No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeBlogById),
    check("title", "el titulo es obligatorio").notEmpty(),
    check("body","El cuerpo del blog es ogligatorio").notEmpty(),
    validarCampos,
    
], blogPut);

// Delete
router.put("/:id",[
    validarJWT,
    esAdminRole,
    check("id","No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeBlogById),
    validarCampos,
], blogDelete);



module.exports= router;

const { Router } =require ("express");
const { buscarBlog} = require("../controllers/buscar-blog");
const { validarJWT } = require("../middlewares/validar-jwt");

const router= Router();

router.get("/",[validarJWT], buscarBlog);
 
module.exports= router;

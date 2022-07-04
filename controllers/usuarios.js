const usuariosGet= (req, res)=> {
    res.json({
    msg:'Peticion GET - controller',
}); 
}

const usuariosPost= (req, res)=> {
    res.json({
    msg:'Peticion POST - controller',
}); 
}
const usuariosPut= (req, res)=> {
    const {id}= req.params;
    res.json({
    msg:'Peticion PUT - controller',
    id,
}); 
}
const usuariosDelete= (req, res)=> {
    res.json({
    msg:'Peticion DELETE - controller',
    id,
}); 
}


module.exports= {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}
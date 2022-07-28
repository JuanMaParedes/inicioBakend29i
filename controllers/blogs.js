const {request, response}= require('express');
const Blog= require('../models/blog');

//Traer todos los blogs visibles
const blogGet= async(req= request, res= response)=>{
    const {limite=5, desde=0}= req.query;
    const blogs= await Blog.find({hiden:false})
    .limit(limite)
    .skip(desde)
    .populate("author", "nombre email");
    const total= await Blog.countDocuments({hiden:false});
    res.status(200).json({
        total,
        blogs
    })
}

// Mostrar un blog por su id

const blogByIdGet=async(req= request, res= response)=>{
    const {id}= req.params;
    const blog= await Blog.findById(id)
    .populate("author", "nombre email");
    if (blog.hidden == true){
        return res.status(400).json({
            msg: "No se encuentra la entrada del blog"
        })
    }
    return res.json({
        blog,
    })
}

// Crear un posteo
const blogPost=async(req= request, res= response)=>{
    const {title, body}= req.body;
    const blog= new Blog({
        title,
        body,
        author: req.usuario._id
    });
    await blog.save();
    res.json({
        blog,
    });

}
// Actualizar

const blogPut=async(req= request, res= response)=>{
    const {id}= req.params;
    const {title, body}= req.body;
    const datos= {
        title,
        body,
    }
    const blog= await Blog.findByIdAndUpdate(id, datos,{new:true})
    res.json({
        msg: "BLog Actualizado",
        blog,
    });
}
// Borrar blog
const blogDelete= async(req= request, res= response)=>{
    const {id}= req.params;
    const blogBorrado= await Blog.findByIdAndUpdate(id,{hidden: true},{new:true});
    res.json({
        msg: "BLog Borrado",
        blog,
    });

} 


module.exports={
    blogGet,
    blogPost,
    blogByIdGet,
    blogPut,
    blogDelete
}
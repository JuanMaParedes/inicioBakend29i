const {request , response} = require("express");

//Importo objectId para luego consultar el id del blog.
const { ObjectId } =require ("mongoose").Types;
const Blog =require("../models/blog");

//funcion para buscar un blog
const buscarBlog = async(req= request, res= response)=>{
    const { search } =req.query;
    //verificar si search trae un id de mongo
    const esMongoId= ObjectId.isValid(search);
    if(esMongoId){
        const blog= await Blog.findById(search);
        return res.json({
            results :blog ? [blog] :[],
        })
    }

    //Por titulo
    const regex = new RegExp(search, "i");
    const blogs = await Blog.find({
        title: regex,
        hidden: false,
    }).populate("author","nombre");

    res.json({
        results: blogs,
    })
}


module.exports={
    buscarBlog,
}
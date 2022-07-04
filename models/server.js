const express = require("express");
class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPath='/api/usuarios';
        //routes
        this.routes();
        //middlewares
        this.middlewares();
    }

    middlewares(){
        //carpeta publica
        this.app.use(express.static("public"));
    }
    routes(){
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Server online port: ", this.port);
        });
    }
}

module.exports= Server;
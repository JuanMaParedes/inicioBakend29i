const express = require("express");
const cors = require("cors");
const {dbConnection} = require('../database/confing')
class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPath='/api/usuarios';
        this.authPath= '/api/auth';
        //conexion DB
        this.conectarDB();
         //middlewares
        this.middlewares();
        //routes
        this.routes();
       
    }

    async conectarDB(){
        await dbConnection();
    
    }

    middlewares(){
        //Lectura de body
        this.app.use(express.json());

        //CORS
        this.app.use(cors());

        //carpeta publica
        this.app.use(express.static("public"));
    }
    routes(){
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
        this.app.use(this.authPath, require("../routes/auth"));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Server online port: ", this.port);
        });
    }
}

module.exports= Server;
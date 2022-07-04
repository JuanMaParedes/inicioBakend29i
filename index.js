
// importar dotenv
const Server= require("./models/server")
require('dotenv').config();
const server= new Server();

server.listen();



/* 
app.get('/', function (req, res) {
  /* res.json({
    msg:'Hola Mundo',
}); */
/* res.send('Hola Mundo');
}); */

 /* app.listen(process.env.PORT, ()=>{
    console.log("Server online port: ", process.env.PORT);
}); */
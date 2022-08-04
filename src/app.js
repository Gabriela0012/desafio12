import express from 'express';
import productsRouter from './router/products.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './router/views.router.js';
import { Server } from 'socket.io';


const app = express();
const server = app.listen(8080,()=>console.log('listening on 8080'));
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname+'/public'))



app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');


// app.use('/api/products',productsRouter);
app.use('/',viewsRouter);
let nickNames = [];

io.on('connection',socket=>{
  console.log('Socket connected 1')
  socket.on('enviar mensaje', (datos) =>{
    
    //Lo enviamos a todos los usuarios (clientes)
    io.sockets.emit('nuevo mensaje', {
        msg: datos,
        nick: socket.nickname
    });
  });
  socket.on('addNewProduct', (newProduct) =>{
    io.sockets.emit('addNewProduct',{ 
      title:newProduct.value,
      price:newProduct.value,
      image:newProduct.value


    });
  });
  socket.on('updateProductList', (productListHandler)=>{
    io.sockets.emit('updateProductList',{ 
      title:newProduct.value,
      price:newProduct.value,
      image:newProduct.value

    });

  })

  socket.on('nuevo usuario', (datos, callback) => {

    if(nickNames.indexOf(datos) != -1){
        callback(false);
    }else{
        //Si no existe le respondemos al cliente con true y agregamos el nuevo usuario:
        callback(true);
        socket.nickname = datos;
        nickNames.push(socket.nickname);
        //Enviamos al cliente el array de usuarios:
        actualizarUsuarios();
     }
  });
  socket.on('disconnect', (datos) =>{
   
    if(!socket.nickname){
        return;
    }else{
        //buscamos su posición en el array y lo eliminamos con splice()
        nickNames.splice(nickNames.indexOf(socket.nickname), 1);

        //Enviamos al cliente el array de usuarios actualizado:
        actualizarUsuarios();
    }
  });

  function actualizarUsuarios(){
    io.sockets.emit('usernames', nickNames);
  }

});
 
  

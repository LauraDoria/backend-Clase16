//Router
//Home /home landing page
//galería de productos /products
    //GET / ver todos los productos y /:id ver productos por id
    //POST / agregar nuevos productos (sólo administrador), usar form
    //PUT /:id actualizar productos por id (sólo administrador), usar form
    //DELETE /:id eliminar productos por id (sólo administrador), usar form
//carrito de compras /cart
    //POST / crea carrito y le asigna id
    //DELETE /:id vacía carrito por id
    //GET /:id/products lista todos los productos en el carrito
    //POST /:id/products agrega productos al carrito por id de producto
    //DELETE /:id/products/:id_prod elimina un producto del carrito por id de producto
//404 NOT FOUND
    //* cualquier otra ruta solicitada
/*
producto {
    id,
    timestamp,
    name,
    description,
    code,
    thumbnail,
    price,
    stock
}

carrito {
    id,
    timestamp,
    productos {
        producto,
        producto,
        ...
    }
}
*/
//JSON productos, copiar código desde el proyecto de React
//CSS, copiar código desde el proyecto de React
//HTML, plantilla en EJS, copiar código desde componentes ItemListContainer, ItemList y Item del proyecto de React
//para el detalle de productos usar el código de ItemDetailContainer y ItemDetail del proyecto de React

/*
Root
    SRC
        -server.ts/js
        -router.ts/js
        -productControllers.ts/js
        -products.ts/js
        -cartControllers.ts/js
        -cart.ts/js
    public
        -style.css
        views
            -gallery.ejs
            -product.ejs
            -cart.ejs
            partials
                -navbar.ejs
                -footer.ejs
                -form.ejs

*/
/*
-Cambiar ternarios por if else en plantillas ejs
-Revisar css
-Copiar código de server, router, products y controllers
-Lógica para cart y sus controllers
-Establecer las rutas
-Datos de productos en el json productos
*/
//Require libraries
const express = require('express')
const {Server: HttpServer} = require('http')
const router = require('./router')
const path = require('path');
const multer = require('multer')

//Instance server
const app = express()
const httpServer = new HttpServer(app)
const PORT = 8080

//Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'))

//Middlewares
app.use(express.static(path.join(__dirname, '../public/views')))
app.get('/', (req, res) => {
    res.render('home')
})
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', router)

//Server UP
httpServer.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
})
//Error
httpServer.on("error", (error) => {
    console.log( `Se produjo un error: ${error}`)
})
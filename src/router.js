const express = require('express');
const {Router} = express
const router = Router()
const productControllers = require('./productControllers');
const cartControllers = require('./cartControllers');
const { isAdmin } = require('./products');

/*Rutas*/

//Home
router.get('/', (req, res) => {
    res.render('home')
    console.log('GET request succesful.')
})

//Galería de productos
router.get('/products', (req, res) => {
    res.render('gallery', {products: productControllers.getAllProducts()})
    console.log('GET request succesful.')
})

//Galería de productos - agregar al carrito NO
router.post('/products', (req, res) => {
    
    res.render('/cart/:id', () => {
        const cartId = parseInt(req.params.id)
        const productId = parseInt(req.body.id)
        cartControllers.addProduct(cartId, productId)
        return {productQuantity: cartControllers.getById(cartId).products.length}
    })
    console.log('POST request succesful.')
})

//Página de producto
router.get('/products/:id', (req, res) => {
    const productId = req.params.id
    res.render('product', {
        id: productControllers.getProductById(productId).id,
        name: productControllers.getProductById(productId).name,
        productType: productControllers.getProductById(productId).productType,
        skinType: productControllers.getProductById(productId).skinType,
        hairType: productControllers.getProductById(productId).hairType,
        function: productControllers.getProductById(productId).function,
        zeroWaste: productControllers.getProductById(productId).zeroWaste,
        price: productControllers.getProductById(productId).price,
        presentation: productControllers.getProductById(productId).presentation,
        detailThumbnail: productControllers.getProductById(productId).detailThumbnail,
        description: productControllers.getProductById(productId).description,
        instructions: productControllers.getProductById(productId).instructions,
        inci: productControllers.getProductById(productId).inci,
    })
    console.log('GET request succesful.')
})

//Formulario
router.get('/form', (req, res) => {
    if (isAdmin === true) {
        res.render('form', {new: 'new', modify: 'modify', delete: 'delete'})
        console.log('GET request succesful.')
    } else {
        res.send('GET request denied. Request Status: 401. Unauthorized.')
        console.log('GET request denied. Request Status: 401. Unauthorized.')
    }
})

//Formulario - cargar producto
router.post('/form', (req, res) => {
    if (isAdmin === true) {
        const newData = req.body
        res.send(productControllers.addNewProduct(newData))
        res.redirect('/form')
        console.log('POST request succesful.')
    } else {
        res.send('POST request denied. Request Status: 401. Unauthorized.')
        console.log('POST request denied. Request Status: 401. Unauthorized.')
    }
})

//Formulario - modificar producto
router.put('/form', (req, res) => {
    if (isAdmin === true) {
        const productId = req.body.id
        if (productId !== '') {
            const updatedData = req.body
            res.render('form', () => {
                productControllers.updateProduct(parseInt(productId), updatedData)
                const message = 'Información del producto actualizada correctamente.'
                console.log('PUT request succesful.')
                return {message: message}
            } )
        }
    } else {
        const message = 'PUT request denied. Request Status: 401. Unauthorized.'
        res.render({message: message})
        console.log('PUT request denied. Request Status: 401. Unauthorized.')
    }
})

//Formulario - eliminar producto
router.delete('/form', (req, res) => {
    if (isAdmin === true) {
        const productId = req.body.id
        if (productId !== '') {
            res.render('form', () => {
                productControllers.deleteProductById(parseInt(productId))
                const message = 'Información del producto actualizada correctamente.'
                console.log('DELETE request succesful.')
                return {message: message}
            } )
        }
    } else {
        const message = 'DELETE request denied. Request Status: 401. Unauthorized.'
        res.render({message: message})
        console.log('DELETE request denied. Request Status: 401. Unauthorized.')
    }
})

//Carrito
router.get('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', {
        products: cartControllers.getById(cartId).products,
        quantity: cartControllers.getById(cartId).products.length
    })
    console.log('GET request succesful.')
})

//Carrito - vaciar carrito
router.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    res.render('cart', () => {
        cartControllers.empty(cartId)
        return {products: cartControllers.getById(cartId).products}
    })
    console.log('DELETE request succesful.')
})

//Carrito - eliminar producto del carrito
router.delete('/cart/:id', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.body.id)
    res.render('cart', () => {
        cartControllers.deleteProduct(cartId, productId)
        return {products: cartControllers.getById(cartId).products}
    })
    console.log('DELETE request succesful.')
})

//Otras rutas
router.get('*', (req, res) => {
    res.render('notFound')
    console.log('GET request unsuccesful. Request status: 404. Not found.')
})

module.exports = router
const fs = require('fs')
const { idCompare, getById, updateStock } = require('./products')

//Crear nuevo carrito
const createCart = () => {
    const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
    const cartId = idCompare(cartData) + 1
    const newCart = {
        id: cartId,
        timestamp: new Date().toLocaleTimeString(),
        products: [],
    }
    const cartDataUpdate = [...cartData, newCart]
    fs.writeFileSync('./cart.json', JSON.stringify(cartDataUpdate, null, 2), 'utf-8')
    return newCart
}

//Agregar producto al carrito
const addToCart = (cartId, productId) => {
    const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
    const requestedCart = getCart(cartId)
    const productsInCart = []
    requestedCart.forEach(product => {
        productsInCart.push(product)
        return productsInCart
    })
    const newProduct = getById(productId)
    const cartTimestamp = requestedCart.timestamp
    deleteCart(cartId)
    const updatedCart = {
        id: cartId,
        timestamp: cartTimestamp,
        products: [...productsInCart, newProduct]
    }
    const cartDataUpdate = [...cartData, updatedCart]
    fs.writeFileSync('./cart.json', JSON.stringify(cartDataUpdate, null, 2), 'utf-8')
    return updatedCart
}

//Obtener carrito
const getCart = (cartId) => {
    const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
    let requestedCart = cartData.find(cart => cart.id == cartId)
    return requestedCart
}

//Eliminar producto del carrito
const deleteFromCart = (cartId, productId) => {
    const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
    const requestedCart = getCart(cartId)
    const cartTimestamp = requestedCart.timestamp
    const updatedProductList = []
    requestedCart.products.forEach(product => {
        if (product.id !== productId) updatedProductList.push(product)
        return updatedProductList
    })
    deleteCart(cartId)
    const updatedCart = {
        id: cartId,
        timestamp: cartTimestamp,
        products: updatedProductList
    }
    const cartDataUpdate = [...cartData, updatedCart]
    fs.writeFileSync('./cart.json', JSON.stringify(cartDataUpdate, null, 2), 'utf-8')
    return updatedCart
}

//Vaciar el carrito
const emptyCart = (cartId) => {
    const requestedCart = getCart(cartId).products
    const cartTimestamp = requestedCart.timestamp
    deleteCart(cartId)
    const updatedCart = {
        id: cartId,
        timestamp: cartTimestamp,
        products: []
    }
    const cartDataUpdate = [...cartData, updatedCart]
    fs.writeFileSync('./cart.json', JSON.stringify(cartDataUpdate, null, 2), 'utf-8')
    return 'Tu carrito está vacío!'
}

//Eliminar un carrito
const deleteCart = (id) => {
    const cartData = JSON.parse(fs.readFileSync('./cart.json', 'utf-8'))
    if (cartData.length === 0) {
        return 'No se encontraron carritos.'
    } else {
        const cart = getCart(id)
        cartData.splice(cart, 1)
        let updatedCartList = [...cartData]
        fs.writeFileSync('./productos.txt', JSON.stringify(updatedCartList, null, 2), 'utf-8')
        return updatedCartList
    }
}

module.exports = { createCart, addToCart, getCart, deleteFromCart, emptyCart }
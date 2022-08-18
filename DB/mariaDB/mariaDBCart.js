const { getById } = require('./mariaDBProducts')

//Crear nuevo carrito
const createCart = () => {
    knex('cartsRawEcommerce')
        .insert()
        .then(() => {
            console.log('Se creó un nuevo carrito de compras.');
        }).catch((error) => {
            console.error(error)
        })
}

//Agregar producto al carrito
const addToCart = (cartId, productId) => {
    const cartToUpdate = getCart(cartId)
    if (cartToUpdate === null) {
        return 'No se encontró el carrito.'
    } else {
        knex
        .from('cartsRawEcommerce')
        .where(cartId)
        .update()
        .then((cart) => {
            console.log('Se agregó un producto a tu carrito.')
            return cart
        }).catch((error) => {
            console.error(error)
        })
    }  
}

//Obtener carrito
const getCart = (cartId) => {
    knex
        .from('cartsRawEcommerce')
        .select('*')
        .where(cartId)
        .then((cart) => {
            if (cart === null) console.log('No se encontró el carrito.') 
            return cart
        }).catch((error) => {
            console.error(error)
        }) 
}

//Eliminar producto del carrito
const deleteFromCart = (cartId, productId) => {
    const cartToUpdate = getCart(cartId)
    if (cartToUpdate === null) {
        return 'No se encontró el carrito.'
    } else {
        knex
        .from('cartsRawEcommerce')
        .where(cartId)
        .del('products')
        .then(() => {
            return 'Se eliminó un producto de tu carrito.'
        }).catch((error) => {
            console.error(error)
        })
    }
}

//Vaciar el carrito
const emptyCart = (cartId) => {
    knex
        .from('cartsRawEcommerce')
        .where(cartId)
        .del('products')
        .then(() => {
            return 'Tu carrito está vacío.'
        }).catch((error) => {
            console.error(error)
        }) 
}

//Eliminar un carrito
const deleteCart = (cartId) => {
    knex
    .from('cartsRawEcommerce')
    .where(cartId)
    .del('*')
    .then(() => {
        return 'Se eliminó un carrito.'
    }).catch((error) => {
        console.error(error)
    }) 
}

module.exports = { createCart, addToCart, getCart, deleteFromCart, emptyCart }
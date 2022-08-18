const { getById } = require('./mariaDBProducts')

//Crear nuevo carrito
const createCart = () => {
    knex('cartsRawEcommerce')
        .insert({
            timestamp: new Date().toLocaleTimeString(),
            products: []
        })
        .then(() => {
            console.log('Se creó un nuevo carrito de compras.');
        }).catch((error) => {
            console.error(error)
        })
}

//Obtener carrito
const getCart = (cartId) => {
    knex
        .from('cartsRawEcommerce')
        .where('id', cartId)
        .select('*')
        .then((cart) => {
            if (cart === null) console.log('No se encontró el carrito.') 
            return JSON.parse(cart)
        }).catch((error) => {
            console.error(error)
        }) 
}

//Obtener productos en el carrito
const getCartProducts = (cartId) => {
    knex
        .from('cartsRawEcommerce')
        .where('id', cartId)
        .select('products')
        .then((products) => {
            if (products === []) console.log('Tu carrito está vacío.') 
            return JSON.parse(products)
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
        const inCart = getCartProducts(cartId)
        const newProduct = getById(productId)
        knex
            .from('cartsRawEcommerce')
            .where('id', cartId)
            .update({
                products: [...inCart, newProduct]
            })
            .then(() => {
                return 'Se agregó un producto a tu carrito.'
            }).catch((error) => {
                console.error(error)
            })
    }  
}

//Eliminar producto del carrito
const deleteFromCart = (cartId, productId) => {
    const cartToUpdate = getCart(cartId)
    if (cartToUpdate === null) {
        return 'No se encontró el carrito.'
    } else {
        const updatedCart = getCartProducts(cartId).filter(product => product.id !== productId)
        knex
        .from('cartsRawEcommerce')
        .where('id', cartId)
        .update({
            products: [...updatedCart]
        })
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
        .where('id', cartId)
        .update({
            products: []
        })
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
    .where('id', cartId)
    .del('*')
    .then(() => {
        return 'Se eliminó un carrito.'
    }).catch((error) => {
        console.error(error)
    }) 
}

module.exports = { createCart, addToCart, getCart, deleteFromCart, emptyCart }
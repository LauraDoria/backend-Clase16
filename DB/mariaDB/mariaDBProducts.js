const {optionsMariaDB} = require('../options/mariaDB')
const knex = require('knex')(optionsMariaDB)

//Guardar nuevo producto
const save = (newData) => {
    knex('productsRawEcommerce')
        .insert({
            productCode: newData.productCode,
            stock: newData.productStock,
            name: newData.productName,
            productType: newData.productType,
            skinType: newData.productSkinType,
            hairType: newData.productHairType,
            use: newData.productFunction,
            zeroWaste: newData.ProductZeroWaste,
            price: newData.productPrice,
            presentation: newData.productPresentation,
            thumbnail: newData.productThumbnail,
            detailThumbnail: newData.productThumbnailBig,
            description: newData.productDescription,
            instructions: newData.productInstructions,
            inci: newData.productInci       
        })
        .then(() => {
            return 'Se guardó un nuevo producto.'
        }).catch((error) => {
            console.error(error)
        })
}

//Obtener producto
const getById = (productId) => {
    knex
        .from('productsRawEcommerce')
        .select('*')
        .where('id', productId)
        .then((product) => {
            if (product === null) console.log('No se encontró el producto.') 
            return JSON.parse(product)
        }).catch((error) => {
            console.error(error)
        }) 
}

//Obtener todos los productos
const getAll = () => {
    knex
        .from('productsRawEcommerce')
        .select('*')
        .orderBy('id', 'asc')
        .then((products) => {
            if (products === null) console.log('No se encontraron productos.');
            return JSON.parse(products)
        }).catch((error) => {
            console.error(error)
        }) 
}

//Actualizar producto
const update = (productId, updatedData) => {
    const productToUpdate = getById(id)
    if (productToUpdate === null) {
        return 'No se encontró el producto.'
    } else {
        knex
            .from('productsRawEcommerce')
            .where('id', productId)
            .update({
                productCode: updatedData.productCode,
                stock: updatedData.productStock,
                name: updatedData.productName,
                productType: updatedData.productType,
                skinType: updatedData.productSkinType,
                hairType: updatedData.productHairType,
                use: updatedData.productFunction,
                zeroWaste: updatedData.ProductZeroWaste,
                price: updatedData.productPrice,
                presentation: updatedData.productPresentation,
                thumbnail: updatedData.productThumbnail,
                detailThumbnail: updatedData.productThumbnailBig,
                description: updatedData.productDescription,
                instructions: updatedData.productInstructions,
                inci: updatedData.productInci
            })
            .then(() => {
                return 'Información de producto actualizada.'
            }).catch((error) => {
                console.error(error)
            })
    }  
}

//Eliminar producto
const deleteById = (productId) => {
    const productToDelete = getById(id)
    if (productToDelete === null) {
        return 'No se encontró el producto.'
    } else {
        knex
            .from('productsRawEcommerce')
            .where('id', productId)
            .del('*')
            .then(() => {
                return 'Producto eliminado.'
            }).catch((error) => {
                console.error(error)
            })
    }
}

//Eliminar todos los productos
const deleteAll = () => {
    knex
        .from('productsRawEcommerce')
        .del('*')
        .then(() => {
            return 'Se eliminó el listado de productos.'
        }).catch((error) => {
            console.error(error)
        }) 
}

//Permiso de administrador
let isAdmin = true

module.exports = { save, getById, getAll, update, deleteById, deleteAll, isAdmin }

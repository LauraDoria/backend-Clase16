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
            console.log('Se guardó un nuevo producto.');
        }).catch((error) => {
            console.error(error)
        })
}

//Obtener producto
const getById = (productId) => {
    knex
        .from('productsRawEcommerce')
        .select('*')
        .where(productId)
        .then((product) => {
            if (product === null) console.log('No se encontró el producto.') 
            return product
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
            return products
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
        .where(productId)
        .update(() => {
            if (updatedData.productCode !== null) {productCode: updatedData.productCode}
            if (updatedData.productStock !== null) {stock: updatedData.productStock}
            if (updatedData.productName !== null) {name: updatedData.productName}
            if (updatedData.productType !== null) {productType: updatedData.productType}
            if (updatedData.productSkinType !== null) {skinType: updatedData.productSkinType}
            if (updatedData.productHairType !== null) {hairType: updatedData.productHairType}
            if (updatedData.productFunction !== null) {use: updatedData.productFunction}
            if (updatedData.ProductZeroWaste !== null) {zeroWaste: updatedData.ProductZeroWaste}
            if (updatedData.productPrice !== null) {price: updatedData.productPrice}
            if (updatedData.productPresentation !== null) {presentation: updatedData.productPresentation}
            if (updatedData.productThumbnail !== null) {thumbnail: updatedData.productThumbnail}
            if (updatedData.productThumbnailBig !== null) {detailThumbnail: updatedData.productThumbnailBig}
            if (updatedData.productDescription !== null) {description: updatedData.productDescription}
            if (updatedData.productInstructions !== null) {instructions: updatedData.productInstructions}
            if (updatedData.productInci !== null) {inci: updatedData.productInci}
        })
        .then((product) => {
            console.log('Información de producto actualizada.')
            return product
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
        .where(productId)
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

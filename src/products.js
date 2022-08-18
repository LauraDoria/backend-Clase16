const fs = require('fs')

//Obtener mayor id guardada
const idCompare = (data) => {
    let currentMaxId = 0
    let idsToCompare = []
    data.forEach(element => {
        idsToCompare.push(element.id)
        if(idsToCompare.length == 0) {
            currentMaxId = 0
        } else {
            currentMaxId = Math.max(...idsToCompare)
        }
        return currentMaxId
    })
    return currentMaxId
}

//Guardar nuevo producto
const save = (newData) => {
    const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    const newProductId = idCompare(productData) + 1
    const newProduct = {
        id: newProductId,
        productCode: newData.productCode,
        stock: newData.productStock,
        name: newData.productName,
        productType: newData.productType,
        skinType: newData.productSkinType,
        hairType: newData.productHairType,
        function: newData.productFunction,
        zeroWaste: newData.ProductZeroWaste,
        price: newData.productPrice,
        presentation: newData.productPresentation,
        thumbnail: newData.productThumbnail,
        detailThumbnail: newData.productThumbnailBig,
        description: newData.productDescription,
        instructions: newData.productInstructions,
        inci: newData.productInci
    }
    const newProductList = [...productData, newProduct]
    fs.writeFileSync('./products.json', JSON.stringify(newProductList, null, 2), 'utf-8')
    return newProduct
}

//Obtener producto
const getById = (id) => {
    const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    if (productData.length == 0){
        return 'No se encontraron productos.'
    } else {
        let requestedProduct = productData.find(element => element.id == id)
        if(requestedProduct != null) {
            return requestedProduct
        } else {
            return 'No se encontró el producto.'
        }
    }
}

//Obtener todos los productos
const getAll = () => {
    const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    if (productData.length == 0){
        return 'No se encontraron productos.'
    } else {
        return productData
    }
}

//Actualizar producto
const update = (id, updatedData) => {
    const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    if (productData.length === 0) {
        return 'No se encontraron productos.'
    } else {
        const product = getById(id)
        if (product.id == null) {
            const newProduct = save(updatedData)
            const updatedProductList = [...productData, newProduct]
            fs.writeFileSync('./products.json', JSON.stringify(updatedProductList, null, 2), 'utf-8')
            return newProduct
        } else {
            deleteById(id)
            const updatedProduct = save(updatedData)
            const updatedProductList = [...productData, updatedProduct]
            fs.writeFileSync('./products.json', JSON.stringify(updatedProductList, null, 2), 'utf-8')
            return updatedProduct
        }
    }
}

//Eliminar producto
const deleteById = (id) => {
    const productData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
    if (productData.length === 0) {
        return 'No se encontraron productos.'
    } else {
        const product = getById(id)
        productData.splice(product, 1)
        let updatedProductList = [...productData]
        fs.writeFileSync('./products.json', JSON.stringify(updatedProductList, null, 2), 'utf-8')
        return updatedProductList
    }
}

//Eliminar todos los productos
const deleteAll = () => {
    let emptyProductList = []
    fs.writeFileSync('./products.json', JSON.stringify(emptyProductList, null, 2), 'utf-8')
    return 'No hay productos para mostrar.'
}



//Permiso de administrador
let isAdmin = true

module.exports = { idCompare, save, getById, getAll, update, deleteById, deleteAll, isAdmin }

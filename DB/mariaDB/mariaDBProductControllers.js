const productsMariaDB = require('./mariaDBProducts')

class productControllersMariaDB { 
    static addNewProduct(product){
      return productsMariaDB.save(product);
    }
    static getProductById(id){
      return productsMariaDB.getById(id);
    }
    static getAllProducts(){
      return productsMariaDB.getAll();
    }
    static updateProduct(id, updatedData){
      return productsMariaDB.update(id, updatedData);
    }
    static deleteProductById(id){
      return productsMariaDB.deleteById(id);
    }
    static deleteAllProducts(){
      return productsMariaDB.deleteAll();
    }
  }
  
  module.exports = productControllersMariaDB
const cartMariaDB = require('./mariaDBCart');

class cartControllersMariaDB { 
  static newCart(){
    return cartMariaDB.createCart();
  }
  static getById(cartId){
    return cartMariaDB.getCart(cartId);
  }
  static addProduct(cartId, productId){
    return cartMariaDB.addToCart(cartId, productId);
  }
  static deleteProduct(cartId, productId){
    return cartMariaDB.deleteFromCart(cartId, productId);
  }
  static empty(cartId){
    return cartMariaDB.emptyCart(cartId);
  }
}

module.exports = cartControllersMariaDB
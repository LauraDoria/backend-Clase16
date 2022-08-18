const cart = require('./cart');

class cartControllers { 
  static newCart(){
    return cart.createCart();
  }
  static getById(cartId){
    return cart.getCart(cartId);
  }
  static addProduct(cartId, productId){
    return cart.addToCart(cartId, productId);
  }
  static deleteProduct(cartId, productId){
    return cart.deleteFromCart(cartId, productId);
  }
  static empty(cartId){
    return cart.emptyCart(cartId);
  }
}

module.exports = cartControllers
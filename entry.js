var path = require('path');

module.exports = {
  'home': [path.resolve(__dirname, 'app/entry/home.js')],
  'cart': [path.resolve(__dirname, 'app/entry/cart.js')],
  'cart-multiple-store': [path.resolve(__dirname, 'app/entry/cart-multiple-store.js')]
};

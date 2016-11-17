var path = require('path');

module.exports = {
  'home': [path.resolve(__dirname, 'app/entry/home.js')],
  'cart': [path.resolve(__dirname, 'app/entry/cart.js')],
  'cart-normal': [path.resolve(__dirname, 'app/entry/cart-normal.js')]
};

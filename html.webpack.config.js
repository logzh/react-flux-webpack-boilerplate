var mallHome = 'app/html/mall.html';
var devTemplate = 'app/html/dev.html';
var proTemplate = 'app/html/pro.html';

var dev = [
  {
    title: '首页',
    filename: 'index.html',
    template: 'app/html/home.html',
    chunks: []
  },
  {
    title: 'cart',
    filename: 'cart.html',
    template: devTemplate,
    chunks: ['vendor', 'cart']
  },
  {
    title: 'cart multiple store',
    filename: 'cart-multiple-store.html',
    template: devTemplate,
    chunks: ['vendor', 'cart-multiple-store']
  }
];

var pro = [
];

module.exports = {
  dev: dev,
  pro: pro
};

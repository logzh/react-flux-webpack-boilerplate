var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var types = require('../constants/cart');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _goods = {"id": 123, "name": "星战正版机器人BB-8", isCollect: false};
var _carts = [];
var _comments = [];

/**
 * 加入购物车
 * @param  {object} goods
 */
function addToCart(goods) {
  _carts = [..._carts, goods];
}

/**
 * 获取更多评论
 * @param  {object} data
 */
function getMoreComment(data) {
  _comments = _comments.concat(data.comments);
}

/**
 * 关注或取消关注商品
 */
function setGoodsCollect() {
  _goods = assign({}, _goods, {isCollect: !_goods.isCollect});
}

var Store = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return assign({}, {goods: _goods}, {comments: _comments}, {carts: _carts});
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {
  switch (action.actionType) {

    case types.ADD_CART:
      addToCart(action.data);
      Store.emitChange();
      break;

    case types.GET_MORE_COMMENT:
      getMoreComment(action.data);
      Store.emitChange();
      break;

    case types.SET_GOODS_COLLECT:
      setGoodsCollect(action.goodsId);
      Store.emitChange();
      break;
    default:

  }
});

module.exports = Store;

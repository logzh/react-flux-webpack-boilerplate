// 数据与逻辑

var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var types = require('../constants/cart');
var objectAssign = require('object-assign');
var service = require('../service');
var CHANGE_EVENT = 'change';

var _carts = [];
var isShow = false;

var Store = objectAssign({}, EventEmitter.prototype, {

  getAll: function() {
    return objectAssign({}, {carts: _carts}, {isShow: isShow});
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
  switch (action.type) {
    case types.GET_SERVER_CARTS:
    case types.ADD_SERVER_CART:
      _carts = action.data;
      Store.emitChange();
      break;

    case types.CART_INC_COUNT:
      _carts = _carts.map(item =>
          item.sizeId == action.meta.sizeId ?
              objectAssign({}, item, {count: item.count + 1}) :
              item
      );
      Store.emitChange();
      break;

    case types.CART_DES_COUNT:
      _carts = _carts.map(item =>
          (item.sizeId == action.meta.sizeId && item.count > 1) ?
              objectAssign({}, item, {count: item.count - 1}) :
              item
      );
      Store.emitChange();
      break;

    case types.CART_UPDATE_COUNT:
      _carts = _carts.map(item =>
          (item.sizeId == action.meta.sizeId && action.meta.count > 0) ?
              objectAssign({}, item, {count: action.meta.count}) :
              item
      );
      Store.emitChange();
      break;

    case types.CART_DEL_ITEM:
      _carts = _carts.filter(item => item.sizeId !== action.meta.sizeId);
      Store.emitChange();
      break;

    case types.SWITCH_PANEL:
      isShow = !isShow;
      Store.emitChange();
      break;

    default:
      break;
  }
});

module.exports = Store;

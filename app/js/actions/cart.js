var Dispatcher = require('../dispatcher');

var types = require('../constants/cart');
var service = require('../service');

var Actions = {
  fetchCart: function() {
    service.fetchCart().then(function(res) {
      Dispatcher.dispatch({ //Dispatcher分发一个事件，Store将会监听到
        type: types.GET_SERVER_CARTS,
        data: res
      });
    });
  },
  increaseCount:function(data) {
    service.increaseCount(data).then(function(res) {
      Dispatcher.dispatch({
        type: types.CART_INC_COUNT,
        data: res,
        meta:data
      });
    });
  },
  decreaseCount:function(data) {
    service.decreaseCount(data).then(function(res) {
      Dispatcher.dispatch({
        type: types.CART_DES_COUNT,
        data: res,
        meta:data
      });
    });
  },
  updateCount:function(data) {
    service.updateCount(data).then(function(res) {
      Dispatcher.dispatch({
        type: types.CART_UPDATE_COUNT,
        data: res,
        meta:data
      });
    });
  },
  deleteItem:function(data) {
    service.deleteItem(data).then(function(res) {
      Dispatcher.dispatch({
        type: types.CART_DEL_ITEM,
        data: res,
        meta:data
      });
    });
  },
  switchPanel:function() {
    Dispatcher.dispatch({
      type: types.SWITCH_PANEL
    });
  }
};

module.exports = Actions;
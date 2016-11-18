var Dispatcher = require('../dispatcher');

var types = require('../constants/user');
var service = require('../service');

//Dispatcher分发一个事件，Store将会监听到

var Actions = {
  fetchUser: function() {
    service.fetchUser().then(function(res) {
      Dispatcher.dispatch({
        type: types.FETCH_USER,
        data: res
      });
    });
  }
};

module.exports = Actions;

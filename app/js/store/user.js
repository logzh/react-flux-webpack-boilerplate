var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var types = require('../constants/user');
var objectAssign = require('object-assign');
var service = require('../service');
var CHANGE_EVENT = 'change';

var user = {isLoginEd: false};

var Store = objectAssign({}, EventEmitter.prototype, {

  getAll: function() {
    return objectAssign({}, {user: user});
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
    case types.FETCH_USER:
      user = objectAssign({}, {isLoginEd: true}, action.data);
      Store.emitChange();
      break;

    default:
      break;
  }
});

module.exports = Store;

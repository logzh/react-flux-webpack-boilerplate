import React, {PropTypes} from 'react';
import App from '../components/App';
import Cart from '../components/Cart';

var objectAssign = require('object-assign');
var cartStore = require('../store/cart');
var cartActions = require('../actions/cart');
var userStore = require('../store/user');
var userActions = require('../actions/user');

// var DefaultUserMixin = {
//   getInitialState: function() {
//     return {
//       loading: 0,
//       user: {
//         name: 'spence'
//       }
//     };
//   }
// };

var Content = React.createClass({
  // mixins: [DefaultUserMixin],
  propTypes: {
    actions: PropTypes.shape({
      fetchCart: PropTypes.func,
      increaseCount: PropTypes.func,
      decreaseCount: PropTypes.func,
      updateCount: PropTypes.func,
      deleteItem: PropTypes.func,
      showPanel: PropTypes.func
    }).isRequired
  },
  getDefaultProps: function() {
    return {
      actions: objectAssign({}, userActions, cartActions)
    };
  },
  getInitialState: function() {
    return objectAssign({}, userStore.getAll(), cartStore.getAll());
  },
  componentDidMount: function() {
    cartStore.addChangeListener(this._onCartStoreChange);
    userStore.addChangeListener(this._onUserStoreChange);
    cartActions.fetchCart();
    userActions.fetchUser();
  },
  componentWillUnmount: function() {
    cartStore.removeChangeListener(this._onCartStoreChange);
    userStore.removeChangeListener(this._onUserStoreChange);
  },
  _onCartStoreChange: function() {
    this.setState(cartStore.getAll());
  },
  _onUserStoreChange: function() {
    this.setState(userStore.getAll());
  },
  render: function() {
    var totalPrice = 0;
    var totalCount = 0;
    var props = this.props;
    var state = this.state;

    state.carts.map(function(item) {
      totalCount += parseInt(item.count, 10);
    });

    return (
        <App user={state.user} loading={state.loading}>
          <Cart actions={props.actions} {...state}   totalCount={totalCount}/>
        </App>
    );
  }
});

export default Content;

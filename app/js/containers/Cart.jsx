import React, {PropTypes} from 'react';

import Cart from '../components/Cart';

var store = require('../store/cart');
var actions = require('../actions/cart');

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
      actions: actions
    };
  },
  getInitialState: function() {
    return store.getAll();
  },
  componentDidMount: function() {
    store.addChangeListener(this._onChange);
    actions.fetchCart();
  },
  componentWillUnmount: function() {
    store.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(store.getAll());
  },
  render: function() {
    var totalPrice = 0;
    var totalCount = 0;
    var props = this.props;
    var state = this.state;

    state.carts.map(function(item) {
      totalCount += parseInt(item.count, 10);
    });

    return <Cart actions={props.actions} {...state}   totalCount={totalCount}/>;
  }
});

export default Content;

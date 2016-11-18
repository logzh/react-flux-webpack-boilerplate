var http = require('./http');

const service = {};
module.exports = service

service.fetchUser = function() {
  return http({
    url: '/user/info',
    method: 'GET'
  });
};

service.fetchCart = function() {
  return http({
    url: '/mall/cart',
    method: 'get'
  });
};

service.increaseCount = function(item) {
  var {id, sizeId, count} = item;
  return http({
    url: `/mall/cart/${id}`,
    data: {count: count + 1, sizeId},
    method: 'PUT'
  });
};

service.decreaseCount = function(item) {
  var {id, sizeId, count} = item;

  return http({
    url: `/mall/cart/${id}`,
    data: {count: count - 1, sizeId},
    method: 'PUT'
  });
};

 service.updateCount = function(data) {
  var {id, sizeId, count} = data;

  return http({
    url: `/mall/cart/${id}`,
    data: {count: count, sizeId},
    method: 'PUT'
  });
};

service.deleteItem = function(item) {
  var {id, sizeId} = item;

  return http({
    url: `/mall/cart/${id}`,
    data: {sizeId},
    method: 'DELETE'
  });
};

service.addCart = function(goods) {
  var {sizeId, name, price, thumb, sizeName, regularPrice} = goods;

  return http({
    url: '/mall/cart',
    method: 'POST',
    data: {goodsId: goods.id, sizeId}
  });
};

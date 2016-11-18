import {Promise} from 'es6-promise'
import axios from 'axios'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function (config) {
  if (config.method === 'post' || config.method === 'put') {
    config.data = qs.stringify(config.data)
  }

  if (config.url.match(/\.json$/) === null) {
    config.url = '/cgi' + config.url;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  switch (error.response.status) {
    case 401:
      if (typeof window !== 'undefined') {
        console.log('401');
        return;
      }
      break;
    case 404:
      console.log('Not Found');
      break;
    case 500:
      if (typeof error.response.data.errCode !== 'undefined' && typeof error.response.data.message !== 'undefined') {
        console.log(error.response.data.message);
      }
      break;
    default:
      break;
  }
  return Promise.reject(error);
});


function http(options) {
  return axios(options);
}

module.exports = http;
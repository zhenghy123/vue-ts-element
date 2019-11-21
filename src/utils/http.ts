import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Message } from 'element-ui';
import router from '@/router';
import _ from 'lodash';
// no-eslint-line
import qs from 'qs';

/**
 * http请求工具类
 *
 * 请求拦截器 负责将客户端标识token值存储并放置在头部提交给服务端
 *
 * 响应拦截器 负责全局处理业务请求的网络或者业务错误
 */

// 创建axios的实例
const service = axios.create({
  timeout: 10000 // 超时时间
});

const authError = _.debounce((message: any) => {
  Message({
    message,
    type: 'warning'
  });
}, 300);

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (sessionStorage.getItem('tsToken')) {
      // config.headers.Authorization = localStorage.tsToken;
    }
    if (config.method === 'post') {
      //当post请求方式的参数在body中时，不进行json字符串转义
      // if (!config.headers.post['Content-Type'].includes('application/json')) {
      // config.data = qs.stringify(config.data);
      // }

      if (config.headers.post['Content-Type'].includes('application/json')) {
        // config.data = qs.stringify(config.data);
        console.log('application/json');
      }

      if (
        config.headers.post['Content-Type'].includes(
          'application/x-www-form-urlencoded'
        )
      ) {
        console.log('application/x-www-form-urlencoded');
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  (err: any) => {
    console.log('errr', err);
    Promise.reject(err);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log('resp', response);
    // 90000 sso返回状态
    if (response.data.code === '90000' || response.data.code === '0') {
      return response;
    } else {
      Message.error(response.data.message);
      return Promise.reject(response.data.message);
    }
    // return response;
  },
  (err: any) => {
    console.log('err', err.response);

    let errMsg = '';
    if (err && err.response && err.response.data && err.response.data.code) {
      switch (err.response.data.code) {
        case '401':
          errMsg = '登录状态失效，请重新登录';
          sessionStorage.removeItem('tsToken');
          router.push('/login');
          break;
        case '403':
          errMsg = '拒绝访问';
          break;
        case '408':
          errMsg = '请求超时';
          break;
        case '500':
          errMsg = '服务器内部错误';
          break;
        case '501':
          errMsg = '服务未实现';
          break;
        case '502':
          errMsg = '网关错误';
          break;
        case '503':
          errMsg = '服务不可用';
          break;
        case '504':
          errMsg = '网关超时';
          break;
        case '505':
          errMsg = 'HTTP版本不受支持';
          break;
        default:
          errMsg = err.response.data.msg;
          break;
      }
    } else {
      errMsg = err;
    }
    authError(errMsg);
    // Message.error(errMsg);
    return Promise.reject(errMsg);
  }
);

export default service;

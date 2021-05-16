/**
 * Created by bootdo.
 */
declare const require: any
import { WEB_REMOTE_URL, IS_DEBUG } from '../common/config';
interface IApiData {
  success: boolean;
  data: any;
  errMsg?: string;
}

const axios = require('axios');
const baseURL = WEB_REMOTE_URL;
const SUCCESS_CODE = 0;
const NO_LOGIN_ERROR_CODE = 401;

interface IApiRes {
  code: number;
  currentTime: string;
  data: any;
  msg: string;
}

function searchParse() { 
  var resultObj = {}; 
  var search = window.location.search; 
  if(search && search.length > 1){ 
    var search = search.substring(1); 
    var items = search.split('&'); 
    for(var index = 0 ; index < items.length ; index++ ){ 
      if(! items[index]){ 
      continue; 
    } 
    var kv = items[index].split('='); 
    resultObj[kv[0]] = typeof kv[1] === "undefined" ? "":kv[1]; 
    }
  } 
  return resultObj;
} 

const request = axios.create();
request.defaults.timeout =  60000;
request.defaults.withCredentials = true;
request.baseURL = baseURL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 配置请求头
// 添加一个请求拦截器
request.interceptors.request.use(
  (config: any) => {
    const query = searchParse() as any;
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
// 添加一个响应拦截器
request.interceptors.response.use(
    (response: any) => {
      const res: IApiRes = response.data;
      if (!res) {
        return Promise.reject('发生未知错误');
      }
      if (res.code === NO_LOGIN_ERROR_CODE) {
        cc.director.loadScene('Login');
      }
      return response;
    },
    (error: any) => {
        // Do something with response error
        return Promise.reject(error);
    },
);

class Http {
    resolveResponse(requestPromise: Promise<any>, url: string, type: string): Promise<IApiData> {
      return requestPromise
      .then((res) => res.data)
      .then((res: IApiRes) => {
        if (IS_DEBUG || window['IS_DEBUG']) {
          console.group(`response[${type}]:${url}`);
          console.log('data :', res);
          console.groupEnd();
        }
        if (res == null) {
            return {
                success: false,
                errMsg: '网络异常',
                data: null,
            };
        }
        if (res.code !== SUCCESS_CODE) {
            return {
                success: false,
                errMsg: res.msg,
                data: null,
            };
        }
        return {
            success: true,
            data: res.data,
        };
      })
      .catch((err: any) => {
        let errMsg = '服务器请求异常';
        try {
          errMsg = err.response.data.message;
        } catch (e) {
          console.log(e);
        }
        return {
            success: false,
            errMsg,
            data: null,
        };
      })
      .then((res: IApiData) => {
          if (!res.success) {
            alert(res.errMsg || '服务器繁忙');
            // console.log('Toast', res.errMsg);
            // Toast({
            //   message: res.errMsg,
            //   duration: 2000,
            // });
          }
          return res;
      });
    }
    public post(url: string, params?: any, headers?: any): Promise<IApiData> {
      if (IS_DEBUG || window['IS_DEBUG']) {
        console.group(`request[post]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
      }
      return this.resolveResponse(request.post(`${baseURL}${url}`, params, headers), url, 'post');
    }
    public get(url: string, params?: any): Promise<IApiData> {
      if (IS_DEBUG || window['IS_DEBUG']) {
        console.group(`request[get]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
      }
      return this.resolveResponse(request.get(`${baseURL}${url}`, {
          params,
      }), url, 'get');
    }
    public put(url: string, params?: any): Promise<IApiData> {
      if (IS_DEBUG || window['IS_DEBUG']) {
        console.group(`request[put]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
      }
      return this.resolveResponse(request.put(`${baseURL}${url}`, params), url, 'put');
    }
    public delete(url: string, params?: any): Promise<IApiData> {
      if (IS_DEBUG || window['IS_DEBUG']) {
        console.group(`request[delete]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
      }
      return this.resolveResponse(request.delete(`${baseURL}${url}`, {
          params,
      }), url, 'delete');
    }
    public patch(url: string, params?: any): Promise<IApiData> {
      if (IS_DEBUG || window['IS_DEBUG']) {
        console.group(`request[patch]:${url}`);
        console.log('params : ', params);
        console.groupEnd();
      }
      return this.resolveResponse(request.patch(`${baseURL}${url}`, params), url, 'patch');
    }
    setRequestToken(token: string) {
      localStorage.setItem('token', token);
    }
}

export default new Http();

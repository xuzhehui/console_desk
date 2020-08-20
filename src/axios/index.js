import axios from "axios";

import Vue from 'vue'

const instance = axios.create(config)

// 3. 配置信息
let config = {
    // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
    // baseURL: "http://127.0.0.1:5590",
    // 请求超时时间
    timeout: 10000,
    // 每次请求携带cookie
    withCredentials: true,
}

//请求拦截，后期可能会用到，先注册在此
instance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token');
    let proxy_url = '/proxy'//打包上线时此处请注释掉
    config.url = proxy_url+config.url;
    // 在发送请求之前做些什么，例如加入token
    config.headers['Authorization'] = token || 'c9cc8ebff9c7ee2edec538258efa7e9e1b758827'
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 2. 响应拦截
instance.interceptors.response.use(res => {
      if(res.status == 200){
        if(res.data.code == 200){
            // Vue.prototype.$Message.success(res.data.message)
            return res.data
        }else{//若code 非 200
            Vue.prototype.$Message.error(res.data.msg)
            return res.data
        }
      }else{
          return Vue.prototype.$Message.error('请求超时')
      }
    },
    // 对于错误响应的处理
    err => Vue.prototype.$Message.error("服务异常")
);

export default instance
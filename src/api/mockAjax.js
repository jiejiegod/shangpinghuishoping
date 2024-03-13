// axios进行二次封装
import axios from 'axios'

// 引入进度条
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

// 创建axios实例
 const request = axios.create({
    baseURL:'/mock',
    timeout:5000
 })

// 请求拦截
request.interceptors.request.use(config=>{
    NProgress.start()
    return config;
},error=>{
    return Promise.reject(error);
})
//响应拦截器
request.interceptors.response.use(response=>{
    NProgress.done()
    return response.data;
},error=>{
    return Promise.reject(error);
}) 
// 对外暴露
export default request;
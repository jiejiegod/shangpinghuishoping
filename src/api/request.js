// axios进行二次封装
import axios from 'axios'

// 引入进度条
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'

// 创建axios实例
 const request = axios.create({
    baseURL:'/api',
    timeout:5000
 })

// 请求拦截
request.interceptors.request.use(config=>{
    if(store.state.detail.uuid_token){
         config.headers.userTempId=store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
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
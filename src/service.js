import { Message } from 'element-ui'
import axios from 'axios'
import { getToken } from './utils/setToken.js'


const service = axios.create({
    baseURL: '/api',  //baseURL自动添加在请求地址上
    timeout: 3000
})


// 请求拦截器
service.interceptors.request.use((config) => {
    //请求前做些什么(获取并设置token)
    config.headers['token'] = getToken('token')
    console.log("请求拦截器config:",config);
    return config
}, (err) => {
    return Promise.reject(err)
})



// 响应拦截器
service.interceptors.response.use((response) => {
    // 对响应数据做些什么
    let { status, message } = response.data
    if (status !== 200) {
        Message({ message: message || 'error', type: 'warning' })
    }
    console.log("请求拦截器config:",response);
    return response
    
}, (err) => {
    return Promise.reject(err)
})

export default service



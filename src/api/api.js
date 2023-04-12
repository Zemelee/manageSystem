// 把对应的接口请求封装为api    

import service from "@/service.js";
import qs from 'qs'


// 与接口相关的，登录接口，一旦参数表动就在此处更改
export function login(data) {
    return service({
        method: 'post',
        url: '/login',
        data
    })
}


// 学生列表查询接口
export function student(params) {
    return service({
        method: 'get',
        url: '/students',
        params
    })
}

// 学生列表删除接口
export function studentDel(id) {
    return service({
        method: 'delete',
        url: `/students/${id}`,
    })
}



// 信息列表新增接口
export function info(data) {
    data = qs.stringify(data)
    let obj = {}
    return service({
        method: 'post',
        url: '/info',
        data
    })
}

// 信息列表修改接口
export function updateinfo(data) {
    data = qs.stringify(data) //将对象序列化成URL的形式以&进行拼接
    console.log("修改接口data", data);
    return service({
        method: 'put',
        url: '/info',
        data
    })
}

// 信息列表查询接口
export function getinfo(data) {
    return service({
        method: 'get',
        url: '/info',
    })
}


// 信息列表查询接口
export function delinfo(id) {
    return service({
        method: 'delete',
        url: `/info/${id}`,
    })
}



// 数据概览接口
export function dataview(){
    return service({
        method:'get',
        url:'/dataview'
    })
}
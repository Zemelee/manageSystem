// 获取表格数据的api

// url:请求接口
// param：查询接口需要用到的参数,如果传了则为params，未传则为空对象
export function getData(root, url, params) {
    root.service.get(url, { params: params || {} })
        .then(res => {
            //将请求到的数据赋值给tableData
            setTimeout(function(){
                console.log("2000s");
            },2000)
            root.tableData = res.data.data
            root.total = res.data.total
            try {
                root.loading = false
                console.log("loading");
            } catch (error) {
                console.log(error);
            }
            
        }).catch(err => {
            throw err
        })
}


// 新增+修改接口
import qs from 'qs';
// callback:修改完成之后需要重新查询数据，即callback查询函数
export function changeInfo(root, method, url, form, callback) {
    let data = qs.stringify(form) //将对象序列化成URL的形式以&进行拼接
    root.service[method](url, data)
        .then(res => {
            if (res.data.status === 200) {
                callback(root, url) //getData(this,'url')
                root.dialogFormVisible = false
                root.$message({ type: 'success', message: res.data.message })
            }
        }).catch(err => {
            throw err
        })
}

export function delData(root, url, id, callback) {
    root.$alert("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        callback: () => {
            root.service.delete(`${url}/${id}`).then(res => {
                if (res.data.status === 200) {
                    root.$message({ message: "删除成功", type: "success" });
                    callback(root, url)
                }
            })
        }
    });
}



// 将字段转换为汉字
export function getTableData(root, url, params,arr) {
    root.service.get(url, { params: params || {} })
        .then(res => {
            if (res.status === 200) {
                //将请求到的数据赋值给tableData
                root.tableData = res.data.data
                root.total = res.data.total
                //遍历数组
                root.tableData.map(item=>{
                    // 遍历数组的字段，通过键取值
                    arr.map(aItem=>[
                        item[aItem] ? item[aItem+'_text'] = '是' : item[aItem+'_text'] = '否'
                    ])
                })
                root.loading = false
            }
        }).catch(err => {
            throw err
        })
}
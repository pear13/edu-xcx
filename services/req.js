// const URL = "http://192.168.31.250:8000/api"; // 家里路由
// const URL ="http://192.168.100.62:8000/api";  // 手机路由
// const URL = "http://192.168.10.143:8000/api"; // 公司路由
const URL = "http://pear13.com:8000/api" //线上
const token = wx.getStorageSync('token');


const req = async (api, data = {}, options = {}) => {
    return await new Promise(function (resolve, reject) {
        var url = `${URL}${api}`;
        options = {
            method: options.method || "GET",
            loading: options.loading || false,
            loadingText: options.loadingText ? options.loadingText : '加载中...',
            error: options.error || [],
        }
        if (options.loading) {
            wx.showLoading({
                title: options.loadingText,
                mask: true
            })
        }
        //   console.log(options.method,"方法")
        wx.request({
            url,
            data: data,
            method: options.method,
            header: {
                "TOKEN": wx.getStorageSync('token'), // 默认值
                "Content-Type": "application/json;charset=utf-8"
            },
            success: res => { //sucess和fail中主要解决由网络问题导致的异常
                if (res.statusCode != 200) { //HTTP请求问题
                    wx.showToast({
                        title: `服务器好像出了点小问题，请与客服联系~（错误代码：${res.statusCode}）`,
                        icon: 'none',
                    });
                    // console.error(`${url} failed with http code ${res.statusCode}`, res);
                    reject(res);
                } else {
                    // console.log(res)
                    if (res.data.code  == 0) { //接口请求成功
                        resolve(res.data); //微信外面包裹了一层 所以这里有两个data
                    } else {
                        // wx.showToast({
                        //     title: options.error[res.data.statusCode] || options.error[0],
                        //     icon: 'none',
                        // })
                        resolve(res.data);
                    }
                }
            },
            fail: err => {
                reject(err);
            },
            complete: data => {
                wx.hideLoading();
            }
        })
    })

}


module.exports = req;
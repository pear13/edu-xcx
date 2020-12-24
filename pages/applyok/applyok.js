// pages/applyok/applyok.js
const app=getApp();
const R = app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            status:options.status,
            cause:options.cause
        })
        R.ready().then(res=>{
            // 用户信息存缓存
            wx.setStorageSync('userInfo', res.data.userInfo)
            this.setData({
                gift:res.data.gift,
                utype:res.data.utype,
            })
        })
    },
    


})
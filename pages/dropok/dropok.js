// pages/dropok/dropok.js
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

    },
    ok(){
        wx.reLaunch({
            url:"/pages/study/study"
        })
    }
})
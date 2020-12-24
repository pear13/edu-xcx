// pages/teamok/teamok.js
const app = getApp();
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
        this.setData
            ({
                time: options.stime,

            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    // 知道了
    ok(){
        wx.redirectTo({
            url:"/pages/study/study"
        })
    },
})
// pages/video/video.js
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
        R.video({id:options.id|| 1}).then(res=>{
            console.log(res)
            this.setData({
                video:res.data
            })
        })
    },


})
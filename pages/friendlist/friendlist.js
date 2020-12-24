// pages/friendlist/friendlist.js
const app = getApp();
const R = app.router
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
        R.share().then(res=>{
            this.setData({
                list:res.data
            })
        })
    },
    // 点击规则
    register_rule: function () {
        this.setData({
            register_rule: !0,
            status_show: 2
        });
    },
    // 关闭规则
    hideModal: function () {
        this.setData({
            register_rule: !1
        });
    },    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        let uid = wx.getStorageSync('userInfo').id;
        return {
            title: '快来和我一起上节课吧～',
            path: `pages/home/home?uid=${uid}`, // 路径，传递参数到指定页面。
            // imageUrl: '../../imgs/xx.png', // 分享的封面图
            success: function (res) {
                // 转发成功
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail: function (res) {
                // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        }
    },
})
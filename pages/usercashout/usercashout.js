// pages/usercashout/usercashout.js
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
            R.user_money().then(res=>{
                this.setData({
                    beout:res.data
                })
            })
    },
    // 提现
    cash() {
        var self = this;
        var beout = this.data.beout;
        if (beout <= 1) {
            wx.showToast({
                title: '金额满1元才可提现哦',
                icon: "none"
            })
        } else {
            R.user_cashout().then(res => {
                console.log(res)
                if (res.code == 0) {
                    wx.showToast({
                        title: '已提交申请，预计三个工作日内到账',
                        icon: "none"
                    })
                    self.setData({
                        beout: 0
                    })
                }else{
                    wx.showToast({
                        title: '提现功能等待开通中，敬请期待！',
                        icon: "none"
                    })
                }
            })
        }
    },

  
})
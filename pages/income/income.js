// pages/income/income.js
var app = getApp();
const R = app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab: 0,
        active1: 1,
        activeNames: ['1'],
        ke: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        self.setData({
            ke:options.ke,
            leave: app.globalData.leave,
            tablist: app.globalData.tablist,
            active: app.globalData.tabactive
        })

        this.Cashout()
    },


    cash() {
        var self = this;
        var ke = this.data.ke;
        if (ke <= 1) {
            wx.showToast({
                title: '金额满1元才可提现哦',
                icon: "none"
            })
        } else {
            R.beout().then(res => {
                console.log(res)
                if (res.code == 0) {
                    wx.showToast({
                        title: '已提交申请，预计三个工作日内到账',
                        icon: "none"
                    })
                    self.setData({
                        ke: 0
                    })
                }
            })
        }
    },

    // tab
    tab(e) {
        console.log(e)
        var self = this;
        var index = e.detail.index;

        // 审核中
        if (index == 1) {
            var data = {
                status: index - 1
            }
            R.cashout(data).then(res => {
                console.log(res)
                self.setData({
                    inreview: res.data
                })
            })
        }
        // 提现成功
        if (index == 2) {
            var data = {
                status: index - 1
            }
            R.cashout(data).then(res => {
                console.log(res)
                self.setData({
                    success: res.data
                })
            })
        }
        // 提现失败
        if (index == 3) {
            var data = {
                status: index - 1
            }
            R.cashout(data).then(res => {
                console.log(res)
                self.setData({
                    cashfail: res.data
                })
            })
        }
    },
    // 查看失败原因
    onChanges(event) {
        // console.log(event,"查看失败原因")
        this.setData({
            activeNames: event.detail
        });
    },
    // 提现
    Cashout(status) {
        var self = this;
        if (status != undefined) {
            var data = {
                status
            }
        }

        R.cashout(data).then(res => {
            console.log(res)
            self.setData({
                ke: res.ke
            })
        })
    }

})
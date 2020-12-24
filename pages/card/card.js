// pages/card/card.js
const app = getApp();
const R = app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取会员卡
        this.Card()
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
    // 获取会员卡
    Card(){
        R.Card().then(res=>{
            // console.log(res)
            this.setData({
                card:res.data
            })
        })
    },
    // 滑动
    change(e){
        console.log(e)
        var index = e.detail.current;
        this.setData({
            index:index
        })
    },
    // 购买会员
    buy(e){
        console.log(e)
        var id = e.currentTarget.dataset.id;
        var data={
            id,
        }
        R.Pay(data).then(res=>{
            console.log(res)
            var timeStamp = res.data.timeStamp;
            var nonceStr = res.data.nonceStr;
            var ppackage = res.data.package;
            var paysign = res.data.paySign;
            var signType = res.data.signType;
            // 调用支付接口进行付款
            wx.requestPayment({
                timeStamp: timeStamp,
                nonceStr: nonceStr,
                package: ppackage,
                signType: signType,
                paySign: paysign,
                success: function (res) {
                    console.log(res)
                    if (res.errMsg =="requestPayment:ok"){
                        var data={
                            nonceStr: nonceStr
                        }
                        R.PutOrder(data).then(res=>{
                            console.log(res.data)
                            wx.redirectTo({
                                url: '/pages/orderok/orderok',
                            })
                        })
                    }
                    // var data = {
                    //     oNo
                    // }
                    // app.api.Status(data).then(res => {
                    //     // console.log(res)
                    //     if (res.status === 1) {
                    //         wx.redirectTo({
                    //             url: '/pages/orderok/orderok',
                    //         })
                    //     } else {
                    //         wx.showToast({
                    //             title: '支付失败',
                    //             icon: 'none'
                    //         })
                    //     }
                    // })
                },
                fail: function (res) { },

            })
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.onUnload()
    },
    /**
        * 生命周期函数--监听页面卸载
        */
    onUnload: function () {
        var formIds = this.data.formIds || [];
        console.log(formIds, "监听页面卸载")
        if (formIds.length > 0) {
            var data = {
                formids: formIds
            }
            R.formid(data).then(res => {
                this.setData({
                    formIds: []
                })
            })
        }

    },

    submitFormId(e) {
        console.log(e, "from")
        var formId = e.detail.formId;
        var formIds = this.data.formIds || []
        if (formId != "the formId is a mock one") {
            formIds.push(formId)
        }
        this.setData({
            formIds,
        })
    },
})
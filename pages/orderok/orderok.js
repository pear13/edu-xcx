// pages/orderok/orderok.js
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        var formIds = this.data.formIds;
        if (formIds.length > 0) {
            var data = {
                formids: formIds
            }
            app.api.Formid(data).then(res => {
                console.log(res)
            })
        }

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        var formIds = this.data.formIds;
        if (formIds.length > 0) {
            var data = {
                formids: formIds
            }
            app.api.Formid(data).then(res => {
                console.log(res)
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
    // 查看订单
    bun(e){
        wx.redirectTo({
            url:'/pages/study/study'
        })
    }
})
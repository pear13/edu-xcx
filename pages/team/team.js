// pages/team/team.js
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
        console.log(options)
        this.setData({
            options
        })
        this.getorder(options)
        
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
    // 拼课列表
    getorder(options){
        R.Order(options).then(res=>{
            this.setData({
                list:res.data
            })
        })
    },
    // 自主开课
    create(e){
        let options = this.data.options;
        wx.redirectTo({
            url: `/pages/ordering/ordering?freetime=${options.freetime}&list_id=${options.list_id}&status=${options.status}`,
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
// pages/signup/signup.js
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
     
    },
    onShow(e){
        R.sign_record().then(res => {
            console.log(res.data)
            let list1 = [];
            let list2 = [];
            for (var l in res.data) {

                if (!res.data[l].ucmted) {
                    list1.push(res.data[l])
                } else {
                    list2.push(res.data[l])
                }
            }
            this.setData({
                list1,
                list2
            })
        })
    },

    // 进入详情
    sub(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/orderinfo/orderinfo?id=' + id,
        })
    },
    // 评价
    eval(e){
        console.log("去评价")
        let oid = e.currentTarget.dataset.oid;
        wx.navigateTo({
            url: `/pages/vappraise/vappraise?oid=${oid}`,
        })
    }

})
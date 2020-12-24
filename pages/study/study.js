// pages/study/study.js
const app=getApp();
const R=app.router
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
        const self = this;
        // 我的会员
            self.MyCard()
        //我的学习
        self.MyStudy()
        if (app.globalData.tablist) {
            self.setData({
                tablist: app.globalData.tablist,
                tab_a: 2
            })
        } else {
            self.addTab()   //存tab
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    // 存tabbar
    addTab(e) {
        const self = this,
            tablist = app.util.TabList(1);
        app.globalData.tablist = tablist;
        self.setData({
            tablist: tablist,
            tab_a: 2
        })


    },
    // 学习搭档
    partner(){
        wx.navigateTo({
            url: '/pages/partner/partner',
        })
    },
    //我的会员
    MyCard(){
        R.MyCard().then(res=>{
           this.setData({
               card:res
           })
        })
    },
    // 我的学习
    MyStudy(){
        R.MyStudy().then(res => {
            this.setData({
                study: res.data
            })
        })
    },
    // 切换tab
    tabChange(event) {
        wx.showLoading({
            title: '加载中...',
        })
        var index = event.detail,
            tablist = this.data.tablist,
            url = tablist[index].url;
        wx.redirectTo({
            url,
        })
        wx.hideLoading()
        app.globalData.tabactive = index;
    },
    // 最近在学 进入详情
    zjsub(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/orderinfo/orderinfo?id=' + id,
        })
    },
    //拼课记录 进入详情
    pksub(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/orderinfo/orderinfo?id=' + id,
        })
    },
    // 发出邀请
    goshare(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/cfriend/cfriend?id=${id}`,
        })
    },
    // 报名记录 进入详情
    bmsub(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/orderinfo/orderinfo?id=' + id,
        })
    },
    // 评价
    eval(e) {
        console.log("去评价")
        let oid = e.currentTarget.dataset.oid;
        wx.navigateTo({
            url: `/pages/vappraise/vappraise?oid=${oid}`,
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
// pages/tsub/tsub.js
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
    onLoad: function(options) {
        const self = this;
        if (app.globalData.tablist) {
            self.setData({
                tablist: app.globalData.tablist,
                tab_a: 1
            })
        } else {
            self.addTab() //存tab
        }

    },
    onShow(){
        // 请求教师列表
        let index=this.data.index;
        this.getlist(index + 1)
    },
    // 切换顶部tab
    onChange(e) {
        let index = e.detail.index;
        this.setData({
            index
        })
        this.getlist(index + 1)
  
    },
    getlist(id) {
        R.tch_sub({
            id: id
        }).then(res => {
           this.setData({
               ['list'+id]:res.data
           })
        })
    },
    // 评价
    eval(e) {
        console.log("去评价")
        let oid = e.currentTarget.dataset.oid;
        wx.navigateTo({
            url: `/pages/vappraise/vappraise?oid=${oid}&tch=tch`,
        })
    },
    // 存tabbar
    addTab(e) {
        const self = this,
            tablist = app.util.TabList(2);
        app.globalData.tablist = tablist;
        self.setData({
            tablist: tablist,
            tab_a: 0
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
})
// pages/tmy/tmy.js
const app = getApp();
const R = app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "money.ke":0,
        beout:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;
        if (app.globalData.tablist) {
            self.setData({
                tablist: app.globalData.tablist,
                tab_a: 2
            })
        } else {
            self.addTab()   //存tab
        }

        // 请求数据
        this.getclass()
    },
    getclass(e){
        R.tch_cashout().then(res=>{
            console.log(res)
            this.setData({
                money:res.data
            })
        })
    },
    cashout(){
        let ke =this.data.money.ke ||0
        wx.navigateTo({
            url: `/pages/income/income?ke=${ke}`,
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
    // 存tabbar
    addTab(e) {
        const self = this,
            tablist = app.util.TabList(1);
        app.globalData.tablist = tablist;
        self.setData({
            tablist: tablist,
            tab_a: 0
        })


    },
    gomydetail(e){
        wx.navigateTo({
            url: '/pages/apply/apply',
        })
    }

})
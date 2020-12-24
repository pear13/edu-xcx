// pages/my/my.js
var app = getApp();
var R = app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const self = this;
        // 取用户信息
        wx.getStorage({
            key: 'userInfo',
            success: function(res) {
                self.setData({
                    userInfo: res.data
                })
            },fail(){
                R.ready().then(res=>{
                    // 用户信息存缓存
                    wx.setStorageSync('userInfo', res.data.userInfo)
                    self.setData({
                        userInfo:res.data.userInfo
                       
                    })
                })
            }
        })
 
        if (app.globalData.tablist) {
            self.setData({
                tablist: app.globalData.tablist,
                tab_a: 3
            })
        } else {
            self.addTab() //存tab
        }
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 查询会员卡
        this.GetCard()
        R.apply_record().then(res=>{
            this.setData({
                record:res
            })
        })
    },
    // 查询会员是否开通
    GetCard(){
        R.MyCard().then(res=>{
            if(res.data){
              this.setData({
                  card:true
              })
            }
            
        })
    },
    // 存tabbar
    addTab(e) {
        const self = this,
            tablist = app.util.TabList(1);
        app.globalData.tablist = tablist;
        self.setData({
            tablist: tablist,
            tab_a: 3
        })


    },
    // 立即登陆=>获取用户信息
    GetUser(e) {
        var self = this;
        app.util.Check().then(res => {
            var data = e.detail.userInfo;
            R.Land(data).then(res => {
                self.setData({
                    userInfo: res.data
                })
                // 把用户信息存缓存
                wx.setStorageSync('userInfo', res.data)
            })
        })
    },
    // 购买会员卡
    buycard() {
        // let card=this.data.card;

        app.util.Check().then(res => {
            wx.navigateTo({
                url: '/pages/card/card',
            })
        })

    },
    // 我的收益
    money() {
        app.util.Check().then(res => {
            wx.navigateTo({
                url: '/pages/usercashout/usercashout',
            })
        })
    },

    // 我的介绍
    introduce() {
        app.util.Check().then(res => {
            wx.navigateTo({
                url: '/pages/introduce/introduce',
            })
        })
    },
    // 申请成为教师
    goApply(){
        var record=this.data.record
        if (record.data!=0){
            
            wx.navigateTo({
                url: `/pages/applyok/applyok?status=${record.data}&cause=${record.cause}`,
            })
        }else{
            wx.navigateTo({
                url: '/pages/apply/apply',
            })
        }

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
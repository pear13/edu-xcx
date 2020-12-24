// pages/home/home.js
import regeneratorRuntime from "../../libs/regenerator-runtime.js";
import Dialog from '../../dist/dialog/dialog';
const app = getApp();
const R = app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pages: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const self = this;
        // 是否显示引导页
        if (false) {
            wx.hideTabBar()
            self.setData({
                lead: true
            })
            setTimeout(function () {
                console.log("延迟自行")
                wx.showTabBar()
                self.setData({
                    lead: false
                })
                app.globalData.lead = true
            }, 3000)
        }
        // 请求uid
        R.get_uid().then(res => {
            console.log(res)
            wx.setStorageSync('uid', res.data.uid)
            self.setData({
                gift:res.data.gift
            })

        })
        R.ready().then(res=>{
            // 用户信息存缓存
            wx.setStorageSync('userInfo', res.data.userInfo)
            this.setData({
                gift:res.data.gift,
                utype:res.data.utype,
            })
        })

        // 邀请好友
        console.log(options, "邀请好友")
        if (options.uid) {
            R.invite({
                uid: options.uid
            }).then(res => {})
            console.log("邀请好友")
        }
        self.addTab() // 加载tab栏
        self.Home() // 分类及banner
        self.Sub(1) // 课程列表

    },

    // 去详情页
    goDetail(e) {
        var id = e.currentTarget.dataset.id;
        if (typeof e.detail == 'number') {
            var id = e.detail
        }
        wx.navigateTo({
            url: `/pages/subdetail/subdetail?id=${id}`,
        })

    },

    Home() {
        const self = this;
        R.Home().then(res => {
            self.setData({
                banner: res.data.banner,
                sort: res.data.sort,
          
            })
        })
    },
    // 课程列表
    Sub(sortId) {
        const self = this,
            list = self.data['list' + sortId] || [],
            page = self.data['page' + sortId] || 0,
            data = {
                sort: sortId
            };
        data['page'] = page + 1


        R.SubList(data).then(res => {
            // console.log(res)
            if (page > 1) {
                for (var r in res.data) {
                    list.push(res.data[r])
                }
            } else {
                var list = res.data
            }
            self.setData({
                ['list' + sortId]: list,
                ['page' + sortId]: page + 1
            })


        })


    },
    // 切换身份
    cut() {
        wx.reLaunch({
            url: "/pages/tch/tch"
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        let utype = app.globalData.utype;
        console.log(utype)
        if (utype != 0) {
            this.setData({
                utype: utype
            })
        } else {
            app.checkLoginReadyCallback = res => {
                this.setData({
                    utype: res.data.utype
                })
            };

        }

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        this.onUnload()
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
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
    // 领取礼包失败。去完善个人信息
    perfect(e){
        console.log(e)
        Dialog.confirm({
            title: '领取礼包失败',
            message: '请先完善个人信息，方便礼包发放～',
            confirmButtonText:"去完善"
        }).then(() => {
            // on confirm
            wx.redirectTo({
                url:"/pages/introduce/introduce"
            })
        }).catch(() => {
            // on cancel
        });
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
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        let uid = wx.getStorageSync('uid');
        console.log(uid, `pages/home/home?uid=${uid}`)
        return {
            title: '快来和我一起上节课吧～',
            path: `pages/home/home?uid=${uid}`, // 路径，传递参数到指定页面。
            // imageUrl: '../../imgs/xx.png', // 分享的封面图
            success: function(res) {
                // 转发成功
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail: function(res) {
                // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        }


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

})
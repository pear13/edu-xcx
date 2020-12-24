// components/newgift/newgift.js
const app=getApp();
const R = app.router;
import Dialog from '../../dist/dialog/dialog';
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        hovercoupons: !0
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行

            this.setData({
                fit: app.globalData.fit.isAddHeight
            })
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 新人礼包
        hoverNewcoupons: function (e) {
            console.log("新人礼包", e)
            var self = this;
            self.setData({
                hovercoupons: !1
            })
        },
        // 领取礼包
        newCoupon(e){
            app.Message().then(res=>{
            let phone= wx.getStorageSync('userInfo').phone
            if (phone){
                R.getgift().then(res=>{
                    console.log(res)
                    wx.showToast({
                        title: '领取成功，请到学习页面查看！',
                        icon: 'none',
                        duration: 3000
                    })
                })
          
            }else{
                // 去完善个人信息
                this.triggerEvent('perfect')
            }
        })

        },
        // 关闭礼包
        hide: function (e) {
            console.log("新人礼包", e)
            var self = this;
            self.setData({
                hovercoupons: !0
            })
        },
    }
})

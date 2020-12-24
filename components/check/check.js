// components/check/check.js
const app=getApp();
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

    },

    /**
     * 组件的方法列表
     */
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行

            this.setData({
                fit: app.globalData.fit.isAddHeight
            })
        },
    },
    methods: {
        // 切换身份
        cut() {
            wx.reLaunch({
                url: "/pages/tch/tch"
            })
        },
  
    }
})

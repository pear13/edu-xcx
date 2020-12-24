var app = getApp();
var R = app.router;
import Dialog from '../../dist/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 学习搭档
        this.mytch()
    },


    // 学习搭档列表
    mytch() {
        R.mytch().then(res => {
            this.setData({
                list: res.data
            })
        })
    },
    look(e) {
        let index=e.currentTarget.dataset.index;
        this.setData({
            show: true,
            index
        });
    },
    //关闭
    onClose() {
        this.setData({
            show: false
        });
    },
})
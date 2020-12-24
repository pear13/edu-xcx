// pages/partner/partner.js

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
    onLoad: function(options) {
        // 学习搭档
        this.Partner()
    },


    // 学习搭档列表
    Partner() {
        R.Partner().then(res => {
            this.setData({
                list: res.data
            })
        })
    },
    // 申请成为好友
    apply(e) {
        let apply = e.currentTarget.dataset.apply;
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        let list=this.data.list;
        let data = {
            type: Number(index) + 1,
            id,
        };
        Dialog.confirm({
            title: '提示',
            message: '发送好友申请？'
        }).then(() => {
            R.addfriend(data).then(res => {
                console.log(res, "----申请成为好友----")
                wx.showToast({
                    title: '申请成功',
                    icon:'none'
                })
                list[index].apply=1
                this.setData({
                    list
                })
            })
        }).catch(() => {
            // on cancel
        });
     
    },
    // 对方请求添加你为好友
    agree(e) {
        let index = e.currentTarget.dataset.index;
        let list = this.data.list;
        Dialog.confirm({
            title: '好友申请',
            message: '对方请求添加您为好友',
            confirmButtonText: "同意",
            cancelButtonText: "拒绝",
        }).then(() => {
            var type = 2
            let id = e.currentTarget.dataset.id;
            var data = {
                type,
                id,
            }
            R.addfriend(data).then(res => {
                console.log(res, "----申请成为好友----")
            })
            wx.showToast({
                title: '已同意',
                icon: 'none'
            })
            list[index].apply=2
            this.setData({
                list
            })


        }).catch(() => {
            var type = 3
            let id = e.currentTarget.dataset.id;
            var data = {
                type,
                id,
            }
            R.addfriend(data).then(res => {
                console.log(res, "----申请成为好友----")
            })
            wx.showToast({
                title: '已拒绝',
                icon: 'none'
            })
            list[index].apply = 3
            this.setData({
                list
            })
        });

    },
    // 查看联系方式
    look(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            show: true,
            index
        })
    },
    // 复制联系方式
    copy(e){
        let index = this.data.index;
        let list=this.data.list[index];
        wx.setClipboardData({
            data: `微信：${list.wx_num}手机：${list.phone}邮箱：${list.mail}`,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        wx.showToast({
                            title: '复制成功'
                        })
                    }
                })
            }
        })
    },
    //关闭
    onClose() {
        this.setData({
            show: false
        });
    },
})
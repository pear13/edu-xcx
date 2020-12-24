// pages/orderinfo/orderinfo.js
const app = getApp();
const R = app.router;
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
        this.setData({
            options,
        })
        this.OrderDetail(options)
    },
    // 关闭个人资料弹窗
    onClose() {
        this.setData({
            show: false
        });
    },
    // 开启个人资料弹窗
    popstudent(e) {
        console.log(e)
        let popstudent=e.currentTarget.dataset.id;
        if((popstudent==2 && this.data.detail.partner) || popstudent==1){
            this.setData({
                show: true,
                popstudent
            });
        }
      
      
    },
    // 请求下单信息
    OrderDetail(options) {
        R.OrderDetail(options).then(res => {
            this.setData({
                detail: res.data
            })
        })
    },
    // 退课
    drop() {
        let detail = this.data.detail;
        let time = detail.time.date + " " + detail.time.start;
        let now = new Date()
        let c_time = new Date(time)
        let diff = c_time.getTime() - now.getTime();
        if (diff - 86400000 < 0) {
            Dialog.alert({
                title: '提示',
                message: '离开始时间24小时不到，不可退课了哦～'
            }).then(() => {
                // on close
            });

        } else {
            Dialog.confirm({
                title: '退课',
                message: '是否取消该课程'
            }).then(() => {
                let data = {
                    id: detail.id

                };

                R.drop(data).then(res => {
                    console.log(res)
                    if (res.code != 0) {
                        wx.showToast({
                            title: res.msg,
                            icon: "none"
                        })
                    } else {
                        wx.redirectTo({
                            url: "/pages/dropok/dropok"
                        })
                    }
                })
            }).catch(() => {
                // on cancel
            });
        }

    },


})
// pages/vappraise/vappraise.js
const app = getApp();
const R = app.router;

import Dialog from '../../dist/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tempFilePaths:[],
        tch:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var oid = options.oid 
        this.setData({
            oid,
        })

        if (options.tch){
            this.setData({
                tch:true
            })
        }
    },



 
    // 留言
    messtext(e){
        console.log(e)
        var f = e.detail;
        this.setData({
            message: f
        })
    },
  

    // 教师评分
    onChange1(e) {
        var f = e.detail;
        this.setData({
            tch_star: f
        })
    },
    // 课程评分
    onChange2(e) {
        var f = e.detail;
        this.setData({
            sub_star: f
        })
    },
    // 行程安排
    onChange3(e) {
        var f = e.detail;
        this.setData({
            arrange: f
        })
    },
    // 提交
    submit(e) {
        var self = this;

     
        this.CreateComment()
    },
    CreateComment() {
        var self = this,

            content = self.data.message;
     
        var data = {
            oid: self.data.oid,
            content,
            sub_star: self.data.sub_star,
            tch_star: self.data.tch_star,
        }
        if (this.data.tch){
            data['type']=1
        }
        R.comment(data).then(res => {
            console.log(res)
            Dialog.alert({
                title: '评价成功',
                message: '感谢您的支持！',
                confirmButtonText:"返回上一页"
            }).then(() => {
                // on close
                wx.navigateBack({
                    delta: 1
                })
            });
        })
    }
})
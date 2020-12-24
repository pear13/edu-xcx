// pages/complain/complain.js
const app = getApp();
const R = app.router;
const notify=require('../../utils/notify.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        label:[
            { id: 1, value:"教师迟到"},
            { id: 2, value: "教师未开课" },
            { id: 3, value: "课程效果太差" },
            { id: 4, value: "与所学内容不符" },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            oid:options.id
        })
    },
    // 选择标签
    label(e){
        let id = e.currentTarget.dataset.id;
        let label=this.data.label;
        for(var l in label){
            label[l].sec=false
        }
        label[id].sec=true;
        this.setData({
            labels:label[id].id,
            label
        })
        
    },
    // 详细说明
    sign(e){
        console.log(e)
        this.setData({
            content:e.detail.value
        })
    },
    // 提交
    ok(e){
        let content = this.data.content;
        let labels=this.data.labels;
        let oid = this.data.oid;
        if(!content){
            return notify.spin('请说明原因')
        }
        if(!labels){
            return notify.spin('请选择标签')
        }
        let data={
            content, labels, oid
        }
        R.complain(data).then(res=>{
            console.log(res)
            if(res.code!=0){
                wx.showToast({
                    title: res.msg,
                    icon:'none'
                })
            }else{
                wx.showModal({
                    title: '提示',
                    content: '投诉成功',
                    showCancel:false,
                    success(res) {
                        if (res.confirm) {
                            wx.navigateBack({
                                delta: 1
                            })
                        } 
                    }
                })
               
            }
        })
    }
})
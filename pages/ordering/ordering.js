// pages/ordering/ordering.js
const app = getApp();
const R = app.router;
import Dialog from '../../dist/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.arr){
            options.arr = JSON.parse(options.arr)
        }
        if (options){
            this.setData({
                options,
            })
            this.GetSubOrder(options)
        }
    
        
    },
    onShow(){
        let options = this.data.options;
        console.log("options", options)
        if (options){
            this.GetSubOrder(options)
        }
    },
    // 请求下单信息
    GetSubOrder(options){
        R.GetSubOrder(options).then(res=>{
            this.setData({
                detail:res.data
            })
        })
    },
    // 立即支付
    pay(e){
        app.SubMsg().then(res=>{

       
        let detail = this.data.detail;
        let options = this.data.options;
        let money=detail.money;
        let price=detail.title.price;
        let status = this.data.options.status;
        let arr =this.data.options.arr;
        if(money-price>=0){
            Dialog.confirm({
                title: `余额：${money}课时`,
                message: `确认消耗${price}课时购买该课程吗？`
            }).then(() => {
                let data={
                    price,
                    sub_id: detail.title.sub_id,
                    status: status,
                    freetime: options.freetime,
                    list_id: options.list_id,
                    tch_id:detail.tch.id,
                    arr: arr
                }
                R.PostSubOrder(data).then(res=>{
                    console.log(res,"生成订单")
                    // 特定邀请
                    if (status==2){
                        wx.redirectTo({
                            url: '/pages/cfriend/cfriend?id='+res.data,
                        })
                    // 指定邀请
                    }else{
                        wx.redirectTo({
                            url: '/pages/teaming/teaming',
                        })
                    }
                
                })
             
            }).catch(() => {
                // on cancel
            });
        }else{
            Dialog.confirm({
                title: '余额不足',
                message: `您的余额为${this.data.detail.money}课时！`,
                confirmButtonText:"去购买"
            }).then(() => {
               wx.navigateTo({
                   url: '/pages/card/card',
               })
            }).catch(() => {
                // on cancel
            });
         
        }
    })
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
        if (formIds & formIds.length > 0) {
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


})
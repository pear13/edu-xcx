// pages/teamdetail/teamdetail.js
const app = getApp();
const R = app.router;
import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
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
        console.log(options)
        if(options.id){
            var id = options.id;
            this.setData({
                id:id
            })
        }
        console.log(options.scene,"生命周期函数--监听页面加载")
        if (options.scene){
            this.setData({
                id: options.scene
            })
        }

        this.OrderDetail(id)
    },
    // 请求拼课信息
    OrderDetail(id){
        var data={
            id,
        };
        R.OrderDetail(data).then(res=>{
            this.setData({
                info:res.data
            })
        })
    },
    // 立即组队
    team(){
        app.SubMsg().then(res=>{
        Dialog.confirm({
            title: '提示',
            message: '申请加入组队'
        }).then(() => {
            R.balance().then(res=>{
                let have=res.data;
                console.log(res.data,"立即组队")
                if(res.data>=1){
                    var data = {
                        id: this.data.id
                    }
                    R.AddTeam(data).then(res => {
                        if (res.msg === 1) {
                            Toast.fail('已经有人抢先一步预定啦～');
                        } else {
                            var time = this.data.info.time;
                            var stime = time.date + " " + time.start;
                            wx.redirectTo({
                                url: "/pages/teamok/teamok?stime=" + stime
                            })
                        }
                    })
                }else{
                    Dialog.confirm({
                        title: '余额不足',
                        message: `您的余额为${have}课时！`,
                        confirmButtonText: "去购买"
                    }).then(() => {
                        wx.navigateTo({
                            url: '/pages/card/card',
                        })
                    }).catch(() => {
                        // on cancel
                    });
                }
            })
      
        }).catch(() => {
            // on cancel
        });
    })
     
    },
 
})
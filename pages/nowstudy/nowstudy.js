// pages/nowstudy/nowstudy.js
const app = getApp();
const R = app.router;
import Notify from '../../dist/notify/notify';
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
  
    },
    onShow(){
        R.last_learn().then(res => {
            console.log(res)
            var list1 = [];
            var list2 = [];
            for (var i in res.data) {
                if (res.data[i].status == 1) {
                    list1.push(res.data[i])
                } else {
                    list2.push(res.data[i])
                }
            }
            this.setData({
                list1,
                list2
            })
        })
    },
    // 联系客服
    bot(e){
        let platform=wx.getStorageSync('platform')
        if(platform){
            let phone=platform.phone;
            wx.makePhoneCall({
              phoneNumber: phone,
            })
        }  
    },
    // 进入详情
    sub(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/orderinfo/orderinfo?id='+id,
        })
    },
    // 投诉
    complain(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url:"/pages/complain/complain?id="+id
        })
    },
    // 确认上课
    classok(e){
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let list1 = this.data.list1;
        let data={
            id
        };
        Dialog.confirm({
            title: '提示',
            message: '确认已上课'
        }).then(() => {
            R.classok(data).then(res => {
                if (res.code == 0) {
                    // 成功通知
                    wx.showToast({
                        title: '确认上课成功',
                        icon: "success"
                    })
                    // 移除
                    list1.splice(index, 1)
                    this.setData({
                        list1
                    })
                    // 去评价
                    wx.navigateTo({
                        url: `/pages/vappraise/vappraise?oid=${id}`,
                    })
                }
            })
        }).catch(() => {
            // on cancel
        });
      
    },
    // 查看处理结果
    reason(e){
        let msg = e.currentTarget.dataset.msg || ""; 
        let status=e.currentTarget.dataset.status;
        
        Dialog.alert({
            title: '处理结果',
            message: status==0?"同意退课！":"不同意退课！"+msg,
            confirmButtonText:'知道了'
        }).then(() => {
            // on close
        });
    }
})
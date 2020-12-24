// pages/teamsub/teamsub.js
const app = getApp();
const R = app.router;
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
        R.team_record().then(res=>{
            console.log(res.data)
            let list1=[];
            let list2=[];
            for(var l in res.data){
        
                if (res.data[l].status=='0'){
                    list1.push(res.data[l])
                }else{
                    list2.push(res.data[l]) 
                }
            }
            this.setData({
                list1,
                list2
            })
        })
    },
    // 进入详情
    sub(e) {
        console.log("进入详情")
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/orderinfo/orderinfo?id=' + id,
        })
    },
    pksub(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/orderinfo/orderinfo?id=' + id,
        })
    },
    // 发出邀请
    goshare(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/cfriend/cfriend?id=${id}`,
        })
    },
})
// pages/subdetail/subdetail.js

const app = getApp();
const R = app.router;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     
        if(options.id){
            this.GetSub(options.id)             // 请求课程详情
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
   
    // 拼课
    buy(e){
        var id = e.currentTarget.dataset.id;
        let date=this.data.date;
     
            wx.navigateTo({
                url: `/pages/tchlist/tchlist?list_id=${id}`,
            })
    
 
    },
    // 预览轮播图
    preview(e){
        console.log(e)
        var lists=e.currentTarget.dataset.list;
        var src=e.currentTarget.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: lists // 需要预览的图片http链接列表
        })
    },
    // 请求课程详情
    GetSub(id){
        var data={
            id:id
        }
        R.SubDetail(data).then(res=>{
            let com=res.data.comment;
            let comment=[]
            for(var i in com){
                let user=[]
                var tch={}
                for(var t in com[i]){
                    if (com[i][t].type==0){
                        user.push(com[i][t])
                    }else{
                        tch = com[i][t]
                    }
                }
                var data={
                    user,tch
                };
                comment.push(data)

            }
            this.setData({
                info:res.data,
                comment,
            })
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
        if (formIds.length > 0) {
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
const app = getApp();
const R=app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    getPhone(e) {
        wx.login({
            success(res){
                const data = e.detail;
                data['code']=res.code;
                R.Phone(data).then(res => {
                    console.log(res)
                    wx.setStorage({
                        key: 'token',
                        data: res,
                        success(res){
                            wx.navigateBack({
                                detail:1
                            })
                        }
                    })
                })
            }
        })
   
    }
})
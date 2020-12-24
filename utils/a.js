const a = {
    backlogin(){ // 卸载所有页面回到登陆页面
        wx.reLaunch({
            url:'/pages/login/login'
        })
    }
}
module.exports=a
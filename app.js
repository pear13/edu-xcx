//app.js
var router = require('./services/api.js');
var util = require('./utils/util.js')
App({
    onLaunch: function() {
        this.Login() // 登陆
    },

    // 登陆
    Login() {
        let self = this;
        self.fitScreen()
        wx.login({
            success(res) {
                // console.log(res)
                var data = {
                    code: res.code
                }
                router.Login(data).then(res => {
                    // console.log(res)
                    wx.setStorageSync('token', res.data.token)
                    wx.setStorageSync('utype', res.data.utype)
                    self.globalData.utype = res.data.utype;

                    self.checkLoginReadyCallback(res);


                })
                // 平台信息
                router.platform().then(res=>{
                    console.log(res.code)
                    if(res.code==0){
                        wx.setStorageSync('platform', res.data)
                    }
                })
            }
        })
    },
    // 先执行onLaunch
    checkLoginReadyCallback(res) {
        console.log(res)
    },
    // 针对机型做适配处理
    fitScreen() {
        const res = wx.getSystemInfoSync();
        const model = res.model.toLowerCase();
        const addHeightList = ['iphone x', 'iphone xr', 'iphone 11', 'iphone xs'];
        let fit = {};
        fit.isAddHeight = 0;
        fit.topTar = 0;
        addHeightList.forEach((p) => {
            if (model.indexOf(p) > -1) {
                fit.isAddHeight = 54; // 
                fit.topTar = 24;
            }
        });
        this.globalData.fit = fit;
    },
    // 订阅消息
    Message(){
        return new Promise(function (resolve, reject) {
        wx.requestSubscribeMessage({
            tmplIds: ['jSI1BfHpkO5op4N3gEt6-ehBY3z9riQMx4c2XSIaCHg','fV3I2Z3uPsnv24wNnYrqgnY6nyv07vnKJnM7VvDF46M','tCwHx01TMCS6xnOxnO4ovVyw8orTfLYt0bfWVmvjNc8'],
            success(res) {
                console.log(res,"订阅消息---------")
                resolve(res);
             },
             fail(err){
                 console.log(err, "err订阅消息---------")
                 reject(err)
             }
        })
        })
    },
    // 课程相关通知
    SubMsg(){
        return new Promise(function (resolve, reject) {
            wx.requestSubscribeMessage({
                tmplIds: ['PBAz7gC7tdcG2Kr1reuV2TVtP4YAiMcem_4lf0PZpgg','bk0yliP93QhNDDUExbNKVHDqMK4dnIB3BydkvHeoXnw','MIhjSvGC6QCC9v5FPQEEGk3egSgB9vVHzi6JrdAxH6Q'],
                success(res) {
                    console.log(res,"订阅消息---------")
                    resolve(res);
                 },
                 fail(err){
                     console.log(err, "err订阅消息---------")
                     reject(err)
                 }
            })
            })
    },
    // 审核结果通知
    ApplyMsg(){
        return new Promise(function (resolve, reject) {
            wx.requestSubscribeMessage({
                tmplIds: ['fV3I2Z3uPsnv24wNnYrqgnY6nyv07vnKJnM7VvDF46M',],
                success(res) {
                    console.log(res,"订阅消息---------")
                    resolve(res);
                 },
                 fail(err){
                     console.log(err, "err订阅消息---------")
                     reject(err)
                 }
            })
            })
    },
    // 好友邀请结果通知
    ShareMsg(){
        return new Promise(function (resolve, reject) {
            wx.requestSubscribeMessage({
                tmplIds: ['tCwHx01TMCS6xnOxnO4ovVyw8orTfLYt0bfWVmvjNc8',],
                success(res) {
                    console.log(res,"订阅消息---------")
                    resolve(res);
                 },
                 fail(err){
                     console.log(err, "err订阅消息---------")
                     reject(err)
                 }
            })
            })
    },
    router: router,
    util: util,
    globalData: {
        userInfo: null,
        uploadUrl: "https://upload-z0.qiniup.com", // 默认华东
        utype: 0,
        fit:0
    }
})
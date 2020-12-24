// pages/introduce/introduce.js
var app = getApp();
var R = app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sexs: ['女', '男'],
        o: ['工作', '学生', '个体经营/创业', '无业'],
        edus: ['小学', '初中', '高中', '大学', '硕士', '博士'],
        wsks: ['零基础', '入门级', '高中水平', '大学英语四级', '大学英语六级及以上'],
        heights: ['140cm以下', '140~145cm', '146~150cm', '151~155cm', '156~160cm', '161~165cm', '166~170cm', '171~175cm', '176~180cm', '181~185cm', '186~190cm', '191~195cm','195cm以上'],
        weights:['50kg以下','51~70kg','71~90kg','91~110kg','110kg以上']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var self = this;
        //请求用户信息
        self.GetUser()
        // 获取行业列表
        self.Industry()


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    // 请求用户信息
    GetUser() {
        R.GetUser().then(res => {
            res['industry'] = res['industry'] - 1
            this.setData({
                userInfo: res.data
            })
            // 存缓存
            wx.setStorageSync('userInfo', res.data)
        })
    },
    // 请求行业列表
    Industry() {
        R.Industry().then(res => {
            console.log(res)
            this.setData({
                ind: res.data
            })
        })

    },
    // 上传证书
    add() {
        var self = this;
        var userInfo = self.data.userInfo;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                R.QnToken().then(res => {
                    console.log(res,"token========")
                    wx.uploadFile({
                        url: app.globalData.uploadUrl, //仅为示例，非真实的接口地址
                        filePath: tempFilePaths[0],
                        name: 'file',
                        formData: {
                            token: res.data,
                            // key: key
                        },
                        success(res) {
                            console.log(res)
                            const key = JSON.parse(res.data).key;
                            self.setData({
                                "userInfo.avatar": tempFilePaths[0],
                                avafile:key
                            })
                            setTimeout(function() {
                                wx.hideLoading()
                            }, 2000)


                            //do something
                        }
                    })
                })
            }
        })
    },
    // 选择性别
    sexChange(e) {
        var value = e.detail.value;
        if (value == 1) {
            value= true
        } else {
            value = false
        }
        this.setData({
            "userInfo.sex": value
        })

    },
    // 选择出生日期
    dateChange(e) {
        var value = e.detail.value;
        this.setData({
            "userInfo.birth" : value
        })
    },
    // 选择职业
    ocpChange(e) {
        var value = e.detail.value;
        this.setData({
            "userInfo.industry" : value,
   
        })
    },
    // 选择行业
    industryChange(e) {
        var value = e.detail.value;
        this.setData({
            "userInfo.ocp" :value
        })
    },
    // 选择外语水平
    wskChange(e) {
        var value = e.detail.value;
        this.setData({
            "userInfo.wsk" : value
        })
    },
    // 选择学历
    eduChange(e){
        var value = e.detail.value;
        this.setData({
            "userInfo.edu" : value
        })
    },
    // 选择身高
    weightChange(e){
        var value = e.detail.value;
        this.setData({
            "userInfo.weight": value
        })
    },
    // 选择体重
    heightChange(e) {
        var value = e.detail.value;
        this.setData({
            "userInfo.height": value
        })
    },
    // 添加图片
    add(e){
        var self = this;
        var list = self.data.userInfo.images || [];

            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    wx.showLoading({
                        title: '加载中',
                    })
                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePaths = res.tempFilePaths;
                    console.log(tempFilePaths)
                    var temf = self.data.tempFilePaths || [];
                    for (var t in tempFilePaths) {
                        temf.push(tempFilePaths[t])
                        for (var t in tempFilePaths) {
                            R.QnToken().then(res => {
                                console.log(res, "res", app.globalData.uploadUrl)
                                wx.uploadFile({
                                    url: app.globalData.uploadUrl, //仅为示例，非真实的接口地址
                                    filePath: tempFilePaths[t],
                                    name: 'file',
                                    formData: {
                                        token: res.data,
                                        // key: key
                                    },
                                    success(res) {
                                        console.log(res)
                                        const key = JSON.parse(res.data).key;
                                        console.log(tempFilePaths[t])
                                        console.log(key, "----key----")
                                        if(list.length==1){
                                            list[0]=key
                                        }else{
                                            list.push(key)
                                        }
                                    
                                        console.log(list)
                                        self.setData({

                                            'userInfo.images': list
                                        })

                                        setTimeout(function () {
                                            wx.hideLoading()
                                        }, 2000)


                                        //do something
                                    }
                                })
                            })
                        }
                    }


                    self.setData({
                        tempFilePaths: tempFilePaths[0],

                    })


                }
            })

        
    },
    // 预览图片
    look(e) {
        var images=this.data.tempFilePaths
      
        if(!images){
            var images = this.data.userInfo.images[0].image;
        }
        wx.previewImage({
            current: images, // 当前显示图片的http链接
            urls: [images,] // 需要预览的图片http链接列表
        })
    },
    // 提交表单
    formSubmit(e) {
        var self=this;
        var userInfo=self.data.userInfo;
        var detail = e.detail.value;
        console.log(detail)
        var ind = self.data.ind
        //更换头像
        var avafile = this.data.avafile;
        if (avafile){
            userInfo.avakey = avafile
        }else{
            userInfo.avakey = ''
        }
        if (detail.content!=null){
            userInfo.content = detail.content;               // 简介
        }
        if (detail.industry != null){
            console.log(" // 行业 ")
            userInfo.industry = ind[detail.industry];               // 行业 
        }else{
            userInfo.industry = ind[userInfo.industry]; 
        }
        userInfo.birth = detail.date;                    // 生日
        userInfo.edu = detail.edu;                       // 学历
        userInfo.height = detail.height;                 // 身高
        userInfo.phone=detail.iphone;// 手机
        userInfo.mail=detail.mail;// 邮箱
        userInfo.name=detail.name;//姓名
        userInfo.ocp = detail.ocp;// 职业
        userInfo.sex=detail.sex; //性别
        userInfo.sign=detail.sign; //签名
        userInfo.weight=detail.weight; // 体重
        userInfo.wsk=detail.wsk; //外语水平
        userInfo.wx_num = detail.wx_num; //微信号
        console.log(e)
        console.log(userInfo,"----userInfo--")
        //保存用户信息
        R.PostUser(userInfo).then(res => {
    
            wx.showToast({
                title: '资料保存成功',
                icon:'none'
            })
        })
    },
})
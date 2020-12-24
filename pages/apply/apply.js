// pages/apply/apply.js
const app = getApp();
const R = app.router;

function check(string) {
    if (string == undefined || string == '') {
        return false;
    } else {
        return true;
    }
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sexs: ['请选择', '男', '女'],
        edus: ['小学', '初中', '高中', '大学', '硕士', '博士'],
        wsks: ['零基础', '入门级', '高中水平', '大学英语四级', '大学英语六级及以上'],
        tcerts: ['是', '否'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 选择性别
    sexChange(e) {
        var value = e.detail.value;

        this.setData({
            sex_index: value
        })

    },
    // 选择外语水平
    wskChange(e) {
        var value = e.detail.value;

        this.setData({
            wsk_index: value
        })
    },
    // 选择学历
    eduChange(e) {
        var value = e.detail.value;

        this.setData({
            edu_index: value
        })
    },
    // 上传证书或照片
    add(e) {
        var self = this;
        let type = e.currentTarget.dataset.type;

        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                R.QnToken().then(res => {
                    console.log(res, "token========")
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
                                [type]: tempFilePaths[0],
                                [type + 'key']: key
                            })
                            setTimeout(function () {
                                wx.hideLoading()
                            }, 2000)


                            //do something
                        }
                    })
                })
            }
        })
    },
    // 选择教师资格证
    tcertChange(e) {
        var value = e.detail.value;

        this.setData({
            tcert_index: value
        })
    },
    // 语音介绍
    sound(e) {
        console.log(e, "sound")
        this.setData({
            voicekey: e.detail
        })
    },



    // 申请成为教师
    formSubmit(e) {
        // app.ApplyMsg().then(res => {


            let msg = {
                name: '请输入您的姓名',
                phone: '请输入您的电话号码',
                sex: '请选择性别',
                city: "请选择城市",
                wsk: '请选择外语水平',
                email: '请选择邮箱',
                edu: "请选择学历",
                tcert: '请选择是否有教师资格证'
            }
            let value = e.detail.value;
            let acert = this.data.acertkey;
            let picture = this.data.picturekey;
            let voice = this.data.voicekey;

            for (var key in value) {

                if (!check(value[key])) {

                    return wx.showToast({
                        title: msg[key],
                        icon: 'none'
                    })
                }

            }
            if (!check(acert)) {
                return wx.showToast({
                    title: '请上传学位证书AC',
                    icon: 'none'
                })
            }

            if (!check(picture)) {
                return wx.showToast({
                    title: '请上传个人照片',
                    icon: 'none'
                })
            }
            if (!check(voice)) {
                return wx.showToast({
                    title: '请上传语音自我介绍',
                    icon: 'none'
                })
            }
            value['acert'] = acert
            value['picture'] = picture
            value['voice'] = voice
            console.log(value)
            R.Apply(value).then(res => {

                if (res.data.status == null) {
                    wx.setStorageSync('status', res.data.status)
                    wx.redirectTo({
                        url: '/pages/applyok/applyok',
                    })
                }
            })
        // })
    },
})
// pages/spell/spell.js
const app = getApp();
const R = app.router;
import Dialog from '../../dist/dialog/dialog';
import Toast from '../../dist/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        labelcolor: ['fen', 'blue', 'yellow', 'red', 'fen', 'blue', 'yellow', 'red'],
        show_filter: false,
        //筛选条件
        filter: {},
        sort_name: '全部',
        // 开始时间排序
        sorting: 0,
        // 性别筛选
        sex: [{
                value: "男",
                id: true,
                sec: false
            },
            {
                value: "女",
                id: false,
                sec: false
            },
        ],
        // 年龄段
        ages: [{
                value: "0-18岁",
                sec: false
            },
            {
                value: "19-30岁",
                sec: false
            },
            {
                value: "31-40岁",
                sec: false
            },
            {
                value: "41-50岁",
                sec: false
            },
            {
                value: "50岁以上",
                sec: false
            },
        ],
        // 英语水平
        eng_level: [{
                value: "零基础",
                id: 0,
                sec: false
            },
            {
                value: "入门级",
                id: 1,
                sec: false
            },
            {
                value: "高中水平",
                id: 2,
                sec: false
            },
            {
                value: "大学英语四级",
                id: 3,
                sec: false
            },
            {
                value: "大学英语六级及以上",
                id: 4,
                sec: false
            },
        ],

        // 职业
        occ: [{
                value: "工作",
                id: 0,
                sec: false
            },
            {
                value: "学生",
                id: 1,
                sec: false
            },
            {
                value: "无业",
                id: 3,
                sec: false
            },
            {
                value: "个体经营/创业",
                id: 2,
                sec: false
            },


        ],
        // 学历
        edu: [{
                value: "小学",
                id: 0,
                sec: false
            },
            {
                value: "初中",
                id: 1,
                sec: false
            },
            {
                value: "高中",
                id: 2,
                sec: false
            },
            {
                value: "大学",
                id: 3,
                sec: false
            },
            {
                value: "硕士",
                id: 4,
                sec: false
            },
            {
                value: "博士",
                id: 5,
                sec: false
            },
        ],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const self = this;
        if (app.globalData.tablist) {
            self.setData({
                tablist: app.globalData.tablist,
                tab_a: 1
            })
        } else {
            self.addTab() //存tab
        }

        this.getorder() // 拼课列表
        this.Sort() // 课程分类

    },
    // 下拉刷新
    onPullDownRefresh: function() {
        console.log("---下拉刷新---")
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        // 请求列表数据
        this.onLoad()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        wx.showToast({
            title: '刷新成功',
            icon: 'success'
        })
    },
    // 课程分类
    Sort() {
        R.Sort().then(res => {
            this.setData({
                sort: res.data
            })
        })
    },

    // 拼课列表
    getorder(page, filter) {
        if (filter == undefined) {
            var filter = this.data.filter;
        }
        console.log(filter, "拼课列表")
        let pages = page || 0
        filter['page'] = pages
        R.Order(filter).then(res => {
            var spell = res.data;
            if (pages != 0) {
                var list = this.data.list || [];
                for (var i in spell) {
                    list.push(spell[i])
                }
            } else {
                var list = spell
            }



            this.setData({
                list: list,
                page: page
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    // 筛选
    filter(e) {
        let id = e.currentTarget.dataset.id;
        let filter = this.data.filter;
        console.log(id)
        this.setData({
            show_filter: true,
            filter_id: id
        })
        // 开课时间
        let sorting = this.data.sorting;
        // 倒叙
        if (sorting == 1) {
            sorting = 2
        } else {
            sorting = 1
        }
        if (id == 2) {
            filter['sorting'] = sorting
            // 刷新数据
            this.getorder()
            this.setData({
                sorting
            })
        }
    },
    // 关闭筛选
    onClose(e) {
        console.log(e)
        this.setData({
            show_filter: false
        })
        // 重置
        if (e != 1) {
            this.reok()
        }

    },
    // 存tabbar
    addTab(e) {
        const self = this,
            tablist = app.util.TabList(1);
        app.globalData.tablist = tablist;
        self.setData({
            tablist: tablist,
            tab_a: 1
        })


    },

    // 切换tab
    tabChange(event) {
        wx.showLoading({
            title: '加载中...',
        })
        var index = event.detail,
            tablist = this.data.tablist,
            url = tablist[index].url;
        wx.redirectTo({
            url,
        })
        wx.hideLoading()
        app.globalData.tabactive = index;
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        console.log("页面上拉触底事件的处理函数")
        var that = this;
        let page = that.data.page || 1;
        page += 1
        that.getorder(page)
    },
    /**
     * 选择分类
     */
    tapsort(e) {
        console.log(e)
        let index = e.currentTarget.dataset.index;
        let sort = this.data.sort;
        for (let s in sort) {
            if (s != index) {
                sort[s].sec = false
            }

        }
        sort[index].sec = !sort[index].sec;
        let sort_name = sort[index].name;
        let filter = this.data.filter;
        if (!sort[index].sec) {
            sort_name = "全部"
            delete filter["classify"]
            // 刷新数据
            this.getorder()
        } else {

            filter['classify'] = sort[index].id
            this.getorder() //刷新数据
        }
        this.setData({
            sort,
            sort_name: sort_name
        })

    },
    /**
     * 筛选
     */
    // 确定
    ok() {
        this.onClose(1);

        // 刷新数据
        let sex = this.data.sex;
        let ages = this.data.ages;
        let occ = this.data.occ;
        let edu = this.data.edu;
        let eng_level = this.data.eng_level;
        var filters = this.data.filter;
        // 性别
        for (var s in sex) {
            if (sex[s].sec) {
                filters['sex'] = sex[s].id
            }
        }
        // 年龄
        for (var a in ages) {
            if (ages[a].sec) {
                filters['ages'] = ages[a].value
            }
        }
        // 职业
        for (var o in occ) {
            if (occ[o].sec) {
                filters['occ'] = occ[o].id
            }
        }
        // 学历
        for (var e in edu) {
            if (edu[e].sec) {
                filters['edu'] = edu[e].id
            }
        }
        // 英语水平
        for (var l in eng_level) {
            if (eng_level[l].sec) {
                filters['eng_level'] = eng_level[l].id
            }
        }

        this.getorder(0, filters)

    },
    // 重置
    reok() {
        console.log("重置")
        let sex = this.data.sex;
        for (var s in sex) {
            sex[s].sec = false
        }
        let ages = this.data.ages;
        for (var a in ages) {
            ages[a].sec = false
        }
        let occ = this.data.occ;
        for (var o in occ) {
            occ[o].sec = false
        }
        let edu = this.data.edu;
        for (var e in edu) {
            edu[e].sec = false
        }
        let eng_level = this.data.eng_level;
        for (var l in eng_level) {
            eng_level[l].sec = false
        }
        let filter = this.data.filter;
        delete filter['sex']
        delete filter['ages']
        delete filter['occ']
        delete filter['edu']
        delete filter['eng_level']
        this.setData({
            eng_level,
            edu,
            occ,
            ages,
            sex
        })
    },
    // 选择性别
    tapsex(e) {
        let index = e.currentTarget.dataset.index;
        let sex = this.data.sex;
        sex[index].sec = !sex[index].sec;
        this.setData({
            sex
        })

    },
    // 选择年龄段
    tapage(e) {
        let index = e.currentTarget.dataset.index;
        let ages = this.data.ages;
        ages[index].sec = !ages[index].sec;
        this.setData({
            ages
        })
    },
    // 选择职业
    tapocc(e) {
        let index = e.currentTarget.dataset.index;
        let occ = this.data.occ;
        occ[index].sec = !occ[index].sec;
        this.setData({
            occ
        })
    },
    // 选择学历
    tapedu(e) {
        let index = e.currentTarget.dataset.index;
        let edu = this.data.edu;
        edu[index].sec = !edu[index].sec;
        this.setData({
            edu
        })
    },
    // 选择英语水平
    tapeng(e) {
        let index = e.currentTarget.dataset.index;
        let eng_level = this.data.eng_level;
        eng_level[index].sec = !eng_level[index].sec;
        this.setData({
            eng_level
        })
    },
    goteam(e) {
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        if (index == 1) {
            R.check({
                id: id
            }).then(res => {
                if (!res.data) {
                    return Dialog.alert({
                        title: '标题',
                        message: '您未满足该组队条件'
                    }).then(() => {
                        // on close
                    });
                } else {
                    wx.navigateTo({
                        url: `/pages/teamdetail/teamdetail?id=${id}`,
                    })
                }
            })
        } else {
            wx.navigateTo({
                url: `/pages/teamdetail/teamdetail?id=${id}`,
            })
        }

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        this.onUnload()
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        var formIds = this.data.formIds || [];
        console.log(formIds, "监听页面卸载")
        if (formIds.length > 0) {
            var data = {
                formids: formIds
            }
            R.formid(data).then(res => {
                console.log(res)
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
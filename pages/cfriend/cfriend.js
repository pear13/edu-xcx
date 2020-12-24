// pages/cfriend/cfriend.js
const app = getApp();
const R = app.router;
const notify = require('../../utils/notify.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 页数
        pageNum:1,
        // 是否显示详细信息
        show_detail: false,
        // 是否显示综合筛选
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
        console.log("options", options)
        this.setData({
            id: options.id
        })
        this.UserList()
    },
    screen() {
        this.setData({
            show_filter: true
        })
    },
    // 关闭筛选
    onClose(e) {
        console.log(e)
        this.setData({
            show_filter: false
        })
        // 重置
        // if (e != 1) {
        //     this.reok()
        // }

    },
    // 关闭用户详情
    detailClose() {
        this.setData({
            show_detail: false
        })
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
            // this.getorder()
        } else {

            filter['classify'] = sort[index].id
            // this.getorder() //刷新数据
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
        console.log("-----ok----")
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
        console.log(ages)
        for (var a in ages) {
            console.log(ages[a].sec)
            if (ages[a].sec) {
                console.log(ages[a])
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

        this.UserList(0, filters)

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
        for (var s in sex) {
            sex[s].sec = false
        }
        sex[index].sec = !sex[index].sec;
        this.setData({
            sex
        })

    },
    // 选择年龄段
    tapage(e) {
        let index = e.currentTarget.dataset.index;
        let ages = this.data.ages;
        for (var a in ages) {
            ages[a].sec = false
        }
        ages[index].sec = !ages[index].sec;
        this.setData({
            ages
        })
    },
    // 选择职业
    tapocc(e) {
        let index = e.currentTarget.dataset.index;
        let occ = this.data.occ;
        for (var a in occ) {
            occ[a].sec = false
        }
        occ[index].sec = !occ[index].sec;
        this.setData({
            occ
        })
    },
    // 选择学历
    tapedu(e) {
        let index = e.currentTarget.dataset.index;
        let edu = this.data.edu;
        for (var a in edu) {
            edu[a].sec = false
        }
        edu[index].sec = !edu[index].sec;
        this.setData({
            edu
        })
    },
    // 选择英语水平
    tapeng(e) {
        let index = e.currentTarget.dataset.index;
        let eng_level = this.data.eng_level;
        for (var a in eng_level) {
            eng_level[a].sec = false
        }
        eng_level[index].sec = !eng_level[index].sec;
        this.setData({
            eng_level
        })
    },
    // 查看详情信息
    look(e) {
        let index = e.currentTarget.dataset.index;
        let info = this.data.list[index]
        console.log(e)
        this.setData({
            show_detail: true,
            info
        })
    },
    // 发出邀请
    seed(e) {
        app.ShareMsg().then(res=>{

       
        console.log(e)
        let r_id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let list = this.data.list;

        let id = this.data.id;
        let data = {
            id,
            r_id,
        }
        R.seed(data).then(res => {
            console.log(res)
            if (res.code == 0) {
                list[index].send = true
                this.setData({
                    list
                })
            }
        })
    })
    },
    // 请求数据
    UserList(page, filter) {
        if (!filter) {
            var filter = this.data.filter;
        }
        filter['id'] = this.data.id
        console.log(filter, "拼课列表")
        let pages = page || 1
        filter['page'] = pages
        R.user_list(filter).then(res => {
            var users= res.data;
            if(pages>1){
                if(users.length>0){
                    var list=this.data.list;
                    this.setData({
                        list: list.concat(users),
                        pageNum:pages
                    })
                }
            }else{
                this.setData({
                    list: users,
                    sub:res.sub,
                    pageNum:1
                })
            }
        
       
        })
    },
     // 上拉触底加载，翻页
  onReachBottom() {

    var pageNum = this.data.pageNum;
    pageNum += 1

    this.UserList(pageNum)

  },
    // 邀请我的好友
    onShareAppMessage(e) {
        console.log(e)
        let id = this.data.id;
        let uid = wx.getStorageSync('userInfo').id;
        return {
            title: '快来和我一起上节课吧～',
            path: `pages/teamdetail/teamdetail?id=${id}&uid=${uid}`, // 路径，传递参数到指定页面。
            imageUrl: this.data.sub.main, // 分享的封面图
            success: function(res) {
                // 转发成功
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail: function(res) {
                // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        }

    },
      // 下拉刷新
  onPullDownRefresh: function () {
    this.reok()
    notify.success('刷新成功')

    this.UserList()

    wx.stopPullDownRefresh()
  },
})
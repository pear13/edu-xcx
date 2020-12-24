var api = require('../services/api.js');
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function datetimecut(UTCDateString) {
    if (!UTCDateString) {
        return '-';
    }

    function formatFunc(str) {
        return str > 9 ? str : '0' + str
    }
    var date2 = new Date(UTCDateString);
    var year = date2.getFullYear();
    var mon = formatFunc(date2.getMonth() + 1);
    var day = formatFunc(date2.getDate());
    var hour = date2.getHours();

    var min = formatFunc(date2.getMinutes());
    var sec = formatFunc(date2.getSeconds());
    var dateStr = year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    return dateStr;
};

function toUTC(date) {

    // 确保date 最终为Date object
    date = new Date(date);
    // 加入"+08"来标示对应的时区
    var utc = date.toISOString().replace(/Z/, "+00");
    return utc;

}

function timestamp(date) {
    var date = new Date(date); //如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D;
}

// 分销逻辑
function Relation(options) {
    console.log("进入逻辑")
    // 邀请人id
    var uid = options.u_id;
    // 本人id
    var userId = wx.getStorageSync("userInfo").id
    console.log(uid, userId)
    if (uid == null || userId == null)
        return
    var data = {}
    data = {
        userId: userId,
        reference: uid
    } 
    console.log(4566546,api)
    api.Relation(data).then(res=>{
        console.log("绑定成功")
    })
    
}
//加载导航栏
function TabList(gv) {
    var self = this;
    // console.log(gv, gv == 0)
    if (gv == 1) {
        var tablist = [{
            "text": "首页",
            "icon": "http://group.zhengqi1995.com/home.png",
            "iactive": "http://group.zhengqi1995.com/home-a.png",
            "url": "/pages/home/home",
        },
        {
            "text": "拼课",
            "icon": "http://group.zhengqi1995.com/spell.png",
            "iactive": "http://group.zhengqi1995.com/spell-a.png",
            "url": "/pages/spell/spell",
        },
        {
            "text": "学习",
            "icon": "http://group.zhengqi1995.com/study.png",
            "iactive": "http://group.zhengqi1995.com/study-a.png",
            "url": "/pages/study/study",
        },
        {
            "text": "我的",
            "icon": "http://group.zhengqi1995.com/my.png",
            "iactive": "http://group.zhengqi1995.com/my-a.png",
            "url": "/pages/my/my",
        },
        ]
    } else {
        var tablist = [{
            "text": "上课时间",
            "icon": "http://img.aeclub.top/%E4%B8%8A%E8%AF%BE%E6%97%B6%E9%97%B4@2x.png",
            "iactive": "http://img.aeclub.top/%E4%B8%8A%E8%AF%BE%E6%97%B6%E9%97%B4%E9%80%89%E4%B8%AD@2x.png",
            "url": "/pages/tch/tch",
        },
        {
            "text": "我的课程",
            "icon": "http://group.zhengqi1995.com/spell.png",
            "iactive": "http://group.zhengqi1995.com/spell-a.png",
            "url": "/pages/tsub/tsub",
        },
        {
            "text": "我的资料",
            "icon": "http://group.zhengqi1995.com/my.png",
            "iactive": "http://group.zhengqi1995.com/my-a.png",
            "url": "/pages/tmy/tmy",
        }
        ]
    }
    return tablist


}
// 检查是否授权手机号
function Check() {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: 'token',
            success(res) {
                resolve(res); //微信外面包裹了一层 所以这里有两个data"
            },
            fail(err) {
                //    console.log(err)
                wx.navigateTo({
                    url: '/pages/login/login',
                })
            }
        })
    })

}
// 获取屏幕可用高度
function winHeight() {
    const res = wx.getSystemInfoSync();
    return res.windowHeight
}
module.exports = {
    formatTime: formatTime,
    utc: datetimecut,
    toUTC:toUTC,
    timestamp: timestamp,
    Relation: Relation,
    winHeight,
    Check,
    TabList,
}
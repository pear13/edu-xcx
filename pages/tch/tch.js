// pages/tch/tch.js
const app = getApp();
const R = app.router;
//初始化时间
function ruleTime(date,old,list=[]) {
    var Year = date.getFullYear(); //ie火狐下都可以
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    var CurrentDate = "";
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    } else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate += Day;
    } else {
        CurrentDate += "0" + Day;
    }
    var new_Date = new Date();
    var cho=false
    if (new_Date.getDate() ==Day){
        cho=true
    }
    var data = {
        date: CurrentDate,
        day: Day,
        week: old,
        cho: cho
    }
    return data
}

function getDates() {
    var new_Date = new Date()
    var timesStamp = new_Date.getTime();
    var currenDay = new_Date.getDay(); // "获取当前是周几，周日为0"
    var dates = [];
    var result = []
    for (var i = currenDay; i > 0; i--) {
        var WeekFirstDay = new Date(timesStamp - i * 86400000); // 本周第一天。
        var data = ruleTime(WeekFirstDay,false);
        dates.push(data);
        if (dates.length == 7) {
            result.push(dates)
            var dates = []
        }
    }
    for (var n = 0; n < 14 + dates.length; n++) {
        var Day = new Date(timesStamp + n * 86400000); // 本周第一天。
        var data = ruleTime(Day,true);
        dates.push(data);
        if (dates.length==7){
            result.push(dates)
            var dates=[]
        }
    }
    return result
}
// 时间格式化
function dateFormat(fmt, date) {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        week: ['日', '一', '二', '三', '四', '五', '六'],
        time_sec:false,
        indexs:0,
        inss:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.addTab()   // 添加tab栏目
        let height = app.util.winHeight()-200;
        this.setData({
            dates: getDates(),
            height,
        })
        let day = dateFormat("YYYY-mm-dd", new Date());
        this.SubTime(day)  // 上课时间
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    //上课时间
    SubTime(day){
        let dates = this.data.dates;
        let indexs=this.data.indexs;
        let inss=this.data.inss;

        let data={
            day,
        }
        R.SubTime(data).then(res=>{
            var sec=false;
            for(var i in res.data){
                if(res.data[i].sec==true){
                    dates[inss][indexs].cho=true;
                    sec=true
                    break;
                }
            }
            if (!sec){
                dates[inss][indexs].cho = false;
            }


            this.setData({
                times:res.data
            })
        })
    },
    // 选择日期
    day(e) {
   
        let self=this;
        let item = e.currentTarget.dataset.item;
        let ins = e.currentTarget.dataset.ins;
        let index = e.currentTarget.dataset.index;
        let dates = self.data.dates;
        let time_sec = this.data.time_sec;

        if (!item.week) {
            wx.showToast({
                title: '不可以选择之前的日期哦',
                icon: 'none'
            })
        } else {
            dates[ins][index].cho = true
            let day = dates[ins][index].date;
            self.setData({
                dates,
                indexs: index,
                inss: ins
            })
            this.SubTime(day)  // 上课时间
        }
 
    },
    // 选择时间
    sec(e){
        let index = e.currentTarget.dataset.index;
        let times=this.data.times;
      
        if(times[index].tch){
            wx.showToast({
              title: '已设置过的不可更改！',
              icon:"none"
            })
        }else{
            times[index].sec = !times[index].sec
            this.setData({
                times,
                time_sec:true
            })
        }
       
    },
    // 保存
    ok(e){
        let indexs=this.data.indexs;
        let inss=this.data.inss;
        let dates = this.data.dates[inss][indexs];
        if (!dates.week){
            var date = dateFormat("YYYY-mm-dd", new Date());
        }else{
            var date = dates.date
        }
        let times = this.data.times;
        let data=[]
        for(var i in times){
            if (times[i].sec){
                let time={
                    start: times[i].start,
                    end: times[i].end,
                    date: date
                };
                data.push(time)
            }
        }
        R.PostTime(data).then(res=>{
            console.log(res.data)
            wx.showToast({
                title: '保存成功',
                icon:'none'
            })
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },




    // 存tabbar
    addTab(e) {
        const self = this,
            tablist = app.util.TabList(2);
        app.globalData.tablist = tablist;
        self.setData({
            tablist: tablist,
            tab_a: 0
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
})
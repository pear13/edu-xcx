// pages/tchlist/tchlist.js
const app = getApp();
const R = app.router;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show:false,
        // 性别筛选
        sex_range:[
            "男","女"
        ],
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
        ages_range: [
            "0-18岁",
            "19-30岁",
            "31-40岁",
            "41-50岁",
            "50岁以上",
        ],
        ages: [{
            value: "0-18岁",
            first:0,
            end:18,
            sec: false
        },
        {
            value: "19-30岁",
            first: 19,
            end: 30,
            sec: false
        },
        {
            value: "31-40岁",
            first: 31,
            end: 40,
            sec: false
        },
        {
            value: "41-50岁",
            first: 41,
            end: 50,
            sec: false
        },
        {
            value: "50岁以上",
            first: 50,
            end: 100,
            sec: false
        },
        ],
        // 英语水平
        eng_level_range: [
            "零基础",
            "入门级", 
            "高中水平",
            "大学英语四级",
            "大学英语六级及以上",
        ],
        eng_level: [
            { value: "零基础", id: 0, sec: false },
            { value: "入门级", id: 1, sec: false },
            { value: "高中水平", id: 2, sec: false },
            { value: "大学英语四级", id: 3, sec: false },
            { value: "大学英语六级及以上", id: 4, sec: false },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self=this;

        // 目录id
        if(options.list_id){
            self.setData({
                list_id: options.list_id
            })
        }
        this.GetTch()
    },
    // 选择上课时间
    dateChange(e) {
        let date = e.detail.value;
        this.setData({
            date,
        })
    },
    // 选择教师
    tch(e){
        console.log(e)
        let index = e.currentTarget.dataset.index;
        this.setData({
            intch: index
        })
    },
    // 自动匹配
    accord(e){
        let intch = this.data.intch;
        let list_id = this.data.list_id;
        if (intch || intch==0){
            let tchid = this.data.list[intch].id;
            wx.navigateTo({
                url: `/pages/team/team?freetime=${tchid}&list_id=${list_id}&status=0`,
            })
        }else{
            wx.showToast({
                title: '请先选择老师!',
                icon:'none'
            })
        }
    
    },
    // 邀请好友学习
    friend(){
        this.setData({
            show:true
        })
    },
    // 关闭邀请好友
    onClose() {
        this.setData({ show: false });
    },
    /**
     * 公开邀请条件设置
     */
    // 性别条件
    sexChange(e) {
        let sex_a = e.detail.value;
        this.setData({
            sex_a,
        })
    },
    
    // 英语水平条件
    levelChange(e) {
        let level_a = e.detail.value;
        this.setData({
            level_a,
        })
    },
    // 年龄条件
    ageChange(e) {
        let age_a = e.detail.value;
        this.setData({
            age_a,
        })
    },
    // 公开邀请 筛选选择完成
    pickerok(e){
        let list_id = this.data.list_id;
        let intch = this.data.intch;
        let sex_a = this.data.sex_a;
        let level_a = this.data.level_a;
        let age_a = this.data.age_a;
        let data={};
        if(sex_a){
            data['sex'] = this.data.sex[sex_a].id
        }
        if (level_a){
            data['level'] = this.data.eng_level[level_a].id
        }
        if (age_a) {
            data['age_first'] = this.data.ages[age_a].first
            data['age_end'] = this.data.ages[age_a].end
        }
   
        let arr = JSON.stringify(data);
        if (intch || intch == 0) {
            let tchid = this.data.list[intch].id;
            wx.navigateTo({
                url: `/pages/ordering/ordering?freetime=${tchid}&list_id=${list_id}&status=1&arr=${arr}`,
            })
        } else {
            wx.showToast({
                title: '请先选择老师!',
                icon: 'none'
            })
        }
      
    },
    // 特定邀请
    team(){
        let intch = this.data.intch;
        let list_id = this.data.list_id;
        if (intch || intch == 0) {
            let tchid = this.data.list[intch].id;
            wx.navigateTo({
                url: `/pages/ordering/ordering?freetime=${tchid}&list_id=${list_id}&status=2`,
            })
        } else {
            wx.showToast({
                title: '请先选择老师!',
                icon: 'none'
            })
        }
    },
 
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    // 请求老师列表
    GetTch(page){
        
        let date = new Date();
        let data={
            date,
            
        }
        if(page){
            data['page']=page
        }
        R.TchTime(data).then(res=>{
            var tch=res.data;
          
            if(page && page>1){
                console.log(tch.length,"tch.length")
                if(tch.length>0){
                    var list=this.data.list;
                    this.setData({
                        list:list.concat(tch),
                        page:page
                    })
                }
              
            }else{
                this.setData({
                    list:tch
                })
            }
        
        })
    },
    onReachBottom: function() {
        console.log("页面上拉触底事件的处理函数")
        var that = this;
        let page = that.data.page || 1;
        
        that.GetTch(page+1)
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
// components/bot/bot.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
   // 联系客服
   bot(e){
    let platform=wx.getStorageSync('platform')
    if(platform){
        let phone=platform.phone;
        wx.makePhoneCall({
          phoneNumber: phone,
        })
    }  
},
    }
})

const app=getApp()
Component({
    properties: {
        list: Array,
        styleType: {
            type: Number,
            value: 1
        },
        autoplay: Boolean,
        height: {
            type: Number,
            value: 340
        },
        current: Number,
        duration: {
            type: Number,
            value: 500
        },
        withSlot: Object,
        bigPromotionStatus: Boolean,
        promLogo: Object
    },
    data: {
        activeIndex: 0
    },
    methods: {
        handleTap: function(e) {
            var id = e.currentTarget.dataset.id
            this.triggerEvent("goDetail", id);
     
        },
        handleChange: function(t) {
            this.setData({
                activeIndex: t.detail.current
            }), this.triggerEvent("tapslideStat", t.detail.current);
        }
    }
});
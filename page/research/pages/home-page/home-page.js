var util = require('../../../../util/util.js')
var formatLocation = util.formatLocation

Page({
    data: {
        useHomePage: false, //默认不使用本页作为首页
    },
    onLoad: function(e){
        try {
            var value = wx.getStorageSync('use-default');

            this.setData({
                useHomePage:value
            });
            var from = e.from;
            console.log('from:'+from);

            //如果不是从应用内进入的（那就是程序刚启动），或者当前设置为不使用本页作为首页，则跳到tab1
            if (!value && from !=='app') {
                wx.switchTab({
                    url: '/page/component/index',
                    success:function (e) {
                        console.log('跳转成功');
                    },
                    fail:function (e) {
                        console.log(e);
                    }
                })
            }
        } catch (e) {
            console.log(`获取缓存中的是否使用首页标记失败:${e.toString()}`)
        }
    },

    switchChange:function (e) {
        let use = e.detail.value;
        wx.setStorage({
            key:"use-default",
            data:use
        });
        let text = use?"您已选择了使用本页作为首页，点击确认之后，刷新app就会直接进入本页":
            "您选择不使用本页作为首页，点击确认之后，刷新app会进入tab1";
        wx.showModal({
            title: '体验首页变更',
            content: text,
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        })
    },
    clear: function () {
        this.setData({
            hasLocation: false
        })
    }
})

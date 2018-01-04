var util = require('../../../../util/util.js')
var formatLocation = util.formatLocation

Page({
  data: {
    hasLocation: false,
  },
    onShow: function(){
        this.checkSettingStatus(true);
    },

    // 检测授权状态
    checkSettingStatus: function(allowCancel,cb) {
        var that = this;
        // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
        wx.getSetting({
            success: function success(res) {
                console.log(res.authSetting);
                var authSetting = res.authSetting;
                if (util.isEmptyObject(authSetting)) {
                    console.log('首次授权');
                } else {
                    console.log('不是第一次授权', authSetting);
                    // 没有授权的提醒
                    if (authSetting['scope.userLocation'] === false) {
                        wx.showModal({
                            title: '用户未授权',
                            content: '如需正常使用本功能，请按确定并在授权管理中选中“位置信息”，然后点按确定。',
                            showCancel: allowCancel,
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                    wx.openSetting({
                                        success: function success(res) {
                                            console.log('openSetting success', res.authSetting);
                                        }
                                    });
                                }
                            }
                        })
                    }
                }
            }
        });
    },
  getLocation: function () {
    var that = this;


      this.checkSettingStatus(false);

    wx.authorize({
      scope: 'scope.userLocation',
      success() {
        wx.getLocation({
          success: function (res) {
            console.log(res)
            that.setData({
              hasLocation: true,
              location: formatLocation(res.longitude, res.latitude)
            })
          },
          fail: function (msg) {
            console.log(msg);
          }
        })
      }
    })
   
  },
  clear: function () {
    this.setData({
      hasLocation: false
    })
  }
})

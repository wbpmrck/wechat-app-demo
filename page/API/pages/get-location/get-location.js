var util = require('../../../../util/util.js')
var formatLocation = util.formatLocation

Page({
  data: {
    hasLocation: false,
  },
  getLocation: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
        }
      }
    });
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

var util = require('../../../../util/util.js')
var formatLocation = util.formatLocation

Page({
    data: {
        downUrl:"https://www.xunfei.cn/xunfeimall/pc/image/app-kyls.png"
    },
    bindKeyInput:function(event){
        //event.detail = {value, cursor}
        this.setData({
            downUrl:event.detail.value
        })
        return event.detail.value //如果要改变用户输入之后input里的值，可以返回不一样的文本
    },
    downloadToTemp:function () {
        let url = this.data.downUrl;

        wx.downloadFile({
            url: url, //仅为示例，并非真实的资源
            success: function(res) {
                wx.showToast({
                    title: '文件下载成功',
                    icon: 'success',
                    duration: 2000
                });
                if (res.statusCode === 200) {
                    wx.saveFile({
                        tempFilePath: res.tempFilePath,
                        success: function(res) {
                            var savedFilePath = res.savedFilePath;

                            wx.showModal({
                                title:"成功",
                                content: '文件保存到:'+savedFilePath,
                                cancel: false
                            })
                        },
                        fail:function (err) {
                            wx.showModal({
                                title: "失败",
                                content: err.toString(),
                                cancel: false
                            })
                        }
                    })
                }
            }
        })

    },
    download:function (e) {
        // let url = e.detail.value.url;  //这样也可以
        let url = this.data.downUrl;
        wx.downloadFile({
            url: url, //仅为示例，并非真实的资源
            success: function(res) {
                wx.showToast({
                    title: '文件下载成功',
                    icon: 'success',
                    duration: 2000
                });
                if (res.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success:function (e) {
                            wx.showModal({
                                title:"写入相册成功",
                                content: '写入相册成功',
                                cancel: false
                            })
                        },
                        fail:function (err) {
                            wx.showModal({
                                title: "失败",
                                content: err,
                                cancel: false
                            })
                        }
                    })
                }
            }
        })

    }
})

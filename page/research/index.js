Page({
  data: {
    list: [
        {
            id: 'auth',
            name: '授权相关',
            open: false,
            pages: [
                {
                    zh: '需要授权的功能设计最佳实践',
                    url: 'authenticate/authenticate'
                }
            ]
        },
        {
            id: 'navigate',
            name: '导航/tab相关',
            open: false,
            pages: [
                {
                    zh: '如何设置应用首页',
                    url: 'home-page/home-page'
                }
            ]
        },
        {
            id: 'file',
            name: '文件处理,上传下载相关',
            open: false,
            pages: [
                {
                    zh: '如何下载图片到用户手机',
                    url: 'image-download/image-download'
                }
            ]
        },
        {
            id: 'audio',
            name: '音频相关相关',
            open: false,
            pages: [
                {
                    zh: '直接录音为mp3',
                    url: 'audio-record-play/audio-record-play'
                }
            ]
        }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
          var u = 'pages/' + list[i].url+'?from=app';
        if(list[i].url){
            console.log("go:"+u);
          wx.navigateTo({
            url: u
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})

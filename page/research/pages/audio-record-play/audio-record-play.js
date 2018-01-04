var util = require('../../../../util/util.js')
var playTimeInterval
var recordTimeInterval

Page({
    data: {
        recording:false,
        playing:false,
        tempFilePath:"",
    },

    /**
     * 停止录音
     */
    stopRecord:function () {
        this.recorderManager.stop();
    },
    save:function () {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.tempFilePath,
            success:function (e) {
                wx.showModal({
                    title:"写入相册成功",
                    content: '写入相册成功',
                    cancel: false
                })
            },
            fail:function (err) {
                console.log(err);
                wx.showModal({
                    title: "失败",
                    content: err.stack,
                    cancel: false
                })
            }
        })
    },
    play:function () {
        var self = this;
        self.setData({
            playing:true
        });

        const innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = this.data.tempFilePath;
        innerAudioContext.onPlay(() => {
            console.log('开始播放')
        })
        innerAudioContext.onError((res) => {
            console.log(res.errMsg)
            console.log(res.errCode)
        });
        innerAudioContext.onStop(function () {
            console.log('播放停止')
            self.setData({
                playing:false
            });
        })
        innerAudioContext.onEnded(function () {
            console.log('播放自然停止')
            self.setData({
                playing:false
            });
        })
        //
        // wx.playVoice({
        //     filePath: this.data.tempFilePath,
        //     complete: function(){
        //         self.setData({
        //             playing:false
        //         });
        //         wx.showToast({
        //             title:'播放结束'
        //         })
        //     }
        // })
    },
    /**
     * 开始录音
     */
    startRecord:function () {
        var self = this;
        self.setData({
            recording:true
        });

        var recorderManager = self.recorderManager = wx.getRecorderManager();

        recorderManager.onStart(() => {
            console.log('recorder start')
        })
        recorderManager.onResume(() => {
            console.log('recorder resume')
        })
        recorderManager.onPause(() => {
            console.log('recorder pause')
        })
        recorderManager.onStop((res) => {
            console.log('recorder stop', res)
            const { tempFilePath } = res;
            self.setData({
               tempFilePath:tempFilePath,
                recording:false
            });
        })
        recorderManager.onFrameRecorded((res) => {
            const { frameBuffer } = res
            console.log('frameBuffer.byteLength', frameBuffer.byteLength)
        })

        const options = {
            duration: 10000,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'mp3',
            frameSize: 50
        }

        recorderManager.start(options)

    },
    onHide: function() {

    },
    clear: function () {

    }
})

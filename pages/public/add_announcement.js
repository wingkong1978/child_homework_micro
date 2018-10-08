// pages/public/add_announcement.js
const Q = require("../../q.js");
const util= require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    classno:0,
    userinfo:{},
    imagefiles:[],
    recordPath:"",
    classname:"",
    schoolname:"西关培正小学",
    gradeno:"",
    gradeclass:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    
    console.log("add_announce_onload-->",options);
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userinfo:res.userInfo,
          classno: options.classno,
          classname:options.classname,
          gradeno:options.gradeno,
        });
        that.setData({
          gradeclass:that.data.gradeno + "年("+that.data.classno + ")班",
        })
      }
    })
    
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imagefiles: that.data.imagefiles.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imagefiles // 需要预览的图片http链接列表
    })
  },
  announcementSubmit:function(e){

    let title = e.detail.value.title;
    let details = e.detail.value.details;
    console.log(e.detail);
    console.log(this.data.userinfo);
    let that = this;
    let parm = {
      classid : this.data.classno,
      anncTitle: title,
      anncDetails: details,
      anncCreateUser:this.data.userinfo.nickName
    }
    console.log(parm);
    console.log(this.data.imagefiles);
    if (this.data.imagefiles.length > 9) {
      wx.showToast({
        title: '最多上传9张照片',
        icon: "loading",
        duration: 3000
      })
    } else {
      var _this = this;
      let promiseA = [];
      for(let i=0,len=this.data.imagefiles.length;i<len;i++){
        promiseA.push(this.uploadProcess_q(this.data.imagefiles[i]));
      }
      Q.all(promiseA)
        .then((rst)=>{
          console.log("upload files result-->",rst);
           parm.imagefiles = rst;
          wx.request({
            url: 'http://dev.wingkong.club:3000/announcements',
            method: "POST",
            data: parm,
            success: function (rst) {
              console.log("add announcement", rst);
              wx.redirectTo({
                url: '../teacher/main?role=teacher&classno=' + that.data.classno + "&classname=" + that.data.classname,
              })

            }
          })
       

        })

    

    }
    
  },
  uploadProcess_q:function(filepath){
    let dfr = Q.defer();
    const uploadTask = wx.uploadFile({
      url: 'http://dev.wingkong.club:3000/fileupload',
      filePath: filepath,
      name: 'file',
      header: {},
      formData: {},
      success: function (res) {

        var data = util.s2o(res.data);
        console.log(data);
        dfr.resolve(data.imgPath);
      },
      fail: function (res) { },
      complete: function (res) { },
    });
    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    });
    return dfr.promise;
  },

  startRecode: function () {
    var s = this;
    console.log("start");
    wx.startRecord({
      success: function (res) {
        console.log(res);
        var tempFilePath = res.tempFilePath;
        s.setData({ recodePath: tempFilePath, isRecode: true });
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
        //录音失败
      }
    });
  },
  endRecode: function () {//结束录音 
    var s = this;
    console.log("end");
    wx.stopRecord();
    s.setData({ isRecode: false });


    // wx.showToast();
    // setTimeout(function () {
    //   var urls = app.globalData.urls + "/Web/UpVoice";
    //   console.log(s.data.recodePath);
    //   wx.uploadFile({
    //     url: urls,
    //     filePath: s.data.recodePath,
    //     name: 'file',
    //     header: {
    //       'content-type': 'multipart/form-data'
    //     },
    //     success: function (res) {
    //       var str = res.data;
    //       var data = JSON.parse(str);
    //       if (data.states == 1) {
    //         var cEditData = s.data.editData;
    //         cEditData.recodeIdentity = data.identitys;
    //         s.setData({ editData: cEditData });
    //       }
    //       else {
    //         wx.showModal({
    //           title: '提示',
    //           content: data.message,
    //           showCancel: false,
    //           success: function (res) {

    //           }
    //         });
    //       }
    //       wx.hideToast();
    //     },
    //     fail: function (res) {
    //       console.log(res);
    //       wx.showModal({
    //         title: '提示',
    //         content: "网络请求失败，请确保网络是否正常",
    //         showCancel: false,
    //         success: function (res) {

    //         }
    //       });
    //       wx.hideToast();
    //     }
    //   });
    // }, 1000)

  },
  playon:function(){
    wx.playVoice({
      filePath: this.data.recodePath,
      success: function () {
        wx.showToast({
          title: '播放结束',
          icon: 'success',
          duration: 1000
        })
      }
    })  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
// pages/public/announcement_detail.js
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anncId:0,
    imagefiles:[],
    read:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '读取中...',
    });
    let that = this;
    this.setData({
      anncId:options.annc_id,
      read:options.unread
    });
    wx.request({
      url: app.globalData.remoteUrl+'announcements/'+this.data.anncId,
      success:function(rst){
       
        let rstObj = util.s2o(rst);
        console.log("get announcement", rst);
        let tmpImgfiles= [];
        for(let i=0,len=rst.data.imgFiles.length;i<len;i++){
          tmpImgfiles.push(app.globalData.remoteUrl+"_files/"+rst.data.imgFiles[i]);
        }
        that.setData({
          imagefiles:tmpImgfiles
        });
        wx.hideLoading();
      }
    })
  },
  confirmRead(){
    var unread=this.data.read;
    unread--;
    wx.redirectTo({
      url: '../parent/index?unread='+unread,
    })

    wx.request({
      url: app.globalData.remoteUrl+'announcements/'+this.data.anncId,
      method:"POST",
      data:{
        action:"conirmread",
        userid:app.globalData.userId
      },
      success:function(rst){
        console.log("confirm read successfully.",rst);
      },
      fail:function(err){
        console.log("confirm read error",err);
      }
    })
  },



  previewImage: function (e) {
    console.log("preview",e);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imagefiles // 需要预览的图片http链接列表
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
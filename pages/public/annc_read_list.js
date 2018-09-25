// pages/public/annc_read_list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    annc_id:0,
    readlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("global data",app.globalData);
    wx.showLoading({
      title: '数据读取中...',
    });
    wx.request({
      url: 'http://dev.wingkong.club:3000/announcements/read/'+options.annc_id,
      success:function(res){
        console.log("read list -->",res);
        
        that.setData({
          annc_id: options.annc_id,
          readlist:res.data.rows
        });
        wx.hideLoading();
      },
      fail:function(err){
        console.log("announcement read list err",err);
        wx.hideLoading();
      }
    })

  },
  returntolist:function(){
    wx.navigateBack({
      
    });
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
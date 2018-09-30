// pages/parent/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      "公告", "作业", "打卡"
    ],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    homeworks:[
      {
        id:1,
        title:"作业1",
        create_time:"2018-07-22 12:00"
      },
       {
        id: 2,
        title: "作业2",
        create_time: "2018-07-22 12:00"
      }
    ],
    announcements:[],
    tabbar: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    let that = this;
    wx.request({
      url: 'http://dev.wingkong.club:3000/announcements/classes/' + options.classno,
      success: function (rst) {
        console.log("announcements-->", rst);
        let announcements = [];
        if (rst.data.STS === "OK") {
          announcements = rst.data.rows
        }

        that.setData({
          classno: options.classno,
          announcements: announcements
        });
        console.log(that.data.announcements);
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
  
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})
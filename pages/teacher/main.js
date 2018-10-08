// pages/teacher/main.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      //  "公告","作业","打卡"
      "公告"
    ],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    tabbar: {},
    classno:0,
    classname:"",
    gradeno:"",
    announcements:[
      {
        id:1,
        title: "公告1",
        create_time:"2018-07-22 01:00"
      },
      {
        id: 1,
        title: "公告2",
        create_time: "2018-07-22 01:00"
      }
    ],
  },
  anncreadlist:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../public/annc_read_list?annc_id='+e.target.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    app.editTabBar(); 
    wx.getSystemInfo({
      success: function (res) {
        wx.request({
          url: 'http://dev.wingkong.club:3000/announcements/classes/'+options.classno,
          success:function(rst){
            console.log("announcements-->",rst);
            let announcements = [];
            if(rst.data.STS==="OK"){
               announcements = rst.data.rows
            }
            
            that.setData({
              sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
              sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
              classno: options.classno,
              gradeno:options.gradeno,
              announcements:announcements
            });
            console.log(that.data.announcements);
          }
        })
        
      }
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
  ,
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  newHomework:function(){
    wx.navigateTo({
      url: '../public/add_homework',
    })
  },

  addAnnc:function(){
    wx.navigateTo({
      url: '../public/add_announcement?classno='+this.data.classno+"&classname="+this.data.classname+"&gradeno="+this.data.gradeno,
    })
  }
})
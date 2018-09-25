// pages/public/create_class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classarray: ['1', '2', '3', '4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
    classindex: 0, 
    gradearray: ['一', '二', '三', '四', '五', '六'],
    gradeindex: 0,
    schoolid:0,
  },

  classSubmit:function(e){
    console.log(e.detail);
    
    let grade = this.data.gradearray[e.detail.value.grade];
    let classno = this.data.classarray[e.detail.value.class];
    let gradeClass = grade + "年(" + classno + ")班";

  
    let that = this;
    wx.request({
      url: 'http://dev.wingkong.club:3000/classes',
      method:"POST",
      data:{
        classname: gradeClass,
        schoolid:that.data.schoolid
      },
      success:function(rst){
        console.log(rst);
        wx.navigateTo({
          url: 'class_list?role=teacher&schoolid='+that.data.schoolid,
        })
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let schoolid = options.schoolid;
    console.log("schoolid==>",schoolid);
  
    this.setData({
      schoolid:schoolid
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
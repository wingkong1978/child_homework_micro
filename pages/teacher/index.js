// pages/teacher/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname:"",
    gradeno:"二",
    classno:"4",
    pwd:"11111"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let gradeno = "";
    let classno = "";
    if(options.gradeno){
      gradeno = options.gradeno;
    }
    if(options.classno){
      classno = options.classno;
    }
    if(gradeno && classno){
      
    this.setData({
      classname:options.classname,
      gradeno:gradeno,
      classno:classno,
    })
    }
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
  bindKeyInput:function(e){
    this.setData( {
      pwd:e.detail.value
    })
  },

  formSubmit:function(e){
    console.log("submit class passord",e)
    let pwd = e.detail.value.password;
    console.log("pwd--->",this.data.pwd);
  
    console.log(pwd);
    if(pwd==""||pwd==null){
      wx.showModal({
        title: '暗号',
        content: '请输入班级暗号，如果不清楚请咨询班主任。',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            return;
          } 
        }
      })
    }else{
      wx.redirectTo({
        url: '../teacher/main?role=teacher&classno=' + this.data.classno + "&classname=" + this.data.classname+"&gradeno="+this.data.gradeno,
      });
    }
   
  }
})
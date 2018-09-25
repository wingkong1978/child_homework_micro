// pages/public/class_list.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:"西关培正小学",
    items: [
      { name: '24', value: '二年（4）班' },

    ],
    role: "",
    schoolid:0,
    userId:0,
    schoolname:"",
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var items = this.data.items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].id == e.detail.value;
    }
    this.setData({
      items: items
    });
    console.log("this.data", this.data.items);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let schoolid = options.schoolid;
    let schoolname = options.schoolname;
    let that = this;
    wx.request({
      url: 'http://dev.wingkong.club:3000/schools/'+schoolid,
      success:function(rst){
        let classes = rst.data.rows;
        console.log(classes);
        let class_list = [];
        for (let i = 0, len = classes.length; i < len; i++) {
          let classdetail = {
            id: classes[i].id,
            value: classes[i].cla_name,
            checked:i==0,
          }

          class_list.push(classdetail);
        }
        that.setData({
          role: options.role,
          items: class_list,
          schoolid:schoolid,
          userId: options.userId,
          schoolname:schoolname
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
  onUnload: function (parm) {

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

  classsubmit:function(e){
    console.log(this.data.role)
    let classno = e.detail.value.classno;
    let classname = "";
    for(let i =0,len=this.data.items.length;i<len;i++){
      if(this.data.items[i].id==classno){
        classname = this.data.items[i].value
      }
    }
    let that =this;
    console.log(classname);
    if(this.data.role=="teacher"){
      //如果是老师要输入班级暗号；TODO
      //判断是否已经设置昵称（什么老师？）
      console.log(1);
      wx.navigateTo({
        url: '../teacher/index?classno='+classno+"&classname="+classname,
      })
    }else{

      //判断是否已经设置小盆友姓名？
      // 爸爸？妈妈？祖辈？
      console.log(2);

      wx.request({
        url: 'http://dev.wingkong.club:3000/classes/'+classno +"/"+this.data.userId,
        success:function(res){
          console.log("check relationship?",res);
          if(res.data.relationshipname!=null){
            wx.redirectTo({
              url: '../parent/index?classno='+classno+"&relationshipname="+res.data.relationshipname+"&userId="+that.data.userId,
            })
          }else{
            wx.redirectTo({
            url: '../parent/set_relationship?classno=' + classno+"&userId="+that.data.userId,
          })
          }
   
        }
      })

    }

  },
  newClass:function(){
    console.log("this.schoolid",this.data.schoolid);
    wx.navigateTo({
      url: '../public/create_class?schoolid='+this.data.schoolid,
    })
  }
})
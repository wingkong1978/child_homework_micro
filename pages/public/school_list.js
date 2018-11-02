var base64 = require("../images/base64");
var app = getApp();
Page({
  data:{
    items: [],
    role:"",
    userId:0,
    tabbar: {}
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var items = this.data.items;
    for (var i = 0, len = items.length; i<len; ++i) {
      items[i].checked = items[i].id == e.detail.value;
    }
    this.setData({
      items: items
    });
    console.log("this.data",this.data.items);
  },
  onLoad: function (parm) {
    app.editTabBar(); 
    console.log("onload-->",parm);
    let that = this;
    wx.request({
      url: app.globalData.remoteUrl+'schools',
      success:function(rst){
        console.log(rst);
        let schools = rst.data.rows;
        console.log(schools);
        let school_list = [];
        for(let i=0,len=schools.length;i<len;i++){
          
          let school = {
            id:schools[i].id,
            value:schools[i].sch_name,
            checked:i==0
          }

          school_list.push(school);
        }
        that.setData({
          role:parm.role,
          items:school_list,
          userId:parm.userId

        })
      }
    });
    
  },
  schoolsubmit:function(e){

    console.log("schoolsubmit",e.detail);
  

    let schoolid = e.detail.value.school;

    console.log("schoolid--->",schoolid);
    let schoolname = "";
    for(let i=0,len=this.data.items.length;i<len;i++){
      if(this.data.items[i].id==schoolid){
        schoolname = this.data.items[i].value;
      }
    }
    if(schoolid ==null){
      schoolid =1;
    }
    console.log("schoolname-->",schoolname);
    wx.navigateTo({
      url: './class_list?role='+this.data.role + "&schoolid="+schoolid + "&userId="+this.data.userId+"&schoolname="+schoolname,
    })
  }
});
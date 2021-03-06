var app = getApp();
// pages/parent/set_relationship.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    children: ['请选择小盆友', '小a', '小b'],
    childnamelist:[],
    childrenindex: 0,
    childnames: [],
    childidlist:[],
    
    radioItems: [{
        name: '耙耙',
        value: '0',
        checked: true
      },
      {
        name: '妈妈',
        value: '1'
      },
      {
        name: '祖辈',
        value: '2'
      }

    ],
    classno: 0,
    userId: 0
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

    // if (e.detail.value == 0) {
    //   return;
    // }
    let tmpChildNm = this.data.childnames;
    let childname = this.data.children[e.detail.value].name;
    tmpChildNm.push(childname);
    console.log("childnames", this.data.childnames);

    this.data.childidlist.push(this.data.children[e.detail.value].id);
    console.log(this.data.childidlist);
    this.setData({
      childrenindex: e.detail.value,
      childnames: tmpChildNm,
    })

  },
  resetChildren: function(e) {
    this.setData({
      childnames: []
    });
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },

  //取消的时候打开首页
  cancel: function() {
    wx.redirectTo({
      url: '../index/index',
    })
  },


  formSubmit: function(e) {
    console.log(e.detail);
    let childname = this.data.childnames;
    let childnames = e.detail.value.childnames;
    let relationshipname = this.data.radioItems[e.detail.value.relationship].name;
    let that = this;
    console.log(childnames, relationshipname);
    wx.request({
      url: app.globalData.remoteUrl+'classes/' + this.data.classno + "/relationship",
      method: "POST",
      data: {
        userid: this.data.userId,
        childidlist:this.data.childidlist,
        relationshipname: relationshipname
      },
      success: function(res) {
        console.log("add relationship result", res);

        //添加信息框防止小盆友名字为空
        console.log("length:" + childname.length);
        if (childname.length == 0) {
          wx.showModal({
            title: '小盆友名字',
            content: '请选择小盆友名字，如果不清楚请咨询班主任。',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                return;
              }
            }
          })
        } else {
          wx.redirectTo({
            url: '../parent/index?classno=' + that.data.classno + "&relationshipname=" + relationshipname + "&userId=" + that.data.userId,
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let that = this;
    wx.request({
      url: app.globalData.remoteUrl + "classes/" + options.classno +"/"+options.userId,

      method:"GET",
      success:(rtn)=>{

let rst = rtn.data;
console.log("result-->",rst);
        if(rst.STS==="OK"){
          console.log("data--->", rst.data)
          let len = rst.data.length;
          let relationshipname = rst.data.relationshipname;
          console.log("length--->",len)
          if(len>0){
            wx.redirectTo({
              url: '../parent/index?classno=' + options.classno + "&relationshipname=" + relationshipname + "&userId=" + options.userId,
            })
          }else{
            wx.request({
              url: app.globalData.remoteUrl + "students/" + options.classno,
              method: 'GET',
              success: (rst) => {
                console.log("get students---->", rst);
                if (rst.data.STS === "OK") {
                  let data = rst.data.data;
                  let stus = [];
                  let childnames = [];
                  for (let k in data) {
                    let stu = {};
                    stu.id = data[k].id;
                    stu.name = data[k].stu_name;
                    stus.push(stu);
                    childnames.push(stu.name);
                  }

                  that.setData({
                    children: stus,
                    classno: options.classno,
                    userId: options.userId
                    , childlistnames: childnames
                  })
                }
              },
              fail: (err) => {
                console.log(err);
              }
            })
          }
        }else{
          alert("error");
        }
      },
      fail:(err)=>{

        alert("error"+err.toString());
      }
    })
  
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    motto: '派作业',
    userInfo: {},
    hasUserInfo: false,
    showFlag: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userId: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindTeacher: function() {
    /*wx.redirectTo({
      url: '/pages/public/school_list?role=teacher&userId=' + this.data.userId,
    })*/
    //暂时先code 死是培正 4班
    this.classsubmit("teacher")
  },
  bindParent: function() {
    /*wx.redirectTo({
      url: '/pages/public/school_list?role=parent&userId=' + this.data.userId,
    })*/
    this.classsubmit("parent");
  },
  onLoad: function() {
    /*
  console.log(app.globalData.userInfo);
  console.log(this.data.canIUse);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
     
    } else if (this.data.canIUse){
      console.log(this.data.canIUse);
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
       
      }
    } else {
      console.log("get");
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          
        }
      })
    }*/
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    this.getOpenId();
  },
  getUserInfo: function(e) {
    console.log("aaaa", e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  test() {
    this.testRemote();
  },
  testRemote() {
    var _this = this;
    wx.request({
      url: 'http://dev.wingkong.club:3000/',
      method: "GET",
      success: function(res) {
        console.log(res);
        _this.setData({
          motto: res.data.toString()
        });
      }
    })
  },
  testsaveuser() {
    var that = this;
    console.log("aaaaadddd", this.data.userInfo);
    wx.login({
      success: (result) => {
        if (result.code) {
          wx.request({
            url: "http://dev.wingkong.club:3000/users",
            data: that.data.userInfo,
            method: "POST",
            success: (res) => {
              console.log("1111", res);
            }
          })
        }
      }
    })
  },
  getOpenId() {
    let that = this;
    var openId = (wx.getStorageSync('openId'))
    console.log("openid-->", openId);
    openId = null;
    if (openId) {
      wx.getUserInfo({
        success: function(res) {
          console.log("2222", res);
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: function() {
          // fail
          console.log("获取失败！")
        },
        complete: function() {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    } else {
      wx.login({
        success: function(res) {

          console.log("dddddd", res.code)
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function(res_user) {
                console.log("res_user-->", res_user)
                wx.request({
                  //后台接口地址
                  url: 'http://dev.wingkong.club:3000/openid',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function(res) {
                    // this.globalData.userInfo = JSON.parse(res.data);
                    console.log("openid return", res);
                    app.globalData.userId = res.data.id;
                    that.setData({
                      userInfo: res_user.userInfo,
                      hasUserInfo: true,
                      userId: res.data.id
                    })
                    console.log("userinfo-->", that.data.userInfo);
                    wx.setStorageSync('openId', res.data.openId);
                    wx.hideLoading();
                  }
                })
              },
              fail: function() {
                console.log("failed");
                wx.hideLoading();
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function(res) {
                    if (res.confirm) {
                      console.log("res.confirm", res.confirm);
                      wx.navigateTo({

                        url: './auth',
                      })
                      /*
                wx.openSetting({
                  success: (res) => {
                    console.log("res-->", res);
                    if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
                      wx.login({
                        success: function(res_login) {
                          console.log(res_login);
                          if (res_login.code) {
                            wx.getUserInfo({
                              withCredentials: true,
                              success: function(res_user) {
                                wx.request({
                                  url: 'http://dev.wingkong.club:3000/openid',
                                  data: {
                                    code: res_login.code,
                                    encryptedData: res_user.encryptedData,
                                    iv: res_user.iv
                                  },
                                  method: 'GET',
                                  header: {
                                    'content-type': 'application/json'
                                  },
                                  success: function(res) {
                                    that.setData({
                                      nickName: res.data.nickName,
                                      avatarUrl: res.data.avatarUrl,

                                    })
                                    wx.setStorageSync('openId', res.data.openId);
                                  }
                                })
                              }
                            })
                          }
                        }
                      });
                    }
                  },
                  fail: function(res) {
                    console.log("faile-->", res);

                  }
                })
*/
                    }
                  }
                })
              },
              complete: function(res) {


              }
            })
          }
        }
      })

    }


  },

  handler: (e) => {
      console.log(e);
      if (e.detail.authSetting["scope.userLocation"]) { //如果打开了地理位置，就会为true
        this.setData({
          showFlag: true
        })
      }
    }

    ,
  classsubmit: function(userrole) {
    //console.log(this.data.role)
    let classno = 4;
    let classname = "二年（4）班";
    let gradeno = "二"
    let that = this;
    console.log(classname);
    if (userrole == "teacher") {
      //如果是老师要输入班级暗号；TODO
      //判断是否已经设置昵称（什么老师？）
      console.log(1);
      wx.navigateTo({
        url: '../teacher/index?classno=' + classno + "&classname=" + classname+"&gradeno="+gradeno,
      })
    } else {

      //判断是否已经设置小盆友姓名？
      // 爸爸？妈妈？祖辈？
      console.log(2);

      wx.request({
        url: 'http://dev.wingkong.club:3000/classes/' + classno + "/" + this.data.userId,
        success: function(res) {
          console.log("check relationship?", res);
          if (res.data.relationshipname != null && false) {
            wx.redirectTo({
              url: '../parent/index?classno=' + classno + "&relationshipname=" + res.data.relationshipname + "&userId=" + that.data.userId,
            })
          } else {
            wx.redirectTo({
              url: '../parent/set_relationship?classno=' + classno + "&userId=" + that.data.userId,
            })
          }

        }
      })

    }

  },

})
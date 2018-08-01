var MVC = {};

var EventUtil = {
  getEvent: function(event) {
    return event ? event : window.event; 
  },

  addHandler: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },

  removeHandler: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  getTarget: function(event) {
    return event.target || window.srcElement;
  }
};

function getLocalStroage() {
  if (typeof localStorage == 'object') {
    return localStorage;
  } else if (typeof globalStorage == 'object') {
    return globalStorage[location.host];
  } else {
    throw new Error('Local storage not available.');
  }
};

MVC.model = function () {

  var storage = getLocalStroage(); 
  var name,
      password; 

       /**
     * 操作数据
     **/
  return {
   
    getName () {      
      name = userName.value;
      var x = storage.getItem(name);
      return storage.getItem(name);
    },

    setName : {
      setLoginName: function () {
        name = userName.value;       
        storage.setItem("user", name);
      },
 
      setUserName: function() {
        name = userName.value;
        password = userPassword.value;         
        storage.setItem(name, password);
      }
    },

           /**
     * 保存用户名进json
     **/
    saveUserName: function(data) {
      name = userName.value;
      
      $.ajax({
          type:"post",
          url: "http://localhost:3000/users",
          async: false,
          dataType: "json",
          data:{          
              id: name        
          }
      });
    }
  }
} ();

MVC.view = function() { // view层主导视图的创建

  var M = MVC.model; // 对model层的引用，数据是视图的骨架

  return {
    initLogin () {   // 界面初始化
      var loginTitle = `<img src="../Image/user.png" id="user">
                        <h1>My Todo</h1>`;

      var loginInputName = `<div id="loginName">
                              <img src="../Image/username.png">
                              <input type="text" id="userName" placeholder="请输入用户名">
                            </div>`;
        
      var loginInputPassword = `<div id="password">
                                  <img src="../Image/key.png">
                                  <input type="text" id="userPassword" placeholder="请输入密码">
                                </div>`;
      
      var loginInputButton = `<div id="button">
                                <button id="signIn">登录</button>
                                <button id="signUp">注册</button>
                              </div>`;
      
      var loginHaveATry = `<a href="../HTML/myTodo.html" id="passer">试一下再说</a>`;

      var body = document.getElementsByTagName('body');

      body[0].innerHTML = '<div id="login">'+
                    loginTitle + 
                    loginInputName + 
                    loginInputPassword +
                    loginInputButton +
                    loginHaveATry
                  '</div>';
    },

    loginSuccess: function () {   // 显示已完成
      alert("登录成功！正在跳转...");      
    },  

    loginFailure: function () {
      alert("用户名或密码输入错误，请重新输入。");
    },

    regSuccess: function () {
      alert("用户注册成功！正在登录...");
    },

    regFailure: function () {
      alert("该用户已注册。");
    } 
   
  }
}()

MVC.controller = function () {
    
  var V = MVC.view;
  var M = MVC.model;

  var C = {
    start: function () {
      V.initLogin();  // 初始化视图
      this.__listen();
    },    

    __listen: function () {      
      var buttons = document.getElementById('button');
      var userName = document.getElementById('userName');
      var userPassword = document.getElementById('userPassword');

      EventUtil.addHandler(buttons, 'click', function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var name = userName.value;
        var password = userPassword.value;
        var storage = getLocalStroage();
        
        if (name) {
          switch(target.id) {
          case 'signIn':

            if (M.getName() == password) {

              M.setName.setLoginName(); //记录登录用户名
              V.loginSuccess();  //登录成功
              window.location.href='./myTodo.html'; //跳转页面

            } else {

              V.loginFailure();  //登录失败

            }

            break;
          case 'signUp':
            if (M.getName() != null) {

              // storage.clear();
              V.regFailure();  //注册失败

            } else {

              M.setName.setUserName();  //记录注册用户名
              M.setName.setLoginName(); //记录登录用户名

              M.saveUserName(); //保存用户名
              V.regSuccess();  //注册成功
              window.location.href='./myTodo.html'; //跳转页面
            }
            break;
         }
        }
        
      });
    }  
  }  

  return C;
}()

var C = MVC.controller;
C.start();



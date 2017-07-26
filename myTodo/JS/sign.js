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
}

EventUtil.addHandler(window, 'load', function() {
  var buttons = document.getElementById('button');
  var userName = document.getElementById('userName');
  var userPassword = document.getElementById('userPassword');

  EventUtil.addHandler(buttons, 'click', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var storage = getLocalStroage();
    var name = userName.value;
    var password = userPassword.value;
    
    if (name) {
      switch(target.id) {
      case 'signIn':

        if (storage.getItem(name) == password) {
          storage.setItem("user", name);
          alert("登录成功！正在跳转...");
          window.location.href='./myTodo.html';

        } else {
          alert("用户名或密码输入错误，请重新输入。");
        }

        break;
      case 'signUp':
        if (storage.getItem(name) != null) {
          alert("该用户已注册。");
        } else {
          storage.setItem(name, password);
          storage.setItem("user", name);

          //保存用户名
          $.ajax({
            type:"post",
            url: "http://localhost:3000/users",
            async: false,
            dataType: "json",
            data:{ 
              
              id: name        
            }
          });

          alert("用户注册成功！正在登录...");
          window.location.href='./myTodo.html';
        }

        break;
     }
    }
    
  });


});
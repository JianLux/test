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

MVC.model = function () {

  return {
    //存在用户名就读取信息
    initData(name) {
      var data,
      _self = this;
      $.ajax({
        type:"get",
        url: "http://localhost:3000/users/" + name,
        async: false,
        dataType: "json",
        success: function(data) {
          _self.data = data;
        }
      });
      return _self.data;
    },

    //如果存在名字保存数据
    saveThings() {
      var showThings = document.getElementById('show-things');
      var name = this.getUser();
      if (name) {
        $.ajax({
          type:"put",
          url: "http://localhost:3000/users/" + name,
          async: true,
          dataType: "json",
          data:{
                "things": showThings.innerHTML
               }
        });
      }
    },

    //删除事件
    deleteChild(parent, child) {
      parent.removeChild(child);
      if(this.getUser()) { // 有登录
        this.saveThings();  //保存信息到json
      }
    },

    addChild(parent, child) {
      parent.appendChild(child);
      if(this.getUser()) { // 有登录
      	var M = MVC.model;
      	setTimeout(function() {
      		M.saveThings()}, 500)//完全出现后保存信息到json       
      	}
    },

    getUser() {
      var storage = this.getLocalStroage();
      return storage.getItem('user');
    },

    getLocalStroage() {
      if (typeof localStorage == 'object') {
        return localStorage;
      } else if (typeof globalStorage == 'object') {
        return globalStorage[location.host];
      } else {
        throw new Error('Local storage not available.');
      }
    }
  }

}();

MVC.view = function() { // view层主导视图的创建

  var M = MVC.model; // 对model层的引用，数据是视图的骨架
  var showThings;

  return {
    /*初始化todo*/
    initTodo() {
      var todoHead = `<div>
                          <h1>todos</h1>
                          <a href='#' id='signOut'>登录</a>
                      </div>`;

      var todoInput = `<div id="input-things">
                        <input type="button" id="allChoose" value="All"><input type="text" placeholder="What needs to be done?" id="input">
                      </div>`;
                
      var todoShowThings = `<div id="show-things"></div>`;
            
      var todoFeatures = `<div id="features">
                            <P id="things-number"> <span id ="number"> 0 </span> items</P>
                            <span id="buttons">
                              <button id="all">All</button>
                              <button id="active">Active</button>
                              <button id="completed">Completed</button>
                            </span>
                            <a href="#" id="clear" class="hidden"> Clear completed</a>
                          </div>`;

      var todoFoot = `<footer>
                        <div id="welcome">
                          <p>Hello!</p>
                          <p>MyTodo only save things when you loigned!</p>
                        </div>      
                        <p>made by: JianLu^_^</p>
                      </footer>`;

      var body = document.getElementsByTagName('body');
            
      body[0].innerHTML = '<div id="todoFrame">'+
                                  todoHead +
                                  todoInput + 
                                  todoShowThings + 
                                  todoFeatures +
                                  todoFoot
                              '</div>';
    },

    // 渲染model返回的所有的事情
    addThingsModel(showThings, things) {
      showThings.innerHTML = things;  // 添加到showThings框内，在页面显示
    },

    /*显示登录用户*/
    showUser(name) { 
      var welcome = document.getElementById('welcome');
      welcome.innerHTML = "<p class='hello'>Hello " + name + "!</p><p>Today, you want to do what?</p>";   
      signOut.innerHTML = '注销';
    },

    /*添加事件函数*/
    addThings (addThing) {
      if (addThing) {
        var div = document.createElement('div');
        var div2 = document.createElement('div');
        var p = document.createElement('p');
        var father = document.getElementById('show-things');
        var text = document.createTextNode(addThing)
        p.appendChild(text);
        div2.appendChild(this.circle());
        div2.appendChild(p);
        div2.appendChild(this.prioritySign());
        div2.appendChild(this.deleteSign());
        div.appendChild(div2);
        p.className = 'text';
        div2.className = 'aThing';
        M.addChild(father, div);

        $(".aThing").fadeIn(500);
        $(".aThing").css({display: "inline-block"});

      }
    },

    /*清空输入框*/
    clearInput() {
      input.value = '';
    },

    /*圆圈标志*/
    circle() {
      var div = document.createElement('div');
      div.className = 'circle';
      div.style.borderRadius = '50%';
      return div;
    },

    /*删除标志*/
    deleteSign() {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode('X'));
      div.className = 'deleteSign';
      return div;
    },

    /*优先级标志*/
    prioritySign() {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode('☆'));
      div.className = 'prioritySign';
      return div;
    },

    /*功能框显隐函数*/
    showFeature() {
      showThings = document.getElementById('show-things');
        if (showThings.hasChildNodes()) {
          features.style.visibility = 'visible';
        } else if (!showThings.hasChildNodes()) {
          features.style.visibility = 'hidden';
        }
    },

    /*计数器*/
    showNumber(showThings) {    
      var number = 0;
      var length = showThings.childNodes.length;
      var spanNumber = document.getElementById('number');
      for (var i = 0; i < length; i++) {
        if (!showThings.childNodes[i].classList.contains('hidden')) {
          number++;
        }
      }
      spanNumber.innerHTML = number;
    },

    /*打勾*/
    daGou() {
      return document.createTextNode('√');
    },

    /*关闭优先级*/
    changePriorityOff(item, showThings, thisNode) {
      item.firstChild.nodeValue = '☆';
      item.classList.remove('priority');  
      item.parentNode.classList.remove('priorityThing');
      showThings.insertBefore(thisNode, null)
    },

    /*开启优先级*/
    changePriorityOn(item, showThings, thisNode) {
      item.firstChild.nodeValue = '★';
      item.classList.add('priority');
      item.parentNode.classList.add('priorityThing');
      showThings.insertBefore(thisNode, showThings.firstChild)
    },

    /*添加完成效果*/
    makeCompleted(item) {
      item.appendChild(this.daGou());
      item.classList.add('choose');
      item.nextSibling.classList.add('has-done');
      item.parentNode.parentNode.classList.add('com');
    },

    /*取消完成效果*/
    makeUncompleted(item) {
      item.removeChild(item.firstChild);
      item.classList.remove('choose');
      item.nextSibling.classList.remove('has-done');
      item.parentNode.parentNode.classList.remove('com');      
    },

    unlogin(welcomeParagraph, loginButton) {
      var storage = M.getLocalStroage();
      storage.user = '';
      welcomeParagraph.innerHTML = "<p>Hello!</p><p>MyTodo only save things when you loigned!</p>";
      loginButton.innerHTML = '登录';
    },

    /*清除已完成事项*/
    showClear(clearButton) {
      showThings = document.getElementById('show-things');
      var parent = showThings.childNodes,
          len = parent.length,
          i;
      
      //有选中的事项
      for (i = 0; i < len; i++) {
        if (parent[i].classList.contains('com')) {
          if (clearButton.classList.contains('hidden')) {
            clearButton.classList.remove('hidden');
          }
          break;
        } 
      }

      //没有被选中的事项
      if (i == len) {
        if (!clearButton.classList.contains('hidden')) {
          clearButton.classList.add('hidden');
        }
      } 
    }


  }
}();

MVC.controller = function () {
    
  var V = MVC.view;
  var M = MVC.model;

  var C = {
    start: function () {  // 渲染视图

      V.initTodo();  // 初始化视图
      this.showThings();  // 在视图中添加要做的事情
      this.__listen();  // 添加监听事件
    },    

    showThings: function () { // 添加事情显示
      // 初始化Model数据
      var name = M.getUser();

      if (name) {
        var data = M.initData(name);
        if (data) {
          showThings = document.getElementById('show-things');
          if(data.things) {
            V.addThingsModel(showThings, data.things);
          }
        }
        V.showUser(name);
      }
    },

    __listen: function () {      
      var input = document.getElementById('input');
      var features = document.getElementById('features');
      var showThings = document.getElementById('show-things');
      var features = document.getElementById('features');
      var allChoose = document.getElementById('allChoose');
      var clearButton = document.getElementById('clear');


      var body = document.getElementsByTagName('body');
      var storage = M.getLocalStroage();
      var signOut = document.getElementById('signOut');
      var ID = 'all';

      V.showFeature();
      V.showNumber(showThings);
      
      /*添加事件*/
      EventUtil.addHandler(input, 'keydown', function(event) {
        event = EventUtil.getEvent(event);
        if (input.value) {
          if (event && event.keyCode == 13) {
            V.addThings(input.value); //添加
            V.clearInput(); //清空输入框

            if (ID == 'completed') {
              showThings.lastChild.classList.add('hidden');
            }

            setTimeout(function(){

              V.showFeature();  //功能框显隐
              V.showNumber(showThings); //计数器          
            }, 500);        
          }
        }
      });

      /*删除事件*/  
      EventUtil.addHandler(showThings, 'click', function(event) {  
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if (target.classList.contains('deleteSign')) {

          $(target.parentNode).fadeOut(500);  //渐出

          setTimeout(function(){

            M.deleteChild(showThings, target.parentNode.parentNode);

            V.showFeature();
            V.showNumber(showThings);

          }, 700);      
        } 

      }); 

      /*标记完成事件*/  
      EventUtil.addHandler(showThings, 'click', function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var thisDiv = target.parentNode.parentNode;

        if (target.classList.contains('circle')) {
          if (target.childNodes.length == 0) {  

            target.classList.add("choose");
            target.nextSibling.classList.add("has-done");
            thisDiv.classList.add('com');
            M.addChild(target, V.daGou());  // 标记 

            if (ID == 'active') {
              thisDiv.classList.add('hidden');
            }
          } else {

            target.classList.remove("choose");
            target.nextSibling.classList.remove("has-done");
            thisDiv.classList.remove('com');
            M.deleteChild(target, target.firstChild)  // 取消标记

            if (ID == 'completed') {
              thisDiv.classList.add('hidden');
            }
          }
        } 

        V.showClear(clearButton);
      }); 

      /*标记优先级事件*/
      EventUtil.addHandler(showThings, 'click', function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var thisNode = target.parentNode.parentNode;

        if (target.classList.contains('prioritySign')){

          if (target.classList.contains('priority')) {
            V.changePriorityOff(target, showThings, thisNode);
        
          } else {
            V.changePriorityOn(target, showThings, thisNode);

          }


          if(M.getUser()) { // 有登录
            M.saveThings();  //保存信息到json
          }
        }
      });

      /*功能按钮*/
      EventUtil.addHandler(features, 'click', function(event) {
        event = EventUtil.getEvent(event);
        var all = document.getElementById('all');
        var active = document.getElementById('active');
        var completed = document.getElementById('completed');
        var target = EventUtil.getTarget(event);
        var parent = showThings.childNodes,
          len = parent.length,
          childCircle,
          i;  

        switch (target.id) {
          case 'all': 
            for (i = 0; i < len; i++) {
              if (parent[i].classList.contains('hidden')) {
                parent[i].classList.remove('hidden');
              }    
            }

            active.classList.remove('border');
            completed.classList.remove('border');
            target.classList.add('border');
            ID = 'all';
            break;

          case 'active':
            for (i = 0; i < len; i++) {
              childCircle = parent[i].firstChild.firstChild;
                if (!parent[i].classList.contains('hidden') && parent[i].classList.contains('com')) {
                  parent[i].classList.add('hidden');     

                } else if (parent[i].classList.contains('hidden') && !parent[i].classList.contains('com')) {
                  parent[i].classList.remove('hidden');
                }     
              }
               
            all.classList.remove('border');
            completed.classList.remove('border');
            target.classList.add('border');
            ID = 'active';
            break;

          case 'completed':
            for (i = 0; i < len; i++) {
              childCircle = parent[i].firstChild.firstChild;
              if (!parent[i].classList.contains('hidden') && !parent[i].classList.contains('com')) {
                parent[i].classList.add('hidden');

              } else if (parent[i].classList.contains('hidden') && parent[i].classList.contains('com')) {
                parent[i].classList.remove('hidden');
              }  
            }
            active.classList.remove('border');
            all.classList.remove('border');
            target.classList.add('border');
            ID = 'completed';
            break;
        }

        V.showNumber(showThings);
      });

      /*全选按钮*/
      EventUtil.addHandler(allChoose, 'click', function() {
        var parent = showThings.childNodes;
        var len = showThings.childNodes.length,
            i,
            j = 0;

        for (i = 0; i < len; i++) {

          //有没被选中的事件，选中它
          if (!parent[i].classList.contains('com')) {
            var childCircle = parent[i].firstChild.firstChild;

            V.makeCompleted(childCircle);

            if (ID == 'active') {
              parent[i].classList.add('hidden');
            } else {
              parent[i].classList.remove('hidden');
            }

            j++;
          }
        }

        //全部被选中时，取消选中
        if (j == 0) {
          for (i = 0; i < len; i++) {
            var childCircle = parent[i].firstChild.firstChild;

            V.makeUncompleted(childCircle);

            if (ID == 'completed') {
              parent[i].classList.add('hidden');
            } else {
              parent[i].classList.remove('hidden');
            }
          }
        } 

        if(M.getUser()) { // 有登录
          M.saveThings();  //保存信息到json
        }
        V.showClear(clearButton);
      });

      /*清除已完成项*/
      EventUtil.addHandler(clearButton, 'click', function() {
        var len = showThings.childNodes.length;
        for (var i = len-1; i >= 0; i--) {
            var parent = showThings.childNodes;
            if (parent[i].classList.contains('com')) {
              M.deleteChild(showThings, parent[i]);
            }
        }

        V.showFeature();
        V.showClear(clearButton);
      });

      /*修改文本*/
      EventUtil.addHandler(showThings, 'dblclick', function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        if (target.classList.contains('text')) {  // 双击文本

          target.setAttribute('contenteditable','true');
          document.getSelection().collapse(target.firstChild, target.firstChild.length);  // 让光标在最后面出现

          EventUtil.addHandler(target, 'focusout', function() { // 要修改的文本失去焦点
            target.setAttribute('contenteditable','false');
      
            if (!target.innerHTML) {
              M.deleteChild(showThings, target.parentNode.parentNode);

              V.showFeature();
              V.showNumber(showThings);
            }

            M.saveThings(); // 保存修改
          });   

         }
      });

      /*登录注销*/  
      EventUtil.addHandler(signOut, 'click', function() {
        if (signOut.innerHTML == '注销') {      
          V.unlogin(welcome, signOut);
        } else {
          window.location.href='./login.html';
        }
      });

    }  
  }  

  return C;
}();

var C = MVC.controller;
C.start();





















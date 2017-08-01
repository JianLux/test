MVC.controller = function () {
    
  var V = MVC.view;
  var M = MVC.model;

  var C = {
    start: function () {
      V.initTodo();  // 初始化视图
      this.__listen();
    },    

    __listen: function () {      
        var input = document.getElementById('input');
        var features = document.getElementById('features');
        var showThings = document.getElementById('show-things');
        var features = document.getElementById('features');
        var allChoose = document.getElementById('allChoose');
        var clearButton = document.getElementById('clear');
        var spanNumber = document.getElementById('number');
        var body = document.getElementsByTagName('body');
        var storage = getLocalStroage();
        var name = storage.getItem("user");
        var signOut = document.getElementById('signOut');
        
  /*添加事件*/
  EventUtil.addHandler(input, 'keydown', function(event) {
    event = EventUtil.getEvent(event);
    if (input.value) {
      if (event && event.keyCode == 13) {
        V.addThings(input.value); //添加
        V.clearInput(); //清空输入框

        

        setTimeout(function(){

          M.saveThings();  //保存信息到json
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
    if (target.className == 'deleteSign') {

      $(target.parentNode).fadeOut(500);
      setTimeout(function(){
        debugger;
        showThings.removeChild(target.parentNode.parentNode);
        save(); //保存数据

        showHidden.hidden();
        showNumber(showThings);

      }, 500);      
    } 

  }); 

      /*标记完成事件*/  
  EventUtil.addHandler(showThings, 'click', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (target.classList.contains('circle')) {
      if (target.childNodes.length == 0) {
        target.appendChild(document.createTextNode('√'));  // 标记
        target.classList.add("choose");
        target.nextSibling.classList.add("has-done");
      } else {
        target.removeChild(target.firstChild);  // 取消标记
        target.classList.remove("choose");
        target.nextSibling.classList.remove("has-done");
      }
    } 

    showClear();
  }); 

  /*标记优先级事件*/
  EventUtil.addHandler(showThings, 'click', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var thisNode = target.parentNode.parentNode;

    if (target.classList.contains('prioritySign')){

      if (target.classList.contains('priority')) {
        target.firstChild.nodeValue = '☆';
        target.classList.remove('priority');  
        target.parentNode.classList.remove('priorityThing');
        showThings.insertBefore(thisNode, null)
    
      } else {
        target.firstChild.nodeValue = '★';
        target.classList.add('priority');
        target.parentNode.classList.add('priorityThing');
        showThings.insertBefore(thisNode, showThings.firstChild)
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
          if (parent[i].style.display = 'none') {
            parent[i].style.display = '';
          }
          if (parent[i].classList.contains('com')) {
            parent[i].classList.remove('com');
          }       
        }

        active.classList.remove('border');
        completed.classList.remove('border');
        target.classList.add('border');
        break;
      case 'active':
        for (i = 0; i < len; i++) {
          childCircle = parent[i].firstChild.firstChild;
          if (childCircle.hasChildNodes()) {
            if (parent[i].style.display != 'none') {
              parent[i].style.display = 'none';
            }           
          } else {
              if (parent[i].style.display == 'none') {
              parent[i].style.display = '';
              }     
          }
          
          if (parent[i].classList.contains('com')) {
            parent[i].classList.remove('com');
          }      
        }

        all.classList.remove('border');
        completed.classList.remove('border');
        target.classList.add('border');
        break;
      case 'completed':
        for (i = 0; i < len; i++) {
          childCircle = parent[i].firstChild.firstChild;
          if (!childCircle.hasChildNodes()) {
            if (parent[i].style.display != 'none') {
              parent[i].style.display = 'none';
            }
          } else {
              if (parent[i].style.display == 'none') {
              parent[i].style.display = '';
              } 
          }

          if (!parent[i].classList.contains('com')) {
            parent[i].classList.add('com');
          }      
        }
        active.classList.remove('border');
        all.classList.remove('border');
        target.classList.add('border');
        break;
    }

    showNumber(showThings);
  });

  /*全选按钮*/
  EventUtil.addHandler(allChoose, 'click', function() {
    var len = showThings.childNodes.length,
        childCircleI,
        childCircleJ,
        i,
        j;

    for (i = 0; i < len; i++) {
      childCircleI = showThings.childNodes[i].firstChild.firstChild;

      //有没被选中的事件，选中它
      if (!childCircleI.hasChildNodes()) {
        for (j = 0; j < len; j++) {
          childCircleJ = showThings.childNodes[j].firstChild.firstChild;
          if (!childCircleJ.hasChildNodes()) {
            childCircleJ.appendChild(document.createTextNode('√'));
            childCircleJ.classList.add('choose');
            childCircleJ.nextSibling.classList.add('has-done');
          } 
        } 
        
        break;
      } 
    }

    //全部被选中时，取消选中
    if (i == len) {
      for (i = 0; i < len; i++) {
        childCircleI = showThings.childNodes[i].firstChild.firstChild;
        if (!showThings.childNodes[i].classList.contains('com')) {
                  childCircleI.removeChild(childCircleI.firstChild);
        childCircleI.classList.remove("choose");
        childCircleI.nextSibling.classList.remove("has-done");
        }
      } 
    } 

    showClear();
  });

  /*清除已完成项*/
  EventUtil.addHandler(clearButton, 'click', function() {
    var len = showThings.childNodes.length;
    for (var i = len-1; i >= 0; i--) {
        var childCircle = showThings.childNodes[i].firstChild.firstChild;
        if (childCircle.hasChildNodes()) {
          showThings.removeChild(showThings.childNodes[i]);
        }
    }

    showHidden.hidden();
    showClear();
  });

  /*显隐全部清理按钮*/
  var showClear = function() {
   var len = showThings.childNodes.length,
          childCircleI,
          i;
    
    //有选中的事项
    for (i = 0; i < len; i++) {
      childCircleI = showThings.childNodes[i].firstChild.firstChild;
      if (childCircleI.hasChildNodes()) {
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
  };


  /*修改文本*/
  EventUtil.addHandler(showThings, 'dblclick', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if (target.className == 'text') {

      target.setAttribute('contenteditable','true');
      document.getSelection().collapse(target.firstChild, target.firstChild.length);


      // EventUtil.addHandler(body[0], 'click', function() {
      //   target.setAttribute('contenteditable','false');
      // });    
     
      EventUtil.addHandler(target, 'focusout', function() {
        target.setAttribute('contenteditable','false');
        if (!target.contentText) {
          showThings.removeChild(target.parentNode.parentNode);

          showHidden.hidden();
          showNumber(showThings);
        }
      });   
     }




  });


  
  EventUtil.addHandler(signOut, 'click', function() {
    if (signOut.innerHTML == '注销') {
      var hello = document.getElementsByClassName('hello');
      storage.user = '';
      name = '';
      welcome.innerHTML = "<p>Hello!</p><p>MyTodo only save things when you loigned!</p>";
      signOut.innerHTML = '登录';
    } else {
      window.location.href='./sign.html';
    }
    
  });




    }  
  }  

  return C;

}()

var C = MVC.controller;
C.start();



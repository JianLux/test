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

/*圆圈标志*/
var circle = function() {
  var div = document.createElement('div');
  div.className = 'circle';
  div.style.borderRadius = '50%';
  return div;
}

/*删除标志*/
var deleteSign = function() {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode('X'));
  div.className = 'deleteSign';
  return div;
}

/*优先级标志*/
var prioritySign = function() {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode('☆'));
  div.className = 'prioritySign';
  return div;
}

/*添加事件函数*/
var addThings = function(addThing) {
  if (addThing) {
    var div = document.createElement('div');
    var p = document.createElement('p');
    var p2 = document.createElement('p');
    var father = document.getElementById('show-things');
    var text = document.createTextNode(addThing)
    p2.appendChild(text);
    p.appendChild(circle());
    p.appendChild(p2);
    p.appendChild(prioritySign());
    p.appendChild(deleteSign());
    div.appendChild(p);
    p2.className = 'text';
    p.className = 'aThing';
    father.appendChild(div);
    
    //保存数据
    // save(storage, div, div);
  }
};



EventUtil.addHandler(window, 'load', function() {

  var input = document.getElementById('input');
  var features = document.getElementById('features');
  var showThings = document.getElementById('show-things');
  var features = document.getElementById('features');
  var button = document.getElementById('button');
  var clearButton = document.getElementById('clear');
  var spanNumber = document.getElementById('number');
  var body = document.getElementsByTagName('body');
  // var storage = getLocalStorage(); 

  /*功能框显隐函数*/
  var showHidden = {
    show: function() {
      if (features.style.visibility = 'hidden') {
        if (showThings.hasChildNodes()) {
        }
      }
    },

    hidden: function() {
      if (features.style.visibility = 'visible') {
        if (!showThings.hasChildNodes()) {
          features.style.visibility = 'hidden';
        }
      }
    }
  };

  /*显示数量函数*/
  var showNumber = function(things) {    
    var number = 0;
    var length = things.childNodes.length;
    for (var i = 0; i < length; i++) {
      if (things.childNodes[i].style.display != 'none') {
        number++;
      }
    }
    spanNumber.firstChild.nodeValue = number;
  };

  /*添加事件*/
  EventUtil.addHandler(input, 'keydown', function(event) {
    event = EventUtil.getEvent(event);
    if (event && input.value != '' && event.keyCode == 13) {
      addThings(input.value);


      input.value = '';
      if (showThings.firstChild.classList.contains('com')) {
        showThings.lastChild.style.display = 'none';
       }
    }

    showHidden.show();  //功能框显隐
    showNumber(showThings); //计数器
  });

  /*删除事件*/  
  EventUtil.addHandler(showThings, 'click', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (target.className == 'deleteSign') {
      showThings.removeChild(target.parentNode.parentNode);
    } 

    showHidden.hidden();
    showNumber(showThings);
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

    // if (target.classList.contains('prioritySign')){

    //   if (target.classList.contains('priority')) {
    //     target.firstChild.nodeValue = '☆';
    //     target.classList.remove('priority');
          
    //     while(thisNode.nextSibling != showThings.lastChild) {
    //         nextNode = thisNode.nextSibling;

    //         if (nextNode.firstChild.classList.contains('priorityThing')) {

    //         temp = nextNode.firstChild.innerHTML;
    //         nextNode.firstChild.innerHTML = thisNode.firstChild.innerHTML;
    //         thisNode.firstChild.innerHTML = temp;

    //         thisNode = nextNode;
    //         nextNode.firstChild.classList.remove('priorityThing');
    //         } 
    //      } 
    //   } else {
    //     target.firstChild.nodeValue = '★';
    //     target.classList.add('priority');

    //     for (i = 0; i < showThings.childNodes.length; i++) {
    //       p = showThings.childNodes[i].firstChild;
    //       //检测子div中的p是否含有该类
    //       if (!p.classList.contains('priorityThing')) {
    //         temp = p.innerHTML;
    //         p.innerHTML = target.parentNode.innerHTML;
    //         target.parentNode.innerHTML = temp;
    //         p.classList.add('priorityThing');
    //         break;
    //       } else if (i == showThings.childNodes.length-1) {
    //         target.parentNode.classList.add('priorityThing');
    //       }
    //     }
    //   }

    }



  })

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
  EventUtil.addHandler(button, 'click', function() {
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

  EventUtil.addHandler(showThings, 'dblclick', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if (target.className == 'text') {

      target.setAttribute('contenteditable','true');
      document.getSelection().collapse(target.firstChild, target.firstChild.length);

      // EventUtil.addHandler(target, 'keydown', function(event) {
      //   event = EventUtil.getEvent(event);

      //   if (event && event.keyCode == 13) {
      //     target.setAttribute('contenteditable','false');
      //   }

      //   if (event.ctrlKey && event.keyCode == 13) {
      //     target.innerHTML = target.innerHTML + "\n";
      //     document.getSelection().collapse(target.firstChild, target.firstChild.length);
      //     target.setAttribute('contenteditable','true');
      //   }
          // });  

      EventUtil.addHandler(body[0], 'click', function() {
        target.setAttribute('contenteditable','false');
      });    
     }
  });
});

// //存储
// function getLocalStorage() {
//   if (typeof localStorage == 'object') {
//     return localStorage;
//   } else if (typeof globalStorage == 'object') {
//     return globalStorage[location.host];
//   } else {
//     throw new Error('local storage not available.');
//   }
// }

// //储存数据
// var save = function(storage, name, value) {
//   storage.setItem(name, value);
// }

// //删除数据
// var deleted = function(storage, name) {
//   storage.removeItem(name);
// }



















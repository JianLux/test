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
    p.appendChild(deleteSign());
    div.appendChild(p);
    p2.className = 'text';
    p.className = 'aThing';
    father.appendChild(div);
  }
};

/*显示数量*/
var showNumber = function(things) {
  var spanNumber = document.getElementById('number');
  var number = 0;
  var length = things.childNodes.length;
  for (var i = 0; i < length; i++) {
    if (things.childNodes[i].style.display != 'none') {
      number++;
    }
  }
  spanNumber.firstChild.nodeValue = number;
};

EventUtil.addHandler(window, 'load', function() {

  var input = document.getElementById('input');
  var features = document.getElementById('features');
  var showThings = document.getElementById('show-things');
  var features = document.getElementById('features');

  /*添加事件*/
  EventUtil.addHandler(input, 'keydown', function(event) {
    event = EventUtil.getEvent(event);
    if (event.keyCode == 13) {
      addThings(input.value);
      input.value = '';
    }

    /*功能框显示*/
    if (features.style.visibility = 'hidden') {
      if (showThings.childNodes.length) {
        features.style.visibility = 'visible';
      }
    }

    showNumber(showThings);
  });

  /*删除事件*/  
  EventUtil.addHandler(showThings, 'click', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (target.className == 'deleteSign') {
      showThings.removeChild(target.parentNode.parentNode);
    } 

    /*功能框隐藏*/
    if (features.style.visibility = 'visible') {
      if (showThings.childNodes.length == 0) {
        features.style.visibility = 'hidden';
      }
    }

    showNumber(showThings);
  }); 

  /*标记事件*/  
  EventUtil.addHandler(showThings, 'click', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (target.className == 'circle') {
      if (target.childNodes.length == 0) {
        target.appendChild(document.createTextNode('√'));  // 标记
      } else {
        target.removeChild(target.firstChild);  // 取消标记
      }
    } 
  }); 

  EventUtil.addHandler(features, 'click', function(event) {
    event = EventUtil.getEvent(event);
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
        }
        break;
      case 'active':
        for (i = 0; i < len; i++) {
          childCircle = parent[i].firstChild.firstChild;
          if (childCircle.childNodes.length) {
            if (parent[i].style.display != 'none') {
              parent[i].style.display = 'none';
            }           
          } else {
              if (parent[i].style.display == 'none') {
              parent[i].style.display = '';
              }     
          }
        }
        break;
      case 'completed':
        for (i = 0; i < len; i++) {
          childCircle = parent[i].firstChild.firstChild;
          if (!childCircle.childNodes.length) {
            if (parent[i].style.display != 'none') {
              parent[i].style.display = 'none';
            }
          } else {
              if (parent[i].style.display == 'none') {
              parent[i].style.display = '';
              } 
          }
        }
        break;
    }

    showNumber(showThings);
  });

 
});


















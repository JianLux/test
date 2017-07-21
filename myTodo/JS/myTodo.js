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

/*事件处理函数*/
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
	});	

	/*标记事件*/	
	EventUtil.addHandler(showThings, 'click', function(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		if (target.className == 'circle') {
			if (target.childNodes.length == 0) {
				target.appendChild(document.createTextNode('√'));  // 标记
			} else {
				target.removeChild(target.firstChild);	// 取消标记
			}
		} 
	});	

	EventUtil.addHandler(features, 'click', function(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var len = showThings.childNodes.length,
			movedActiveChild = [],
			activeChild,
			movedCompeletedChild = [],
			compeletedChild;

		switch (target.id) {
			case 'all': 

			case 'active':
				for (var i = 0; i < len; i++) {
					var parent = showThings.childNodes[i].firstChild.firstChild;
					if (parent.childNodes.length) {
						if (movedActiveChild.length) {
							for (var i = movedActiveChild.length - 1; i >= 0; i--) {
								showThings.appendChild(movedActiveChild[i]);
							}
							movedActiveChild = [];
						}
						child = showThings.removeChild(showThings.childNodes[i]);
						movedCompeletedChild.push(compeletedChild);
					}
				}
				break;
			case 'compeleted':
				for (var i = 0; i < len; i++) {
					var parent = showThings.childNodes[i].firstChild.firstChild;
					if (!parent.childNodes.length) {
						if (movedCompeletedChild.length) {
							for (var i = movedCompeletedChild.length - 1; i >= 0; i--) {
								showThings.appendChild(movedCompeletedChild[i]);
							}
							movedCompeletedChild = [];
						}
						child = showThings.removeChild(showThings.childNodes[i]);
						movedActiveChild.push(activeChild);
					}
				}
				break;
		}
	});

});


















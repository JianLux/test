var MVC = {};

function getLocalStroage() {
  if (typeof localStorage == 'object') {
    return localStorage;
  } else if (typeof globalStorage == 'object') {
    return globalStorage[location.host];
  } else {
    throw new Error('Local storage not available.');
  }
}

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
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
                        <input type="button" id="allChoose" value="V"><input type="text" placeholder="What needs to be done?" id="input">
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

      // 初始化Model数据
      // M.initData();
    },

    /*显示登录用户*/
    showUser() { 
      if (name) {
        var welcome = document.getElementById('welcome');
        welcome.innerHTML = "<p class='hello'>Hello " + name + "!</p><p>Today, you want to do what?</p>";   
        signOut.innerHTML = '注销';
      };
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
        father.appendChild(div);

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

    /*功能框显示函数*/
    showFeature() {
      if (features.style.visibility = 'hidden') {
        if (showThings.hasChildNodes()) {
          features.style.visibility = 'visible';
        }
      } else if (features.style.visibility = 'visible') {
        if (!showThings.hasChildNodes()) {
          features.style.visibility = 'hidden';
        }
      }
    },

    /*显示数量函数*/
    showNumber() {    
      var number = 0;
      var length = things.childNodes.length;
      for (var i = 0; i < length; i++) {
        if (things.childNodes[i].style.display != 'none') {
          number++;
        }
      }
      spanNumber.firstChild.nodeValue = number;
    }

    thingFadeOut(thing) {
      $(thing).fadeOut(500);  //渐出
    }

   
  }
}()


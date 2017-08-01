

MVC.model = function () {

  return {
         


  //存在用户名就读取信息
  initData () {
    if (name) {
      $.ajax({
        type:"get",
        url: "http://localhost:3000/users/" + name,
        async: false,
        dataType: "json",
        success: function(deta) {
          var things = deta.things;
          if (things) {
            showThings.innerHTML = things;

            showHidden.show();  //功能框显隐
            showNumber(showThings); //计数器
          }
        }
      });
    }
  },

  //如果存在名字保存数据
  saveThings () {
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
  }




}

}()
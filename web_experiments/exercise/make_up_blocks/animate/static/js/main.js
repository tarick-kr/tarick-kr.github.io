$(document).ready(function () {

  svg4everybody({});

  var item1 = $("#item1");
  item1.click(function(){
    item1.addClass("tdStampInSwing");
    setTimeout(function(){
      item1.removeClass("tdStampInSwing");
    }, 1500);
  });

  var item2 = $("#item2");
  item2.click(function(){
    item2.addClass("tdSwingOut");
    setTimeout(function(){
      item2.removeClass("tdSwingOut");
    }, 1500);
  });

  var item3 = $("#item3");
  item3.click(function(){
    item3.addClass("tdExpandOutBounce");
    setTimeout(function(){
      item3.removeClass("tdExpandOutBounce");
    }, 1500);
  });







});
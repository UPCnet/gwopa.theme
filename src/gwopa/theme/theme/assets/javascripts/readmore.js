require([
  'expect',
  'jquery'
], function(expect, $) {
  $(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 390;  // How many characters are shown by default
    var lang = $('html').attr('lang');
    var fullcontent = "";
    var lesscontent = "";

    if (lang == 'es') {
      var moretext = '<i class="fa fa-plus"></i><span> Leer más</span>';
      var lesstext = '<i class="fa fa-minus"></i><span> Leer menos</span>';
    } else if (lang == 'fr') {
      var moretext = '<i class="fa fa-plus"></i><span> Voir plus</span>';
      var lesstext = '<i class="fa fa-minus"></i><span> Voir moins</span>';
    } else {
      var moretext = '<i class="fa fa-plus"></i><span> Show more</span>';
      var lesstext = '<i class="fa fa-minus"></i><span> Show less</span>';
    }


    $('.more').each(function() {
      fullcontent = $(this).html();
      if(fullcontent.length > showChar) {
        var little_text = fullcontent.substr(0, showChar);
        var extra_text = '<p>' + fullcontent.substr(showChar, fullcontent.length - showChar);
        lesscontent = little_text + '<span class="moreellipses">...</span></p><span class="morecontent"><span>' + extra_text +
        '</span></span><a href="#" class="morelink less">' + moretext + '</a>';

        $(this).html(lesscontent);
      }
    });

    $(".morelink").click(function(){
      if($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(lesstext);
      } else {
        $(this).addClass("less");
        $(this).html(moretext);
      }
      $(this).prev().toggle();
      return false;
    });
  });
});

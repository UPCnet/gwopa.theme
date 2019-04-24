require([
  'expect',
  'jquery'
], function(expect, $) {
  $(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 390;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = '<i class="fa fa-plus-circle"></i>';
    var lesstext = '<i class="fa fa-minus-circle"></i>';


    $('.more').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {

            var little_text = content.substr(0, showChar);
            var extra_text = content.substr(showChar, content.length - showChar);
            var html = little_text + '<span class="moreellipses">' + ellipsestext +
            '&nbsp;</span><span class="morecontent"><span>' + extra_text +
            '<a href="#" class="morelink less">' + moretext + '</a>' +
            '</span></span>';

            $(this).html(html);
            $(".morelink").prev().toggle();
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

require([
  'expect',
  'jquery'
], function(expect, $) {

    $(document).ready(function(){
        $('form.pat-livesearch').bind("keypress", function(e) {
          if (e.keyCode == 13) {
            e.preventDefault();
            return false;
          }
        });
    });
});

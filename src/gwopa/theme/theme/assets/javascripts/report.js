require([
  'expect',
  'jquery'
], function(expect, $) {
    var url = document.location.toString();
    if (url.match('#')) {
        var tab = url.split('#')[1];
        $('#reportPreviewProject .nav-item a[href="#' + tab + '"]').trigger('click');
    }
});

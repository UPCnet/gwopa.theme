require([
  'expect',
  'jquery'
], function(expect, $) {
    var url = document.location.toString();
    if (url.match('#')) {
        var tab = url.split('#')[1];
        $('#reportPreviewProject .nav-item a[href="#' + tab + '"]').trigger('click');
    }

    $('#refreshReport').on('click', function(){
        if (confirm("Are you sure want to update the data in this report with what is currently on the platform?")) {
            var params = {};
            params.refresh = true;

            var url = window.location.href
            if (url.match('#')) {
                url = url.split('#')[0]
            }

            $.ajax({
                url: url,
                method: 'POST',
                data: params,
                success: function(resp) {
                    location.reload();
                }
            });
        }
    });
});

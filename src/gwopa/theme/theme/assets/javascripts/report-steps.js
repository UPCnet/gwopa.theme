require([
  'expect',
  'jquery'
], function(expect, $) {

    $('div#tabla7 #stepsModal button.btn-primary').on('click', function(){
        var params = {};
        params.text = $('#stepsModal textarea').val();

        var url = window.location.href
        if (url.match('#')) {
            url = url.split('#')[0]
        }

        $.ajax({
            url: url + '/modifynextsteps',
            method: 'POST',
            data: params,
            success: function(resp) {
                var url = document.location.toString();
                if (url.match('#')) {
                    window.location.href = url.split('#')[0] + "#tabla7";
                } else {
                    window.location.href = url + "#tabla7";
                }
                location.reload();
            }
        });
    });

    $('div#tabla7 #stepsModal button.btn-secondary').on('click', function(){
        $('#stepsModal textarea').val($('#steps').text());
    });
});

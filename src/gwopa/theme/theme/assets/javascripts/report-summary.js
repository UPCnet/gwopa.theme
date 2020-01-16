require([
  'expect',
  'jquery'
], function(expect, $) {

    $('div#tabla2 .overallProjectStatus .status > div.bg-disabled').on('click', function(){

        if (confirm("Are you sure that you want to apply this change?")) {
            var params = {};
            params.status = $(this).data('status');

            $.ajax({
                url: window.location.href + '/modifysummarystatus',
                method: 'POST',
                data: params,
                success: function(resp) {
                    location.reload();
                }
            });
        }
    });


    $('div#tabla2 #stakeholdersModal button.btn-primary').on('click', function(){
        var params = {};
        params.text = $('#stakeholdersModal textarea').val();

        $.ajax({
            url: window.location.href + '/modifysummaryprogressstakeholders',
            method: 'POST',
            data: params,
            success: function(resp) {
                $('#stakeholders').text($('#stakeholdersModal textarea').val());
            }
        });
    });

    $('div#tabla2 #stakeholdersModal button.btn-secondary').on('click', function(){
        $('#stakeholdersModal textarea').val($('#stakeholders').text());
    });

    $('div#tabla2 #otherModal button.btn-primary').on('click', function(){
        var params = {};
        params.text = $('#otherModal textarea').val();

        $.ajax({
            url: window.location.href + '/modifysummaryotheradditionalchallenges',
            method: 'POST',
            data: params,
            success: function(resp) {
                $('#other').text($('#otherModal textarea').val());
            }
        });
    });

    $('div#tabla2 #otherModal button.btn-secondary').on('click', function(){
        $('#otherModal textarea').val($('#other').text());
    });
});

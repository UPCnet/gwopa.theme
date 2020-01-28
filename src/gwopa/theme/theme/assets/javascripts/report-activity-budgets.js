require([
  'expect',
  'jquery'
], function(expect, $) {

    $('div#tabla6 .budgetsTable span[data-target="#expenditureReportingPeriodModal"]').on('click', function(){
        $('div#tabla6 #expenditureReportingPeriodModal').attr('data-activity', $(this).attr('data-activity'));
    });

    $('div#tabla6 #expenditureReportingPeriodModal button.btn-primary').on('click', function(){
        var params = {};
        params.text = $('div#tabla6 #expenditureReportingPeriodModal input[type="number"]').val();
        params.activity = $('div#tabla6 #expenditureReportingPeriodModal').attr('data-activity');

        var url = window.location.href
        if (url.match('#')) {
            url = url.split('#')[0]
        }

        $.ajax({
            url: url + '/modifyexpenditurereportingperiod',
            method: 'POST',
            data: params,
            success: function(resp) {
                var url = document.location.toString();
                if (url.match('#')) {
                    window.location.href = url.split('#')[0] + "#tabla6";
                } else {
                    window.location.href = url + "#tabla6";
                }
                location.reload();
            }
        });
    });

    $('div#tabla6 .budgetsTable span[data-target="#totalExpenditureDateModal"]').on('click', function(){
        $('div#tabla6 #totalExpenditureDateModal').attr('data-activity', $(this).attr('data-activity'));
    });

    $('div#tabla6 #totalExpenditureDateModal button.btn-primary').on('click', function(){
        var params = {};
        params.text = $('div#tabla6 #totalExpenditureDateModal input[type="number"]').val();
        params.activity = $('div#tabla6 #totalExpenditureDateModal').attr('data-activity');

        var url = window.location.href
        if (url.match('#')) {
            url = url.split('#')[0]
        }

        $.ajax({
            url: url + '/modifytotalexpendituredate',
            method: 'POST',
            data: params,
            success: function(resp) {
                var url = document.location.toString();
                if (url.match('#')) {
                    window.location.href = url.split('#')[0] + "#tabla6";
                } else {
                    window.location.href = url + "#tabla6";
                }
                location.reload();
            }
        });
    });

});

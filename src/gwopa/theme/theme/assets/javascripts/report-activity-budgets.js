require([
  'expect',
  'jquery'
], function(expect, $) {

    $('div#tabla5 .budgetsTable span[data-target="#expenditureReportingPeriodModal"]').on('click', function(){
        $('div#tabla5 #expenditureReportingPeriodModal').attr('data-activity', $(this).attr('data-activity'));
    });

    $('div#tabla5 #expenditureReportingPeriodModal button.btn-primary').on('click', function(){
        var params = {};
        params.text = $('div#tabla5 #expenditureReportingPeriodModal input[type="number"]').val();
        params.activity = $('div#tabla5 #expenditureReportingPeriodModal').attr('data-activity');

        $.ajax({
            url: window.location.href + '/modifyexpenditurereportingperiod',
            method: 'POST',
            data: params,
            success: function(resp) {
                location.reload();
            }
        });
    });

    $('div#tabla5 .budgetsTable span[data-target="#totalExpenditureDateModal"]').on('click', function(){
        $('div#tabla5 #totalExpenditureDateModal').attr('data-activity', $(this).attr('data-activity'));
    });

    $('div#tabla5 #totalExpenditureDateModal button.btn-primary').on('click', function(){
        var params = {};
        params.text = $('div#tabla5 #totalExpenditureDateModal input[type="number"]').val();
        params.activity = $('div#tabla5 #totalExpenditureDateModal').attr('data-activity');

        $.ajax({
            url: window.location.href + '/modifytotalexpendituredate',
            method: 'POST',
            data: params,
            success: function(resp) {
                location.reload();
            }
        });
    });

});

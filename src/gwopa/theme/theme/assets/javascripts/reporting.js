require([
  'expect',
  'jquery'
], function(expect, $) {

    $("#reportingProject #generateReport").on('click', function(){
        $('#modelProyectYears').modal('show');
    })

/*    // Save Report
    $('#saveReport').click(function(e) {
        var params = {};
        var url = window.location.href;
        var project_path = url.substring(0, url.lastIndexOf("/reportPreview"));
        var project_path_report = project_path + '/reporting'
        debugger
        var file = $(downloadReport).first().trigger( "click" );
        var namefile = $("#filename").text() + "_" + $("#generation_report_date").text() + ".xlsx";

        $.ajax({
          url: project_path_report + '/createElement',
          method: 'POST',
          data: params,
          success: function(resp)
            { if(resp) {location.reload();}}
        });
    });*/

});

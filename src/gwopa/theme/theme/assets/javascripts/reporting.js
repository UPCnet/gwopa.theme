require([
  'expect',
  'jquery'
], function(expect, $) {

    $("#reportingProject #generateReport").on('click', function(){
        $('#modelProyectYears').modal('show');
    })

});

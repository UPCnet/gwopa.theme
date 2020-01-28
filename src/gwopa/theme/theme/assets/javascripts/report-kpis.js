require([
  'expect',
  'jquery'
], function(expect, $) {
  String.prototype.trunc = String.prototype.trunc ||
    function(n){
      return (this.length > n) ? this.substr(0, n-1) + '...' : this;
    };

  function fillInfo() {
    var url = window.location.href;
    var project_path = url.substring(0, url.lastIndexOf("/reports"));

    $("#tabla4 .chartPerfomance").each(function(){
      var params = {};
      var id = $(this).attr("id");
      params.performance = $(this).attr("data-url");

      $.ajax({
        url: project_path + '/api-getPerformance',
        method: 'GET',
        data: params,
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        success: function(resp) {
          var data = $.parseJSON(resp);
          var options = {
            chart: {
                id: id,
                height: 270,
                width: "110%",
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            colors: ['#31b0d5', '#f49200'],
            stroke: {
                curve: 'smooth'
            },
            series: data['series'],
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: data['xaxis'],
            },
            yaxis: {
                min: 0,
                max: data['maxYaxis'],
                title: {
                  text: data['mesuring_unit'],
                },
            },
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'left',
            },
            markers: {
                size: 6,
            },
          }

          var chartPerfomance = new ApexCharts(document.querySelector("#tabla4 #" + id), options);
          chartPerfomance.render();
          chartPerfomance = new ApexCharts(document.querySelector("#tabla8 #" + id), options);
          chartPerfomance.render();
        }
      });
    });
  }

  $(document).ready(function() {
    fillInfo();
  });
});

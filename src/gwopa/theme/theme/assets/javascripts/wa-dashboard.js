require([
  'expect',
  'jquery'
], function(expect, $) {
  String.prototype.trunc = String.prototype.trunc ||
    function(n){
      return (this.length > n) ? this.substr(0, n-1) + '...' : this;
    };

  function fillInfo() {
    var params = {};
    params.wa = $('#selectWA').children("option:selected").val();
    params.year = $('.disabled')[0].id;
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/visualizating"));
    $.ajax({
      url: window.project_path + '/api-getActivities',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        var titles = resp[0];
        for (var i=0; i < titles.length; i++) {
          titles[i] = titles[i].replace(titles[i], titles[i].trunc(40));
        }
        var values = resp[1];
        var optionsActivity = {
          chart: {
            id: 'chartActivity',
            height: 150,
            type: 'bar',
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              distributed: false,
              dataLabels: {
                position: 'top',
              },
              colors: {
                backgroundBarColors: ['#cacaca']
              }
            }
          },
          dataLabels: {
            enabled: true,
            offsetX: -12,
            formatter: function(val, opt) {
              return val + "%"
            },
            dropShadow: {
              enabled: true
            }
          },
          stroke: { width: 1,colors: ['#fff'] },
          series: values,
          colors: ['#00b2d7', '#66DA26', '#546E7A', '#E91E63'],
          xaxis: {
            labels: {
              show: false,
              maxWidth: 300,
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            min: 0,
            max: 100,
            categories: titles,
          },
          yaxis: {
            labels: {
              show: true,
              align: 'left',
              maxWidth: 300,
              style: {
                fontSize: '14px',
              }
            },
          },
          tooltip: {
            enabled: false,
            theme: 'dark',
            x: {
              show: false
            },
            y: {
              show: false,
              title: {
                formatter: function() {
                  return ''
                }
              }
            }
          }
        }
        var chartActivity = new ApexCharts(document.querySelector("#chartActivity"), optionsActivity);
        chartActivity.render();
      }
    });
    $.ajax({
      url: window.project_path + '/api-getDashboardOutputs',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        var titles = resp[0];
        for (var i=0; i < titles.length; i++) {
          titles[i] = titles[i].replace(titles[i], titles[i].trunc(40));
        }
        var values = resp[1];
        var optionsOutput = {
          chart: {
            id: 'chartOutput',
            height: 150,
            type: 'bar',
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              distributed: false,
              dataLabels: {
                position: 'top',
              },
              colors: {
                backgroundBarColors: ['#cacaca']
              }
            }
          },
          dataLabels: {
            enabled: true,
            offsetX: -12,
            formatter: function(val, opt) {
              return val + "%"
            },
            dropShadow: {
              enabled: true
            }
          },
          stroke: { width: 1,colors: ['#fff'] },
          series: values,
          colors: ['#00b2d7', '#66DA26', '#546E7A', '#E91E63'],
          xaxis: {
            labels: {
              show: false,
              maxWidth: 300,
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            min: 0,
            max: 100,
            categories: titles,
          },
          yaxis: {
            labels: {
              show: true,
              align: 'left',
              maxWidth: 300,
              style: {
                fontSize: '14px',
              }
            },
          },
          tooltip: {
            enabled: false,
            theme: 'dark',
            x: {
              show: false
            },
            y: {
              show: false,
              title: {
                formatter: function() {
                  return ''
                }
              }
            }
          }
        }
        var chartOutput = new ApexCharts(document.querySelector("#chartOutput"), optionsOutput);
        chartOutput.render();
      }
    });
    //GetCapacityChanges
  }

  function reDrawInfo() {
    var params = {};
    params.wa = $('#selectWA').children("option:selected").val();
    params.year = $('.disabled')[0].id;
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/visualizating"));
    $.ajax({
      url: window.project_path + '/api-getActivities',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        var titles = resp[0];
        for (var i=0; i < titles.length; i++) {
          titles[i] = titles[i].replace(titles[i], titles[i].trunc(40));
        }
        var values = resp[1];
        if (titles.length > 0 && values[0].data.length) {
          $('#graphicActivity').show();
          $('#graphicOutput').show();
          $('#noInfo').hide();
          ApexCharts.exec('chartActivity', 'updateOptions', {
            xaxis: {
              categories: titles,
            },
            series: values,
          }, true, true);
        }
        else {
          $('#graphicActivity').hide();
          $('#graphicOutput').hide();
          $('#noInfo').show();
        }
      }
    });
    $.ajax({
      url: window.project_path + '/api-getDashboardOutputs',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        var titles = resp[0];
        for (var i=0; i < titles.length; i++) {
          titles[i] = titles[i].replace(titles[i], titles[i].trunc(40));
        }
        var values = resp[1];
        if (titles.length > 0 && values[0].data.length) {
          ApexCharts.exec('chartOutput', 'updateOptions', {
            xaxis: {
              categories: titles,
            },
            series: values,
          }, true, true);
        }
      }
    });
    //GetCapacityChanges
  }

  $(document).ready(function() {
    fillInfo();

    $('#1, #2, #3, #4, #5, #6, #7, #8, #9, #10').click(function() {
      let idDis = $('.disabled')[0] ? $('.disabled')[0].id : 0;
      $(`#${this.id}`).removeClass("visible");
      $(`#${this.id}`).addClass("disabled");
      $(`#${idDis}`).removeClass("disabled");
      reDrawInfo();
    });
    $('#selectWA').change(function() {
      reDrawInfo()
    });
  });
});

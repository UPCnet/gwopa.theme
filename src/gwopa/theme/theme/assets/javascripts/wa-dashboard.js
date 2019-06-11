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
        if (titles.length > 0 && values[0].data.length) {
          $('#graphicActivity').show();
          $('#graphicOutput').show();
          $('#noInfo').hide();
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
    // $.ajax({
    //   url: window.project_path + '/api-getCapacityChanges',
    //   method: 'GET',
    //   data: params,
    //   transport: function(params){
    //     params.beforeSend = function(request){
    //       request.setRequestHeader("Accept", "application/json");
    //     };
    //     return $.ajax(params);
    //   },
    //   success: function(resp) {
    //     resp = JSON.parse(resp);
    //     var specifics = resp[0];
    //     for (var i=0; i < specifics.length; i++) {
    //       $('#'+specifics[i].id).removeClass();
    //       $('#'+specifics[i].id).addClass("item basic " + specifics[i].selected_monitoring);
    //     }
    //     var others = resp[1];
    //     if (others.length > 0) {
    //       $('#others').show();
    //       $('.cuartafila').html('')
    //       for (var i=0; i < others.length; i++) {
    //         $('.cuartafila').append('<a id="' + others[i].id + '" class="item basic ' + others[i].selected_monitoring + '"><div class="item_image "><img alt="" title="" src="++theme++gwopa.theme/assets/images/w-others.png"></div><div class="item_text"><span>lalala</span></div></a>');
    //         $('#'+others[i].id).removeClass();
    //         $('#'+others[i].id).addClass("item basic " + others[i].selected_monitoring);
    //         $('#'+others[i].id).children('.item_text').children().text(others[i].title_specific);
    //       }
    //     }
    //     else {
    //       $('#others').hide();
    //     }
    //   }
    // });
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
    $.ajax({
      url: window.project_path + '/api-getCapacityChanges',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        resp = JSON.parse(resp);
        var specifics = resp[0];
        for (var i=0; i < specifics.length; i++) {
          if (specifics[i].selected_monitoring == 'notset') {
            $('#'+specifics[i].id+' > div > img').attr("src", specifics[i].icon_basic);
          }
          else {
            $('#'+specifics[i].id+' > div > img').attr("src", specifics[i].icon_url_selected);
          }
          $('#'+specifics[i].id).removeClass();
          $('#'+specifics[i].id).addClass("item basic " + specifics[i].selected_monitoring);
        }
        var others = resp[1];
        if (others.length > 0) {
          $('#others').show();
          $('.cuartafila').html('')
          for (var i=0; i < others.length; i++) {
            $('.cuartafila').append('<a id="' + others[i].id + '" class="item basic ' + others[i].selected_monitoring + '"><div class="item_image "><img alt="" title="" src="++theme++gwopa.theme/assets/images/w-others.png"></div><div class="item_text"><span>lalala</span></div></a>');
            if (others[i].selected_monitoring == 'notset') {
              $('#'+others[i].id+' > div > img').attr("src", others[i].icon_basic);
            }
            else {
              $('#'+others[i].id+' > div > img').attr("src", others[i].icon_url_selected);
            }
            $('#'+others[i].id).removeClass();
            $('#'+others[i].id).addClass("item basic " + others[i].selected_monitoring);
            $('#'+others[i].id).children('.item_text').children().text(others[i].title_specific);
          }
        }
        else {
          $('#others').hide();
        }
      }
    });
    $.ajax({
      url: window.project_path + '/api-getCurrentStage',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        for (var i=0; i < resp.length; i++) {
          $('#'+resp[i].id).removeClass();
          $('#'+resp[i].id).addClass(resp[i].state);
        }
      }
    });
  }

  $(document).ready(function() {
    fillInfo();

    // habilitar/deshabilitar ProjectYear en dashboard
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

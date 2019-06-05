require([
  'expect',
  'jquery'
], function(expect, $) {
  var cat = ['1.1 Capacity development program prepared',
               '1.2 Development of an improvemnet plan for sanitation, sewage and waste water treatment',
               '1.3 Capacity development program prepared',
               '1.4 Capacity development program prepared']

  String.prototype.trunc = String.prototype.trunc ||
    function(n){
      return (this.length > n) ? this.substr(0, n-1) + '...' : this;
    };
  for (var i=0; i < cat.length; i++) {
    cat[i] = cat[i].replace(cat[i], cat[i].trunc(40));
  }

  var optionsActivity = {
    chart: {
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
    series: [{ data: [80, 72, 64, 91], }],
    colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63'],
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
      categories: cat,
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
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return ''
          }
        }
      }
    }
  }

  var optionsOutput = {
    chart: {
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
    series: [{ data: [80, 72, 64, 91], }],
    colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63'],
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
      categories: cat,
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
      theme: 'dark',
      x: {
        show: false
      },
      y: {
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

  var chartOutput = new ApexCharts(document.querySelector("#chartOutput"), optionsOutput);
  chartOutput.render();

  $(document).ready(function() {
    //$('#selectWA').children("option:selected").val();
    $('.visible').click(function() {
      let idDis = $('.disabled')[0] ? $('.disabled')[0].id : 0;
      $(`#${this.id}`).removeClass("visible");
      $(`#${this.id}`).addClass("disabled");
      $(`#${idDis}`).removeClass("disabled");
      $(`#${idDis}`).addClass("visible");

    });
  });
});

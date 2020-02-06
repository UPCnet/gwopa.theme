require([
  'expect',
  'jquery'
], function(expect, $) {

    var url = window.location.href
    if (url.match('#')) {
        url = url.split('#')[0]
    }

    $.ajax({
        url: url + '/api-getBudgets',
        data: {'total': $('#totalBudget').attr('data-total')},
        method: 'GET',
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        success: function(resp) {
            var data = $.parseJSON(resp);

            var options = {
                series: data['water_operators']['series'],
                colors: data['water_operators']['colors'],
                chart: {
                    type: 'donut',
                    width: '100%',
                },
                legend: {
                    show: false,
                },
                dataLabels: {
                    enabled: false,
                },
                tooltip: {
                    enabled: false,
                },
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        donut: {
                            size: '50%',
                            labels: {
                                show: false,
                                name: {
                                    show: false
                                },
                                value: {
                                    show: false
                                },
                                total: {
                                    show: true,
                                    showAlways: false,
                                    label: 'Water Operators',
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a, b) => {
                                            return ''
                                        }, 0)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var chart = new ApexCharts(document.querySelector("#tabla1 #chartWaterOperators"), options);
            chart.render();
            chart = new ApexCharts(document.querySelector("#tabla8 #chartWaterOperators"), options);
            chart.render();

            options['series'] = data['donors']['series'];
            options['colors'] = data['donors']['colors'];

            chart = new ApexCharts(document.querySelector("#tabla1 #chartDonors"), options);
            chart.render();
            chart = new ApexCharts(document.querySelector("#tabla8 #chartDonors"), options);
            chart.render();

            options['series'] = data['other_organizations']['series'];
            options['colors'] = data['other_organizations']['colors'];

            chart = new ApexCharts(document.querySelector("#tabla1 #chartOtherOrganizations"), options);
            chart.render();
            chart = new ApexCharts(document.querySelector("#tabla8 #chartOtherOrganizations"), options);
            chart.render();
        }
    });
});


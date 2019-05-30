require([
  'expect',
  'jquery'
], function(expect, $) {
    $("#map-platform").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectWOPPlatform',
        dataType: 'json',
        quietMillis: 250,
        cache: true,
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        results: function (data) {
          var res = [];
          var len = data.length;
          for (var i=0; i<len; i++) {
            res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
          }
          return { results: res };
        }
      },
    });
    $("#map-program").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectWOPProgram',
        dataType: 'json',
        quietMillis: 250,
        cache: true,
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        results: function (data) {
          var res = [];
          var len = data.length;
          for (var i=0; i<len; i++) {
            res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
          }
          return { results: res };
        }
      },
    });
    $("#map-status").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectStatus',
        dataType: 'json',
        quietMillis: 250,
        cache: true,
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        results: function (data) {
          var res = [];
          var len = data.length;
          for (var i=0; i<len; i++) {
            res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
          }
          return { results: res };
        }
      },
    });
    $("#map-country").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectCountry',
        dataType: 'json',
        quietMillis: 250,
        cache: true,
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        results: function (data) {
          var res = [];
          var len = data.length;
          for (var i=0; i<len; i++) {
            res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
          }
          return { results: res };
        }
      },
    });
    $("#map-partner").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectPartners',
        dataType: 'json',
        quietMillis: 250,
        cache: true,
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        results: function (data) {
          var res = [];
          var len = data.length;
          for (var i=0; i<len; i++) {
            res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
          }
          return { results: res };
        }
      },
    });
    $("#map-area").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectWorkingArea',
        dataType: 'json',
        quietMillis: 250,
        cache: true,
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        results: function (data) {
          var res = [];
          var len = data.length;
          for (var i=0; i<len; i++) {
            res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
          }
          return { results: res };
        }
      },
    });
    $(".js-range-slider").ionRangeSlider({
          type: "double",
          skin: "sharp",
          grid: false,
          min: 0,
          max: 1000,
          from: 200,
          to: 800,
          step: 100
    });
    $("#updateMapValues").click(function(e){
      e.preventDefault();
      var params = {};
      params.area = document.getElementById("map-area").value;
      params.year= document.getElementById("map-area").value;
      // params.obstacles = "";
      // temp = [];
      // var idSelect2Obs = '#s2id_' + e.target.classList[0] + '-output-obs';
      // $(idSelect2Obs).select2('data').map(obj => temp.push(obj.id));
      // params.obstacles = temp.join(',');

      // params.contributing = "";
      // temp = [];
      // var idSelect2Contrib = '#s2id_' + e.target.classList[0] + '-output-contrib';
      // $(idSelect2Contrib).select2('data').map(obj => temp.push(obj.id));
      // params.contributing = temp.join(',');

      // params.consideration = $(id + 'consideration').val();
      // params.limiting = $(id + 'limiting').val();
      // if (params.progress || params.explanation || params.consideration || params.limiting) {
      //   params.updated = true;
      // } else {
      //   params.updated = false;
      // }
      // url = window.location.href;
      // project_path = url.substring(0, url.lastIndexOf("/monitoring"))
      // $.ajax({
      //   url: project_path + '/updateElement',
      //   method: 'POST',
      //   data: params,
      //   success: function(resp)
      //     { if(resp) {location.reload();}}
      //   });
    });

});

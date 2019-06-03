require([
  'expect',
  'jquery'
], function(expect, $) {
  // Target Value editabble field
  $('.editable').editable({
     inputclass: function(e, f) {
       $("a[aria-describedby=" + $(this).closest(".ui-tooltip").prop("id") + "]").data("shared", this);
     },
     validate: function(value) {
       if (!value) return 'Required value';
     },
  });

  $("[id$='-updateActivityMonitoring']").click(function(e){
    e.preventDefault();
    var id = '#' + e.target.classList[0] + "-";
    var params = {};
    params.item_type = 'Activity';
    params.year = $('#year').html();
    params.path = $(id + 'path').html();
    params.progress = $(id + 'progress').val();
    params.explanation = $(id + 'explanation').val();

    params.obstacles = "";
    temp = [];
    var idSelect2Obs = '#s2id_' + e.target.classList[0] + '-activity-obs';
    $(idSelect2Obs).select2('data').map(obj => temp.push(obj.id));
    params.obstacles = temp.join(',');

    params.contributing = "";
    temp = [];
    var idSelect2Contrib = '#s2id_' + e.target.classList[0] + '-activity-contrib';
    $(idSelect2Contrib).select2('data').map(obj => temp.push(obj.id));
    params.contributing = temp.join(',');

    params.consideration = $(id + 'consideration').val();
    params.limiting = $(id + 'limiting').val();
    if (params.progress || params.explanation || params.consideration || params.limiting) {
      params.updated = true;
    } else {
      params.updated = false;
    }
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/monitoring"));
    $.ajax({
      url: project_path + '/updateElement',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {location.reload();}}
    });
  });

  $("[id$='-updateOutputMonitoring']").click(function(e){
    e.preventDefault();
    var id = '#' + e.target.classList[0] + "-";
    var params = {};
    params.item_type = 'Output';
    params.year = $('#year').html();
    params.path = $(id + 'path').html();
    params.progress = $(id + 'progress').val();
    params.explanation = $(id + 'explanation').val();

    params.obstacles = "";
    temp = [];
    var idSelect2Obs = '#s2id_' + e.target.classList[0] + '-output-obs';
    $(idSelect2Obs).select2('data').map(obj => temp.push(obj.id));
    params.obstacles = temp.join(',');

    params.contributing = "";
    temp = [];
    var idSelect2Contrib = '#s2id_' + e.target.classList[0] + '-output-contrib';
    $(idSelect2Contrib).select2('data').map(obj => temp.push(obj.id));
    params.contributing = temp.join(',');

    params.consideration = $(id + 'consideration').val();
    params.limiting = $(id + 'limiting').val();
    if (params.progress || params.explanation || params.consideration || params.limiting) {
      params.updated = true;
    } else {
      params.updated = false;
    }
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/monitoring"))
    $.ajax({
      url: project_path + '/updateElement',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {location.reload();}}
      });
  });

  $("[id$='-updateKPIMonitoring']").click(function(e){
    e.preventDefault();
    var id = '#' + e.target.classList[0] + "-";
    var params = {};
    params.item_type = 'Output';
    params.year = $('#year').html();
    params.path = $(id + 'path').html();
    params.progress = $(id + 'progress').val();
    params.explanation = $(id + 'explanation').val();

    params.obstacles = "";
    temp = [];
    var idSelect2Obs = '#s2id_' + e.target.classList[0] + '-kpi-obs';
    $(idSelect2Obs).select2('data').map(obj => temp.push(obj.id));
    params.obstacles = temp.join(',');

    params.contributing = "";
    temp = [];
    var idSelect2Contrib = '#s2id_' + e.target.classList[0] + '-kpi-contrib';
    $(idSelect2Contrib).select2('data').map(obj => temp.push(obj.id));
    params.contributing = temp.join(',');

    params.consideration = $(id + 'consideration').val();
    params.limiting = $(id + 'limiting').val();
    if (params.progress || params.explanation || params.consideration || params.limiting) {
      params.updated = true;
    } else {
      params.updated = false;
    }
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/monitoring"))
    $.ajax({
      url: project_path + '/updateElement',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {location.reload();}}
      });
    });

  $("[id$='-activity-obs']").select2({
    dropdownParent: $('#updateKPI'),
    multiple: true,
    ajax: {
      url: 'api-getMainObstacles',
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
    initSelection: function(element, callback) {
      var savedData = $(element).val().split(',');
      var preSelected = [];
      for (i=0; i<savedData.length; i++) {
        preSelected = preSelected.concat({id: savedData[i], text: savedData[i]});
      }
      $(element).select2('data', preSelected);
      $(element).trigger('change');
    },
  });
  $("[id$='-activity-contrib']").select2({
    dropdownParent: $('#updateKPI'),
    multiple: true,
    ajax: {
      url: 'api-getMainContributing',
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
    initSelection: function(element, callback) {
      var savedData = $(element).val().split(',');
      var preSelected = [];
      for (i=0; i<savedData.length; i++) {
        preSelected = preSelected.concat({id: savedData[i], text: savedData[i]});
      }
      $(element).select2('data', preSelected);
      $(element).trigger('change');
    },
  });
  $("[id$='-output-obs']").select2({
    dropdownParent: $('#updateKPI'),
    multiple: true,
    ajax: {
      url: 'api-getMainObstacles',
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
    initSelection: function(element, callback) {
      var savedData = $(element).val().split(',');
      var preSelected = [];
      for (i=0; i<savedData.length; i++) {
        preSelected = preSelected.concat({id: savedData[i], text: savedData[i]});
      }
      $(element).select2('data', preSelected);
      $(element).trigger('change');
    },
  });
  $("[id$='-output-contrib']").select2({
    dropdownParent: $('#updateKPI'),
    multiple: true,
    ajax: {
      url: 'api-getMainContributing',
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
    initSelection: function(element, callback) {
      var savedData = $(element).val().split(',');
      var preSelected = [];
      for (i=0; i<savedData.length; i++) {
        preSelected = preSelected.concat({id: savedData[i], text: savedData[i]});
      }
      $(element).select2('data', preSelected);
      $(element).trigger('change');
    },
  });
  $("[id$='-kpi-obs']").select2({
    dropdownParent: $('#updateKPI'),
    multiple: true,
    ajax: {
      url: 'api-getMainObstacles',
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
    initSelection: function(element, callback) {
      var savedData = $(element).val().split(',');
      var preSelected = [];
      for (i=0; i<savedData.length; i++) {
        preSelected = preSelected.concat({id: savedData[i], text: savedData[i]});
      }
      $(element).select2('data', preSelected);
      $(element).trigger('change');
    },
  });
  $("[id$='-kpi-contrib']").select2({
    dropdownParent: $('#updateKPI'),
    multiple: true,
    ajax: {
      url: 'api-getMainContributing',
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
    initSelection: function(element, callback) {
      var savedData = $(element).val().split(',');
      var preSelected = [];
      for (i=0; i<savedData.length; i++) {
        preSelected = preSelected.concat({id: savedData[i], text: savedData[i]});
      }
      $(element).select2('data', preSelected);
      $(element).trigger('change');
    },
  });

  $("[id$='-addObstacleActivity']").click(function () {
    $("[id$='-addObstaclesActivity']").show();
    $(this).hide();
  });
  $("[id$='-addContributingActivity']").click(function () {
    $("[id$='-addContributingsActivity']").show();
    $(this).hide();
  });
  $("[id$='-addObstacleOutput']").click(function () {
    $("[id$='-addObstaclesOutput']").show();
    $(this).hide();
  });
  $("[id$='-addContributingOutput']").click(function () {
    $("[id$='-addContributingsOutput']").show();
    $(this).hide();
  });
  $("[id$='-addObstacleKPI']").click(function () {
    $("[id$='-addObstaclesKPI']").show();
    $(this).hide();
  });
  $("[id$='-addContributingKPI']").click(function () {
    $("[id$='-addContributingsKPI']").show();
    $(this).hide();
  });

  // Add Main Obstacles title
  $("[id$='-add-obs']").keypress(function(e){
    if(e.which == 13) {
      var params = {};
      params.item_title = e.target.value
      var url = window.location.href;
      var project_path = url.substring(0, url.lastIndexOf("/monitoring"))
      $.ajax({
        url: project_path + '/addMainObstaclesTitle',
        method: 'POST',
        data: params,
        success: function(resp)
          {
            if(resp) {
              swal("Added", "The obstacle title has been added", "success", {
                buttons: false,
                timer: 4000,
              })
            }
          }
      });
    }
  });
  // Add Main Obstacles title
  $("[id$='-add-contrib']").keypress(function(e){
    if(e.which == 13) {
      var params = {};
      params.item_title = e.target.value
      var url = window.location.href;
      var project_path = url.substring(0, url.lastIndexOf("/monitoring"))
      $.ajax({
        url: project_path + '/addMainContributingTitle',
        method: 'POST',
        data: params,
        success: function(resp)
          {
            if(resp) {
              swal("Added", "The contributing factor title has been added", "success", {
                buttons: false,
                timer: 4000,
              })
            }
          }
      });
    }
  });

  $(document).ready(function() {
    $(".monitoring_info").hide();
    $(".cc_container").hide();
    $(".cc_container_others").hide();

    $('.expandWaMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandWaMo').show();
      $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').slideDown();
    });

    $('.notexpandWaMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandWaMo').show();
      $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').slideUp();
    });

    $('.expandActMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandActMo').show();
      $(this).parent().parent().parent().nextAll('.tabla_cuerpo').slideDown();
    });

    $('.notexpandActMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandActMo').show();
      $(this).parent().parent().parent().nextAll('.tabla_cuerpo').slideUp();
    });

    $('.expandOutMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandOutMo').show();
      $(this).parent().parent().parent().nextAll('.tabla_cuerpo').slideDown();
    });

    $('.notexpandOutMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandOutMo').show();
      $(this).parent().parent().parent().nextAll('.tabla_cuerpo').slideUp();
    });

    $('.expandPerMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandPerMo').show();
      $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').slideDown();
    });

    $('.notexpandPerMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandPerMo').show();
      $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').slideUp();
    });

    $('.expandKPIMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandKPIMo').show();
      $(this).parent().parent().parent().nextAll('.tabla_cuerpo').slideDown();
    });

    $('.notexpandKPIMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandKPIMo').show();
      $(this).parent().parent().parent().nextAll('.tabla_cuerpo').slideUp();
    });

    $('.expandCapMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandCapMo').show();
      $(this).parent().parent().parent().parent().next().slideDown();
    });

    $('.notexpandCapMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandCapMo').show();
      $(this).parent().parent().parent().parent().next().slideUp();
    });

    $('.expandccs').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandccs').show();
      $(this).parent().parent().parent().find('.cc_container').slideDown();
      $(this).parent().parent().parent().find('.cc_container_others').slideDown();
    });

    $('.notexpandccs').click(function() {
      $(this).hide();
      $(this).parent().find('.expandccs').show();
      $(this).parent().parent().parent().find('.cc_container').slideUp();
      $(this).parent().parent().parent().find('.cc_container_others').slideUp();
    });

  });
});
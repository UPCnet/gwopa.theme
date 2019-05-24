require([
  'expect',
  'jquery'
], function(expect, $) {

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

  $("[id$='-activity-obs").select2({
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
  $("[id$='-activity-contrib").select2({
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
  $("[id$='-output-obs").select2({
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
  $("[id$='-output-contrib").select2({
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
  $("[id$='-kpi-obs").select2({
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
  $("[id$='-kpi-contrib").select2({
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

  $("[id$='-addObstacleActivity").click(function () {
    $("[id$='-addObstaclesActivity").show();
    $(this).hide();
  });
  $("[id$='-addContributingActivity").click(function () {
    $("[id$='-addContributingsActivity").show();
    $(this).hide();
  });
  $("[id$='-addObstacleOutput").click(function () {
    $("[id$='-addObstaclesOutput").show();
    $(this).hide();
  });
  $("[id$='-addContributingOutput").click(function () {
    $("[id$='-addContributingsOutput").show();
    $(this).hide();
  });
  $("[id$='-addObstacleKPI").click(function () {
    $("[id$='-addObstaclesKPI").show();
    $(this).hide();
  });
  $("[id$='-addContributingKPI").click(function () {
    $("[id$='-addContributingsKPI").show();
    $(this).hide();
  });

  // Add Main Obstacles title
  $("[id$='-add-obs").keypress(function(e){
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
  $("[id$='-add-contrib").keypress(function(e){
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
    $(".tabla_cuerpo").hide();
    $("#collapseAllProjectTab").hide();
    $("#collapseAllOutcomeTab").hide();
    $("#expandAllProjectTab").hide();
    $("#expandAllOutcomeTab").hide();


    $("#expandAllOutcomeTab").click(function(){
      $(".tabla_cuerpo").slideDown()
      $(".expandWA").parent().parent().parent().slideDown();
      $(".expandWA").hide();
      $(".collapseWA").show();
      $("#expandAllOutcomeTab").hide();
      $("#collapseAllOutcomeTab").show();
    })

    $("#collapseAllOutcomeTab").click(function(){
      $(".tabla_cuerpo").slideUp()
      $(".collapseWA").slideUp();
      $(".collapseWA").hide();
      $(".expandWA").show();
      $("#expandAllOutcomeTab").show();
      $("#collapseAllOutcomeTab").hide();
    })

    $(".expMoWA").on('click', function(e) {
      if (e.target.classList[0] == "colMoWA") {
        $(this).parent().parent().parent().parent().parent().parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "expMoWA");
      }
      else {
        $(this).parent().parent().parent().parent().parent().parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "colMoWA");
      }
    });

    $(".expMoUP").on('click', function(e) {
      if (e.target.classList[0] == "colMoUP") {
        $(this).parent().parent().parent().parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "expMoUP");
      }
      else {
        $(this).parent().parent().parent().parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "colMoUP");
      }
    });

    $(".expMoAct").on('click', function(e) {
      if (e.target.classList[1] == "colMoAct") {
        $(this).parent().parent().parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "titulocatplan expMoAct");
      }
      else {
        $(this).parent().parent().parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "titulocatplan colMoAct");
      }
    });

    $(".expMoOut").on('click', function(e) {
      if (e.target.classList[1] == "colMoOut") {
        $(this).parent().parent().parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "titulocatplan expMoOut");
      }
      else {
        $(this).parent().parent().parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "titulocatplan colMoOut");
      }
    });

    $(".expMoUPItem").on('click', function(e) {
      if (e.target.classList[1] == "colMoUPItem") {
        $(this).parent().parent().parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "titulocatplan expMoUPItem");
      }
      else {
        $(this).parent().parent().parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "titulocatplan colMoUPItem");
      }
    });

    $(".expandWA").on('click', function(e) {
      if (e.target.classList[2] == "collapseWA") {
        $(this).parent().parent().parent().parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandWA");
      }
      else {
        $(this).parent().parent().parent().parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseWA");
      }
    });

    $(".expandAct").on('click', function(e) {
      if (e.target.classList[2] == "collapseAct") {
        $(this).parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandAct");
      }
      else {
        $(this).parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseAct");
      }
    });

    $(".expandOut").on('click', function(e) {
      if (e.target.classList[2] == "collapseOut") {
        $(this).parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandOut");
      }
      else {
        $(this).parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseOut");
      }
    });

    $(".expandUP").on('click', function(e) {
      if (e.target.classList[2] == "collapseUP") {
        $(this).parent().parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandUP");
      }
      else {
        $(this).parent().parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseUP");
      }
    });

    $(".expandOutcome").on('click', function(e) {
      if (e.target.classList[2] == "collapseOutcome") {
        $(this).parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandOutcome");
      }
      else {
        $(this).parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseOutcome");
      }
    });
  });
});

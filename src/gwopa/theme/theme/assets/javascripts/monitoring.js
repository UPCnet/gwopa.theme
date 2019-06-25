require([
  'expect',
  'jquery'
], function(expect, $) {
  // Target Value editabble field
  $('#myTab a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
  });

  // store the currently selected tab in the hash value
  $("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
    var id = $(e.target).attr("href").substr(1);
    window.location.hash = id;
  });

  // on load of the page: switch to the currently selected tab
  var hash = window.location.hash;
  $('#myTab a[href="' + hash + '"]').tab('show');


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
    dropdownParent: $('#modalEditOutcomeCCS'),
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
  $("#outcomeccs-obstacles").select2({
    dropdownParent: $('#modalEditOutcomeCCS'),
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
  $("#outcomeccs-contributing_factors").select2({
    dropdownParent: $('#modalEditOutcomeCCS'),
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

  $("#outcomeccs-contributed_project").select2({
      dropdownParent: $('#modalEditOutcomeCCS'),
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getContributed',
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

  $("#outcomeccs-consensus").select2({
      dropdownParent: $('#modalEditOutcomeCCS'),
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getConsensus',
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
  $("[id$='-addObstacleOutcomeCC']").click(function () {
    $("[id$='-addObstaclesOutcomeCC']").show();
    $(this).hide();
  });
  $("[id$='-addContributingOutcomeCC']").click(function () {
    $("[id$='-addContributingsOutcomeCC']").show();
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
              swal("Added", "Obstacle Title has been added", "success", {
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
              swal("Added", "Contributing factor Title has been added", "success", {
                buttons: false,
                timer: 4000,
              })
            }
          }
      });
    }
  });

  $("#outcomeccs-degree_changes").select2({
        dropdownParent: $('#modalEditOutcomeCCS'),
        maximumSelectionSize: 1,
        ajax: {
          url: 'api-getDegree',
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


  // editOutcomeCCS
  $("a.editOutcomeCCS").click(function() {
    var myValYear = $(this).data('pk');
    var myValUrl = $(this).data('urloutcomeccs');
    var myValId = $(this).data('id_specific');
    var myValTitle = $(this).data('title_specific');
    var myValDescription = $(this).data('description');
    var myValBaseValue = $(this).data('base-value');
    var myValBaseDate = $(this).data('base-date');
    var myValObjective = $(this).data('objective');
    var myValObjectiveDate = $(this).data('objective-date');
    var myValDegree = $(this).data('degree-changes');
    var myValContributedProject = $(this).data('contributed-project');
    var myValContributing = $(this).data('contributing-factors');
    var myValObstacles= $(this).data('obstacles');
    var myValConsensus = $(this).data('consensus');
    var myValExplain = $(this).data('explain');
    var myValSelectedMonitoring = $(this).data('selected-monitoring');
    var myValIdCapacity = $(this).data('id-capacity');
    $('#modalEditOutcomeCCS').find(".modal-pk").text(myValYear);
    $('#modalEditOutcomeCCS').find(".modal-url").text(myValUrl);
    $('#modalEditOutcomeCCS').find(".modal-id").text(myValId);
    $('#modalEditOutcomeCCS').find(".modal-title").text(myValTitle);
    $('#modalEditOutcomeCCS').find(".modal-idCapacity").text(myValIdCapacity);
    $('#modalEditOutcomeCCS').find("#outcomeccs-description").text(myValDescription);
    $('#modalEditOutcomeCCS').find("#outcomeccs-baseline").val(myValBaseValue);
    $('#modalEditOutcomeCCS').find("#outcomeccs-baseline_date").prop('value', myValBaseDate)
    $('#modalEditOutcomeCCS').find("#outcomeccs-objective").val(myValObjective);
    $('#modalEditOutcomeCCS').find("#outcomeccs-objective_date").prop('value', myValObjectiveDate);
    $('#modalEditOutcomeCCS').find("#outcomeccs-degree_changes").select2('data',{id: myValDegree, text: myValDegree});
    $('#modalEditOutcomeCCS').find("#outcomeccs-contributed_project").select2('data',{id: myValContributedProject, text: myValContributedProject});

    if (myValContributing != ''){
      var data = myValContributing.split(',').map(function(e){
        return {'id': e, 'text': e};
      });
      $('#modalEditOutcomeCCS').find("#outcomeccs-contributing_factors").select2('data', data);
    }else{
      $('#modalEditOutcomeCCS').find("#outcomeccs-contributing_factors").select2('data', '');
    }

    if (myValObstacles != ''){
      var data = myValObstacles.split(',').map(function(e){
        return {'id': e, 'text': e};
      });
      $('#modalEditOutcomeCCS').find("#outcomeccs-obstacles").select2('data', data);
    }else{
      $('#modalEditOutcomeCCS').find("#outcomeccs-obstacles").select2('data', '');
    }
    $('#modalEditOutcomeCCS').find("#outcomeccs-consensus").select2('data',{id: myValConsensus, text: myValConsensus});
    $('#modalEditOutcomeCCS').find("#outcomeccs-explain").val(myValExplain);
    $('#modalEditOutcomeCCS').find("#outcomeccs-selected_monitoring").val(myValSelectedMonitoring);
  });

    // addOutcomeCCS
  $("a.addOutcomeCCS").click(function() {
    var myValYear = $(this).data('pk');
    var myValUrl = $(this).data('urloutcomeccs');
    $('#modalEditOutcomeCCS').find(".modal-pk").text(myValYear);
    $('#modalEditOutcomeCCS').find(".modal-url").text(myValUrl);
  });

     // addOutcomeCCS
  $("[id$='-update-stage']").click(function() {
    var myValYear = $(this).data('pk');
    var myValUrl = $(this).data('urloutcomeccs');
    var myValStage = $(this).data('stage');
    var myIdCapacity = $(this).data('id-capacity');
    $('#modalUpdateStage').find(".modal-pk").text(myValYear);
    $('#modalUpdateStage').find(".modal-url").text(myValUrl);
    $('#modalUpdateStage').find(".modal-stage").text(myValStage);
    $('#modalUpdateStage').find(".modal-idCapacity").text(myIdCapacity);
    $("#checkstage"+myValStage).prop('checked', true);
  });

 // Validate fields Output
  function validateFormOutcomeCCS() {
    if ($('#outcomeccs-degree_changes').val() == "") {
      swal("Please fill in the required fields", "Title is missing", "warning");
      return false;
    }
    else {
      return true;
    }
  }

    // Update Outcomeccs Specific
  $('#updateOutcomeCCSFromModal').click(function(e){
    if (validateFormOutcomeCCS()) {
      e.preventDefault();
      var params = {};
      params.description = $('#outcomeccs-description').val()
      params.baseline = $('#outcomeccs-baseline').val()
      params.baseline_date = $('#outcomeccs-baseline_date').val()
      params.objective = $('#outcomeccs-objective').val()
      params.objective_date = $('#outcomeccs-objective_date').val()
      params.degree_changes = $('#outcomeccs-degree_changes').val()
      params.contributed_project = $('#outcomeccs-contributed_project').val()
      params.contributing_factors = $('#outcomeccs-contributing_factors').val()
      params.consensus = $('#outcomeccs-consensus').val()
      params.explain = $('#outcomeccs-explain').val()
      params.selected_monitoring = $('#outcomeccs-selected_monitoring').val()
      params.item_path = $('#OutcomeCCSPath').html()
      params.year = $('#OutcomeCCSYear').html()
      params.id_specific = $('#idSpecific').html()
      params.id_capacity = $('#idCapacity').html();

      params.obstacles = "";
      temp = [];
      $('#outcomeccs-obstacles').select2('data').map(obj => temp.push(obj.id));
      params.obstacles = temp.join(',');

      url = window.location.href;
      project_path = url.substring(0, url.lastIndexOf("/monitoring"))
      $.ajax({
        url: project_path + '/updateOutcomeCCSMonitoring',
        method: 'POST',
        data: params,
        success: function(resp)
          { if(resp) {
            outcome = $("#" + params.id_capacity + " a[data-id_specific='" + params.id_specific + "']");
            outcome.addClass("selected");
            img = outcome.find("img");
            img.attr("src", img.attr("data-selected"));
            var degree_values = {'-2': 'verybad', '-1': 'bad', '0': 'equal', '1': 'good', '2': 'verygood'}
            icon = outcome.find("i");
            icon.css("display", "block");
            icon.removeClass("verybad");
            icon.removeClass("bad");
            icon.removeClass("equal");
            icon.removeClass("good");
            icon.removeClass("verygood");
            var degree_changes = degree_values[params.degree_changes.split(" ")[0]]
            icon.addClass(degree_changes);
            outcome.data("degree-changes", params.degree_changes);
            outcome.data("contributed-project", params.contributed_project);
            outcome.data("contributing-factors", params.contributing_factors);
            outcome.data("consensus", params.consensus);
            outcome.data("explain", params.explain);
            outcome.data("selected-monitoring", params.selected_monitoring);
            outcome.data("obstacles", params.obstacles);
          }}
      });
    }
    else{
      return false;
    }
  });



 // Add Outcomeccs Specific
  $('#addOutcomeCCSMonitoringFromModal').click(function(e){
    e.preventDefault();
    var params = {};
    params.item_title = $('#outcomeccs-title').val()
    params.item_path = $('#OutcomeCCSPath').html()
    params.year = $('#OutcomeCCSYear').html()
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/monitoring"))
    $.ajax({
      url: project_path + '/addOutcomeCCSMonitoring',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {location.reload();}}
    });
  });

   // Update Stage OutcomeCC Monitoring
  $('#updateStageMonitoringFromModal').click(function(e){
    e.preventDefault();
    var params = {};
    params.item_path = $('#OutcomeCCSPathStage').html()
    params.year = $('#OutcomeCCSYearStage').html();
    params.stage = $('#StageRadio input[name=radio]:checked').val();
    params.id_capacity = $('#idCapacityStage').html();
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/monitoring"));
    $.ajax({
      url: project_path + '/updateStageMonitoring',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {
         /* outcome = $(".stages #" + params.id_capacity + '-update-stage').find("li");
          var stage = params.stage;
          $(".stages #" + params.id_capacity + '-update-stage').data("stage", stage);
          stage = stage - 1;
          for (var i=0; i<outcome.length; i++){
            $(outcome[i]).removeClass('past');
            $(outcome[i]).removeClass('current');
            $(outcome[i]).removeClass('future');

            if (i < stage){
              $(outcome[i]).addClass('past');
            }else{
              if (i == stage){
                $(outcome[i]).addClass('current');
              }else{
                $(outcome[i]).addClass('future');
              }
            }
          }*/
          location.reload();
        }}
    });
  });

  $(document).ready(function() {
    $(".monitoring_info").hide();
    $(".cc_container").hide();
    $(".cc_container_others").hide();
    $(".stages").hide();

    $('.expandWaMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandWaMo').show();
      $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').show();
    });

    $('.notexpandWaMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandWaMo').show();
      $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').hide();
    });

    $('.expandActMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandActMo').show();
      $(this).parent().parent().parent().nextAll("[id$='-expandA']").show();
    });

    $('.notexpandActMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandActMo').show();
      $(this).parent().parent().parent().nextAll("[id$='-expandA']").hide();
    });

    $('.expandOutMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandOutMo').show();
      $(this).parent().parent().parent().nextAll("[id$='-expandO']").show();
    });

    $('.notexpandOutMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandOutMo').show();
      $(this).parent().parent().parent().nextAll("[id$='-expandO']").hide();
    });

    $('.expandPerMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandPerMo').show();
      $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').show();
    });

    $('.notexpandPerMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandPerMo').show();
      $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').hide();
    });

    $('.expandKPIMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandKPIMo').show();
      $(this).parent().parent().parent().nextAll('.tabla_cuerpo').show();
    });

    $('.notexpandKPIMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandKPIMo').show();
      $(this).parent().parent().parent().nextAll('.tabla_cuerpo').hide();
    });

    $('.expandCapMo').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandCapMo').show();
      $(this).parent().parent().parent().parent().nextAll().show();
    });

    $('.notexpandCapMo').click(function() {
      $(this).hide();
      $(this).parent().find('.expandCapMo').show();
      $(this).parent().parent().parent().parent().nextAll().hide();
    });

    $('.expandccs').click(function() {
      $(this).hide();
      $(this).parent().find('.notexpandccs').show();
      $(this).parent().parent().parent().find('.stages').show();
      $(this).parent().parent().parent().find('.cc_container').show();
      $(this).parent().parent().parent().find('.cc_container_others').show();
    });

    $('.notexpandccs').click(function() {
      $(this).hide();
      $(this).parent().find('.expandccs').show();
      $(this).parent().parent().parent().find('.stages').hide();
      $(this).parent().parent().parent().find('.cc_container').hide();
      $(this).parent().parent().parent().find('.cc_container_others').hide();
    });

  });
});

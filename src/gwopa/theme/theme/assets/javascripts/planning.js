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

  // $.fn.editable.defaults.mode = 'inline';
  let counter = 1;
  // Target Value editabble field
  $('.editable').editable({
     inputclass: function(e, f) {
       $("a[aria-describedby=" + $(this).closest(".ui-tooltip").prop("id") + "]").data("shared", this);
     },
     validate: function(value) {
       if (!value) {
        var userLang = $("html").prop("lang");
        if(userLang == 'es') {
          var msg = 'Valor requerido';
        }else if(userLang == 'fr'){
          var msg = 'Required value';
        }else{
          var msg = 'Required value';
        }
        return msg;
       }
     },
  });
  // Click on close & cancel clears fields
  // On output, we need to reload, to get again the date values
  $(".close.output, .button-cancel.output").click(function() {
    location.reload();
  });
  // On the other modals, reload is not needed
  $(".close, .button-cancel").click(function() {
    $("#toClearActivity").trigger('reset');
    $("#toClearOutput").trigger('reset');
    $("#toClearKPI").trigger('reset');
    $("#toClearKPIZone").trigger('reset');
    $('.toDelete').remove();
    $("#s2id_act-responsible").val(null).trigger('change');
    counter = 1;
  });
  // AfegirActivity
  $("a.afegirActivity").click(function() {
    var path = window.location.pathname.split('/')
    path.splice(-1,1)
    path = path.join('/')
    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      var placeholder = 'Buscar usuarios';
    }else if(userLang == 'fr'){
      var placeholder = 'Search Users';
    }else{
      var placeholder = 'Search Users';
    }
    $("#modalActivity #act-responsible").select2({
      placeholder: placeholder,
      multiple: true,
      ajax: {
        url: path + "/api-select2-users.json",
        delay: 250,
        results: function (data, page) {
          return data;
        },
      },
    });

    var myVal = $(this).data('val');
    var myValStart = $(this).data('start');
    var myValEnd = $(this).data('end');
      $('#modalActivity').find(".modal-url").text(myVal);
      $('#modalActivity').find(".modal-start").text(myValStart);
      $('#modalActivity').find(".modal-end").text(myValEnd);
  });
  // AfegirOutput (custom datepicker)
  $("a.afegirOutput").click(function() {
    var myVal = $(this).data('val');
    var myValStart = $(this).data('start');
    var myValEnd = $(this).data('end');
      $('#modalOutput').find(".modal-url").text(myVal);
      $('#modalOutput').find(".modal-start").text(myValStart);
      $('#modalOutput').find(".modal-end").text(myValEnd);
      $('#out-datetimepicker').pickadate({
        min: new Date(myValStart),
        max: new Date(myValEnd),
        clear: '',
        close: '',
        today: '',
        selectYears: true,
        selectMonths: true,
        klass: {
          input: 'picker__input__datetime',
        },
      })
      /*$("#out-title").select2({
        dropdownParent: $('#modalOutput'),
        maximumSelectionSize: 1,
        ajax: {
          url: 'api-getOutputs',
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
      });*/
      $("#out-unit").select2({
        dropdownParent: $('#modalOutput'),
        maximumSelectionSize: 1,
        ajax: {
          url: 'api-getUnits',
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
              res = res.concat({ id: data[i]["id"], text: data[i]["name"] });
            }
            return { results: res };
          }
        },
      });
    fetch('api-getPhases')
    .then(function(response) { return response.json();})
    .then(function(data) {
        let end_date = data[0].gwopa_year_phases[0].end;
        let userLang = $("html").prop("lang");
        if(userLang == 'es') {
          $('#target-date-1').html('<span class="projectYear">Fin del año del proyecto 1</span> (' + end_date + ')');
        }else if(userLang == 'fr'){
          $('#target-date-1').html('<span class="projectYear">End Project Year 1</span> (' + end_date + ')');
        }else{
          $('#target-date-1').html('<span class="projectYear">End Project Year 1</span> (' + end_date + ')');
        }
    });
  });
  // afegirKPI ZONE
  $("a.afegirKPIZone").click(function() {
    var path = window.location.pathname.split('/')
    path.splice(-1,1)
    path = path.join('/')
    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      var placeholder = 'Buscar usuarios';
    }else if(userLang == 'fr'){
      var placeholder = 'Search Users';
    }else{
      var placeholder = 'Search Users';
    }
    $("#modalKPIZone #kpizone-responsible").select2({
      placeholder: placeholder,
      multiple: true,
      ajax: {
        url: path + "/api-select2-users.json",
        delay: 250,
        results: function (data, page) {
          return data;
        },
      },
    });

    var myVal = $(this).data('val');
    var myValStart = $(this).data('start');
    var myValEnd = $(this).data('end');
    var myValFrequency = $(this).data('frequency');
      $('#modalKPIZone').find(".modal-url").text(myVal);
      $('#modalKPIZone').find(".modal-start").text(myValStart);
      $('#modalKPIZone').find(".modal-end").text(myValEnd);
      $('#modalKPIZone').find(".modal-frequency").text(myValFrequency);
      $("#kpizone-title").select2({
        dropdownParent: $('#modalKPIZone'),
        maximumSelectionSize: 1,
        ajax: {
          url: 'api-getOutcomes',
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
              res = res.concat({ id: data[i]["id"], text: data[i]["name"] });
            }
            return { results: res };
          }
        },
      });
      $("#kpizone-unit").select2({
        dropdownParent: $('#modalKPIZone'),
        maximumSelectionSize: 1,
        ajax: {
          url: 'api-getUnits',
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
              res = res.concat({ id: data[i]["id"], text: data[i]["name"] });
            }
            return { results: res };
          }
        },
      });
    fetch('api-getPhases')
    .then(function(response) { return response.json();})
    .then(function(data) {
        let end_date = data[0].gwopa_year_phases[0].end;
        let userLang = $("html").prop("lang");
        if(userLang == 'es') {
          $('#kpizone-target-date-1').html('<span class="projectYear">Fin del año del proyecto 1</span> (' + end_date + ')');
        }else if(userLang == 'fr'){
          $('#kpizone-target-date-1').html('<span class="projectYear">End Project Year 1</span> (' + end_date + ')');
        }else{
          $('#kpizone-target-date-1').html('<span class="projectYear">End Project Year 1</span> (' + end_date + ')');
        }
    });
  });
  // editOutcomeCC
  $("a.editOutcomeCC").click(function() {
    var myValYear = $(this).data('pk');
    var myValUrl = $(this).data('urloutcomecc');
    var myValDescription = $(this).data('description');
    var myValBaseValue = $(this).data('base-value');
    var myValBaseDate = $(this).data('base-date');
    var myValObjective = $(this).data('objective');
    var myValObjectiveDate = $(this).data('objective-date');
    var myValIdCapacity = $(this).data('id-capacity');
    $('#modalEditOutcomeCC').find(".modal-pk").text(myValYear);
    $('#modalEditOutcomeCC').find(".modal-url").text(myValUrl);
    $('#modalEditOutcomeCC').find(".modal-idCapacity").text(myValIdCapacity);
    $('#modalEditOutcomeCC').find("#outcomecc-description").text(myValDescription);
    $('#modalEditOutcomeCC').find("#outcomecc-baseline").val(myValBaseValue);
    $('#modalEditOutcomeCC').find("#outcomecc-baseline_date + .pattern-pickadate-wrapper input").prop('value', myValBaseDate);
    $('#modalEditOutcomeCC').find("#outcomecc-baseline_date + .pattern-pickadate-wrapper div[aria-label='" + myValBaseDate + "']").trigger("click");
    $('#modalEditOutcomeCC').find("#outcomecc-baseline_date + .pattern-pickadate-wrapper input").change();
    $('#modalEditOutcomeCC').find("#outcomecc-objective").val(myValObjective);
    $('#modalEditOutcomeCC').find("#outcomecc-objective_date + .pattern-pickadate-wrapper input").prop('value', myValObjectiveDate);
    $('#modalEditOutcomeCC').find("#outcomecc-objective_date + .pattern-pickadate-wrapper div[aria-label='" + myValObjectiveDate + "']").trigger("click");
    $('#modalEditOutcomeCC').find("#outcomecc-objective_date + .pattern-pickadate-wrapper input").change();
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
    var myValIdCapacity = $(this).data('id-capacity');
    $('#modalEditOutcomeCCS').find(".modal-pk").text(myValYear);
    $('#modalEditOutcomeCCS').find(".modal-url").text(myValUrl);
    $('#modalEditOutcomeCCS').find(".modal-id").text(myValId);
    $('#modalEditOutcomeCCS').find(".modal-title").text(myValTitle);
    $('#modalEditOutcomeCCS').find(".modal-idCapacityCCS").text(myValIdCapacity);
    $('#modalEditOutcomeCCS').find("#outcomeccs-description").text(myValDescription);
    $('#modalEditOutcomeCCS').find("#outcomeccs-baseline").val(myValBaseValue);
    $('#modalEditOutcomeCCS').find("#outcomeccs-baseline_date + .pattern-pickadate-wrapper input").prop('value', myValBaseDate);
    $('#modalEditOutcomeCCS').find("#outcomeccs-baseline_date + .pattern-pickadate-wrapper div[aria-label='" + myValBaseDate + "']").trigger("click");
    $('#modalEditOutcomeCCS').find("#outcomeccs-baseline_date + .pattern-pickadate-wrapper input").change();
    $('#modalEditOutcomeCCS').find("#outcomeccs-objective").val(myValObjective);
    $('#modalEditOutcomeCCS').find("#outcomeccs-objective_date + .pattern-pickadate-wrapper input").prop('value', myValObjectiveDate);
    $('#modalEditOutcomeCCS').find("#outcomeccs-objective_date + .pattern-pickadate-wrapper div[aria-label='" + myValObjectiveDate + "']").trigger("click");
    $('#modalEditOutcomeCCS').find("#outcomeccs-objective_date + .pattern-pickadate-wrapper input").change();
  });
    // editOutcomeCCS
  $("a.addOutcomeCCS").click(function() {
    var myValYear = $(this).data('pk');
    var myValUrl = $(this).data('urloutcomeccs');
    $('#modalEditOutcomeCCS').find(".modal-pk").text(myValYear);
    $('#modalEditOutcomeCCS').find(".modal-url").text(myValUrl);
  });

  $("#modalEditOutput #out-unit").select2({
      dropdownParent: $('#modalEditOutput'),
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getUnits',
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
            res = res.concat({ id: data[i]["id"], text: data[i]["name"] });
          }
          return { results: res };
        }
      },
  });

  // editOutput
  $("a.editOutput").click(function() {
    var path = window.location.pathname.split('/');
    path.splice(-1,1);
    path = path.join('/');
    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      var placeholder = 'Buscar usuarios';
    }else if(userLang == 'fr'){
      var placeholder = 'Search Users';
    }else{
      var placeholder = 'Search Users';
    }
    $("#modalEditOutput #out-responsible").select2({
      placeholder: placeholder,
      multiple: true,
      ajax: {
        url: path + "/api-select2-users.json",
        delay: 250,
        results: function (data, page) {
          return data;
        },
      },
    });

    var myValYear = $(this).data('pk');
    var myValUrl = $(this).data('urloutput');
    var myValTitle = $(this).data('title');
    var myValDescription = $(this).data('description');
    var myValStart = $(this).data('start');
    var myValEnd = $(this).data('end');
    var myValLimitStart = $(this).data('limit-start');
    var myValLimitEnd = $(this).data('limit-end');
    var myValTargetValue = $(this).data('target-value-planned');
    var myValUnit = $(this).data('unit');
    var myValUnitText = $(this).data('unit-text');
    var myValResponsible = $(this).data('responsible');
    var myValResponsibleID = $(this).data('responsible-id');
    var myValMeans = $(this).data('means');
    /*var myValRisks = $(this).data('risks');*/
    $('#modalEditOutput').find(".modal-pk").text(myValYear);
    $('#modalEditOutput').find(".modal-url").text(myValUrl);
    $('#modalEditOutput').find(".modal-title").text('Edit ' + myValTitle);
    $('#modalEditOutput').find("#out-title").val(myValTitle);
    $('#modalEditOutput').find(".modal-start").text(myValStart);
    $('#modalEditOutput').find(".modal-end").text(myValEnd);
    $('#modalEditOutput').find("#out-description").text(myValDescription);
    $('#modalEditOutput').find("#out-unit").select2('data',{id: myValUnit, text: myValUnitText});
    $('#modalEditOutput').find("#out-datetimepicker + .pattern-pickadate-wrapper input").prop('value', myValEnd);
    $('#modalEditOutput').find("#out-datetimepicker + .pattern-pickadate-wrapper div[aria-label='" + myValEnd + "']").trigger("click");
    $('#modalEditOutput').find("#out-datetimepicker + .pattern-pickadate-wrapper input").change();
    $('#modalEditOutput').find("#target-value-1").val(myValTargetValue);
    $('#modalEditOutput').find("#out-means").val(myValMeans);
    /*$('#modalEditOutput').find("#out-risks").val(myValRisks);*/

    if (myValResponsible != '' && myValResponsible.length > 0 && myValResponsibleID != '' && myValResponsibleID.length > 0){
      var responseVal = myValResponsible.replace(/'/g,'').replace('[', '').replace(']', '').split(', ');
      var responsibleIDVal = myValResponsibleID.replace(/'/g,'').replace('[', '').replace(']', '').split(', ');
      var data = [];
      for (var i=0; i<responseVal.length; i++){
        data.push({'id': responsibleIDVal[i], 'text': responseVal[i]});
      }
      $('#modalEditOutput').find("#out-responsible").select2('data', data);
    }else{
      $('#modalEditOutput').find("#out-responsible").select2('data', '');
    }

    fetch('api-getPhases')
     .then(function(response) { return response.json();})
     .then(function(data) {
         let end_date = data[0].gwopa_year_phases[0].end;
         let year = $(".block-nav .pagination li.disabled").data("project-year");
         $('#modalEditOutput #target-date-1').html('<span class="projectYear">Project Year ' + year + '</span> - ' + end_date);
     });

  });

  // Update Output
  $('#updateOutputFromModal').click(function(e){
    e.preventDefault();
    var params = {};
    params.title = $('#modalEditOutput #out-title').val();
    params.description = $('#modalEditOutput #out-description').val();
    params.unit = $('#modalEditOutput  #out-unit').val();
    params.completation_date = $('#modalEditOutput  #out-datetimepicker + .pattern-pickadate-wrapper input').val();
    params.target_value = $('#modalEditOutput  #target-value-1').val();
    params.means = $('#modalEditOutput  #out-means').val();
    /*params.risks = $('#modalEditOutput  #out-risks').val();*/
    params.responsible = $('#modalEditOutput #out-responsible').val();
    params.item_path = $('#modalEditOutput  #OutputPath').html();
    params.year = $('#modalEditOutput  #OutputYear').html();
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/planning"));
    $.ajax({
      url: project_path + '/updateOutput',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {
            location.reload();
        }}
    });
  });



  $("#modalEditKPIZone #kpizone-unit").select2({
      dropdownParent: $('#modalEditKPIZone'),
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getUnits',
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
            res = res.concat({ id: data[i]["id"], text: data[i]["name"] });
          }
          return { results: res };
        }
      },
    });

  // editKPIZone
  $("a.editKPIZone").click(function() {
    var path = window.location.pathname.split('/');
    path.splice(-1,1);
    path = path.join('/');
    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      var placeholder = 'Buscar usuarios';
    }else if(userLang == 'fr'){
      var placeholder = 'Search Users';
    }else{
      var placeholder = 'Search Users';
    }
    $("#modalEditKPIZone #kpizone-responsible").select2({
      placeholder: placeholder,
      multiple: true,
      ajax: {
        url: path + "/api-select2-users.json",
        delay: 250,
        results: function (data, page) {
          return data;
        },
      },
    });

    var myValYear = $(this).data('pk');
    var myValUrl = $(this).data('urlkpi');
    var myValTitle = $(this).data('title');
    var myValDescription = $(this).data('description');
    var myValStart = $(this).data('start');
    var myValEnd = $(this).data('end');
    var myValTargetValue = $(this).data('target-value-planned');
    var myValUnit = $(this).data('unit');
    var myValUnitText = $(this).data('unit-text');
    var myValResponsible = $(this).data('responsible');
    var myValResponsibleID = $(this).data('responsible-id');
    var myValZone = $(this).data('zone');
    var myValMeans = $(this).data('means');
    /*var myValRisks = $(this).data('risks');*/
    var myValBaseValue = $(this).data('base-value');
    var myValBaseDate = $(this).data('base-date');
    $('#modalEditKPIZone').find(".modal-pk").text(myValYear);
    $('#modalEditKPIZone').find(".modal-url").text(myValUrl);
    $('#modalEditKPIZone').find(".modal-title").text('Edit ' + myValTitle);
    $('#modalEditKPIZone').find("#kpizone-title").val(myValTitle);
    $('#modalEditKPIZone').find(".modal-start").text(myValStart);
    $('#modalEditKPIZone').find(".modal-end").text(myValEnd);
    $('#modalEditKPIZone').find("#kpizone-description").text(myValDescription);
    $('#modalEditKPIZone').find("#kpizone-zone").val(myValZone);
    $('#modalEditKPIZone').find("#kpizone-unit").select2('data',{id: myValUnit, text: myValUnitText});
    $('#modalEditKPIZone').find("#kpizone-baseline").val(myValBaseValue);
    $('#modalEditKPIZone').find("#kpizone-datetimepicker + .pattern-pickadate-wrapper input").prop('value', myValBaseDate);
    $('#modalEditKPIZone').find("#kpizone-datetimepicker + .pattern-pickadate-wrapper div[aria-label='" + myValBaseDate + "']").trigger("click");
    $('#modalEditKPIZone').find("#kpizone-datetimepicker + .pattern-pickadate-wrapper input").change();
    $('#modalEditKPIZone').find("#kpizone-target-value-1").val(myValTargetValue);
    $('#modalEditKPIZone').find("#kpizone-means").val(myValMeans);
    /*$('#modalEditKPIZone').find("#kpizone-risks").val(myValRisks);*/

    if (myValResponsible != '' && myValResponsible.length > 0 && myValResponsibleID != '' && myValResponsibleID.length > 0){
      var responseVal = myValResponsible.replace(/'/g,'').replace('[', '').replace(']', '').split(', ');
      var responsibleIDVal = myValResponsibleID.replace(/'/g,'').replace('[', '').replace(']', '').split(', ');
      var data = [];
      for (var i=0; i<responseVal.length; i++){
        data.push({'id': responsibleIDVal[i], 'text': responseVal[i]});
      }
      $('#modalEditKPIZone').find("#kpizone-responsible").select2('data', data);
    }else{
      $('#modalEditKPIZone').find("#kpizone-responsible").select2('data', '');
    }
    fetch('api-getPhases')
     .then(function(response) { return response.json();})
     .then(function(data) {
        let end_date = data[0].gwopa_year_phases[0].end;
        let year = $(".block-nav .pagination li.disabled").data("project-year");
        let userLang = $("html").prop("lang");
        if(userLang == 'es') {
          $('#modalEditKPIZone #kpizone-target-date-1').html('<span class="projectYear">Fin del año del proyecto ' + year + '</span> (' + end_date + ')');
        }else if(userLang == 'fr'){
          $('#modalEditKPIZone #kpizone-target-date-1').html('<span class="projectYear">End Project Year ' + year + '</span> (' + end_date + ')');
        }else{
          $('#modalEditKPIZone #kpizone-target-date-1').html('<span class="projectYear">End Project Year ' + year + '</span> (' + end_date + ')');
        }
     });


  });

    // Update KPIZone
  $('#updateKPIZoneFromModal').click(function(e){
    e.preventDefault();
    var params = {};
    params.zone = $('#modalEditKPIZone #kpizone-zone').val();
    params.responsible = $('#modalEditKPIZone #kpizone-responsible').val();
    params.description = $('#modalEditKPIZone #kpizone-description').val();
    params.base_value = $('#modalEditKPIZone #kpizone-baseline').val();
    params.base_date = $('#modalEditKPIZone #kpizone-datetimepicker + .pattern-pickadate-wrapper input').val();
    params.unit = $('#modalEditKPIZone #kpizone-unit').val();
    params.target_value = $('#modalEditKPIZone #kpizone-target-value-1').val();
    params.means = $('#modalEditKPIZone #kpizone-means').val();
    /*params.risks = $('#modalEditKPIZone #kpizone-risks').val();*/
    params.item_path = $('#modalEditKPIZone #KPIZonePath').html();
    params.year = $('#modalEditKPIZone #KPIZoneYear').html();
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/planning"));
    $.ajax({
      url: project_path + '/updateKPIZone',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {
            location.reload();
        }}
    });
  });

  // Validate fields Activity
  function validateFormActivity() {
    start_date = $('#act-start').val();
    end_date = $('#act-end').val();
    start = Date.parse(start_date);
    end = Date.parse(end_date);

    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      if (start>end) {
        swal("Por favor proporcione fechas válidas", 'La fecha de inicio debe comenzar antes de la fecha de finalización', "warning");
        return false;
      }
      else if ($('#act-title').val() == "") {
        swal("Por favor llene los campos requeridos", 'Falta el título', "warning");
        return false;
      }
      else if ($('#act-start').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la fecha de inicio', 'warning');
        return false;
      }
      else if ($('#act-end').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la fecha de finalización', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else if(userLang == 'fr'){
      if (start>end) {
        swal("Please provide valid dates", 'Start date must begin before Completion date', "warning");
        return false;
      }
      else if ($('#act-title').val() == "") {
        swal("Please fill in the required fields", 'Title is missing', "warning");
        return false;
      }
      else if ($('#act-start').val() == "") {
        swal('Please fill in the required fields', 'Starting date is missing', 'warning');
        return false;
      }
      else if ($('#act-end').val() == "") {
        swal('Please fill in the required fields', 'Completion date is missing', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else{
      if (start>end) {
        swal("Please provide valid dates", 'Start date must begin before Completion date', "warning");
        return false;
      }
      else if ($('#act-title').val() == "") {
        swal("Please fill in the required fields", 'Title is missing', "warning");
        return false;
      }
      else if ($('#act-start').val() == "") {
        swal('Please fill in the required fields', 'Starting date is missing', 'warning');
        return false;
      }
      else if ($('#act-end').val() == "") {
        swal('Please fill in the required fields', 'Completion date is missing', 'warning');
        return false;
      }
      else {
        return true;
      }
    }
  }
  // Validate fields Output
  function validateFormOutput() {

    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      if ($('#out-title').val() == "") {
        swal("Por favor llene los campos requeridos", "Falta el título", "warning");
        return false;
      }
      else if ($('#out-datetimepicker').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la fecha de finalización', 'warning');
        return false;
      }
      else if ($('#out-unit').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la unidad de medida', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else if(userLang == 'fr'){
      if ($('#out-title').val() == "") {
        swal("Please fill in the required fields", "Title is missing", "warning");
        return false;
      }
      else if ($('#out-datetimepicker').val() == "") {
        swal('Please fill in the required fields', 'Completion date is missing', 'warning');
        return false;
      }
      else if ($('#out-unit').val() == "") {
        swal('Please fill in the required fields', 'Measuring unit is missing', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else{
      if ($('#out-title').val() == "") {
        swal("Please fill in the required fields", "Title is missing", "warning");
        return false;
      }
      else if ($('#out-datetimepicker').val() == "") {
        swal('Please fill in the required fields', 'Completion date is missing', 'warning');
        return false;
      }
      else if ($('#out-unit').val() == "") {
        swal('Please fill in the required fields', 'Measuring unit is missing', 'warning');
        return false;
      }
      else {
        return true;
      }
    }
  }
  // Validate fields KPI
  function validateFormKPI() {

    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      if ($('#kpi-title').val() == "") {
        swal('Por favor llene los campos requeridos', "Falta el título", "warning");
        return false;
      }
      else if ($('#kpi-baseline').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta el valor de referencia', 'warning');
        return false;
      }
      else if ($('#kpi-datetimepicker').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la fecha de referencia', 'warning');
        return false;
      }
      else if ($('#kpi-unit').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la unidad de medida', 'warning');
        return false;
      }
      else if ($('#kpi-frequency').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la frecuencia de medición', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else if(userLang == 'fr'){
      if ($('#kpi-title').val() == "") {
        swal('Please fill in the required fields', "Title is missing", "warning");
        return false;
      }
      else if ($('#kpi-baseline').val() == "") {
        swal('Please fill in the required fields', 'Baseline value is missing', 'warning');
        return false;
      }
      else if ($('#kpi-datetimepicker').val() == "") {
        swal('Please fill in the required fields', 'Baseline date is missing', 'warning');
        return false;
      }
      else if ($('#kpi-unit').val() == "") {
        swal('Please fill in the required fields', 'Measuring unit is missing', 'warning');
        return false;
      }
      else if ($('#kpi-frequency').val() == "") {
        swal('Please fill in the required fields', 'The measuring frequency is missing', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else{
      if ($('#kpi-title').val() == "") {
        swal('Please fill in the required fields', "Title is missing", "warning");
        return false;
      }
      else if ($('#kpi-baseline').val() == "") {
        swal('Please fill in the required fields', 'Baseline value is missing', 'warning');
        return false;
      }
      else if ($('#kpi-datetimepicker').val() == "") {
        swal('Please fill in the required fields', 'Baseline date is missing', 'warning');
        return false;
      }
      else if ($('#kpi-unit').val() == "") {
        swal('Please fill in the required fields', 'Measuring unit is missing', 'warning');
        return false;
      }
      else if ($('#kpi-frequency').val() == "") {
        swal('Please fill in the required fields', 'The measuring frequency is missing', 'warning');
        return false;
      }
      else {
        return true;
      }
    }

  }
  // Validate fields KPIZone
  function validateFormKPIZone() {

    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      if ($('#kpizone-title').val() == "") {
        swal('Por favor llene los campos requeridos', "Falta el título", "warning");
        return false;
      }
      else if ($('#kpizone-baseline').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta el valor de referencia', 'warning');
        return false;
      }
      else if ($('#kpizone-datetimepicker').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la fecha de referencia', 'warning');
        return false;
      }
      else if ($('#kpizone-unit').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la unidad de medida', 'warning');
        return false;
      }
      else if ($('#kpizone-frequency').val() == "") {
        swal('Por favor llene los campos requeridos', 'Falta la frecuencia de medición', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else if(userLang == 'fr'){
      if ($('#kpizone-title').val() == "") {
        swal('Please fill in the required fields', "Title is missing", "warning");
        return false;
      }
      else if ($('#kpizone-baseline').val() == "") {
        swal('Please fill in the required fields', 'Baseline value is missing', 'warning');
        return false;
      }
      else if ($('#kpizone-datetimepicker').val() == "") {
        swal('Please fill in the required fields', 'Baseline date is missing', 'warning');
        return false;
      }
      else if ($('#kpizone-unit').val() == "") {
        swal('Please fill in the required fields', 'Measuring unit is missing', 'warning');
        return false;
      }
      else if ($('#kpizone-frequency').val() == "") {
        swal('Please fill in the required fields', 'Measuring frequency is missing', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else{
      if ($('#kpizone-title').val() == "") {
        swal('Please fill in the required fields', "Title is missing", "warning");
        return false;
      }
      else if ($('#kpizone-baseline').val() == "") {
        swal('Please fill in the required fields', 'Baseline value is missing', 'warning');
        return false;
      }
      else if ($('#kpizone-datetimepicker').val() == "") {
        swal('Please fill in the required fields', 'Baseline date is missing', 'warning');
        return false;
      }
      else if ($('#kpizone-unit').val() == "") {
        swal('Please fill in the required fields', 'Measuring unit is missing', 'warning');
        return false;
      }
      else if ($('#kpizone-frequency').val() == "") {
        swal('Please fill in the required fields', 'Measuring frequency is missing', 'warning');
        return false;
      }
      else {
        return true;
      }
    }

  }
  // Create Activity
  $('#createActivityFromModal').click(function(e){
    if (validateFormActivity()) {
      e.preventDefault();
      var params = {};
      params.item_type = 'Activity';
      params.item_path = $('#ActivityPath').html();
      params.item_project_start = $('.modal-start').html();
      params.item_project_end = $('.modal-end').html();
      params.item_hidden_project_currency = $('#act-hidden-project-currency').html();
      params.item_title = $('#act-title').val();
      params.item_description = $('#act-description').val();
      params.item_initialdescription = $('#act-initialdescription').val();
      params.item_start = $('#act-start').val();
      params.item_end = $('#act-end').val();
      params.item_budget = $('#act-budget').val();
      /*params.item_risks = $('#act-risks').val();*/
      params.item_responsible = $('#act-responsible').val();
      url = window.location.href;
      project_path = url.substring(0, url.lastIndexOf("/planning"));
      $.ajax({
        url: project_path + '/createElement',
        method: 'POST',
        data: params,
        success: function(resp)
          { if(resp) {location.reload();}}
      });
    }
    else {
      return false;
    }
  });
  // Create Output
  $('#createOutputFromModal').click(function(e){
    if (validateFormOutput()) {
      e.preventDefault();
      var params = {};
      params.item_type = 'Output';
      params.item_path = $('#OutputPath').html();
      params.item_title = $('#out-title').val();
      params.item_description = $('#out-description').val();
      params.item_date = $('#out-datetimepicker').val();
      params.item_unit = $('#out-unit').val();
      params.item_means = $('#out-means').val();
      /*params.item_risks = $('#out-risks').val();*/
      params.item_responsible = $('#out-responsible').val();
      params.item_target1 = $('#target-value-1').val();
      params.item_target2 = $('#target-value-2').val();
      params.item_target3 = $('#target-value-3').val();
      params.item_target4 = $('#target-value-4').val();
      params.item_target5 = $('#target-value-5').val();
      params.item_target6 = $('#target-value-6').val();
      params.item_target7 = $('#target-value-7').val();
      params.item_target8 = $('#target-value-8').val();
      params.item_target9 = $('#target-value-9').val();
      params.item_target10 = $('#target-value-10').val();
      url = window.location.href;
      project_path = url.substring(0, url.lastIndexOf("/planning"));
      $.ajax({
        url: project_path + '/createElement',
        method: 'POST',
        data: params,
        success: function(resp)
          { if(resp) {location.reload();}}
      });
    }
    else {
      return false;
    }
  });
  // Create KPIZone
  $('#createKPIZoneFromModal').click(function(e){
    if (validateFormKPIZone()) {
      e.preventDefault();
      var params = {};
      params.item_type = 'OutcomeZONE';
      params.item_path = $('#KPIZonePath').html();
      params.item_title = $('#kpizone-title').val();
      params.item_description = $('#kpizone-description').val();
      params.item_baseline = $('#kpizone-baseline').val();
      params.item_date = $('#kpizone-datetimepicker').val();
      params.item_unit = $('#kpizone-unit').val();
      params.item_frequency = $('#kpizone-frequency').val();
      params.item_means = $('#kpizone-means').val();
      /*params.item_risks = $('#kpizone-risks').val();*/
      params.item_zone = $('#kpizone-zone').val();
      params.item_responsible = $('#kpizone-responsible').val();
      params.item_target1 = $('#kpizone-target-value-1').val();
      params.item_target2 = $('#kpizone-target-value-2').val();
      params.item_target3 = $('#kpizone-target-value-3').val();
      params.item_target4 = $('#kpizone-target-value-4').val();
      params.item_target5 = $('#kpizone-target-value-5').val();
      params.item_target6 = $('#kpizone-target-value-6').val();
      params.item_target7 = $('#kpizone-target-value-7').val();
      params.item_target8 = $('#kpizone-target-value-8').val();
      params.item_target9 = $('#kpizone-target-value-9').val();
      params.item_target10 = $('#kpizone-target-value-10').val();
      url = window.location.href;
      project_path = url.substring(0, url.lastIndexOf("/planning"));
      $.ajax({
        url: project_path + '/createElement',
        method: 'POST',
        data: params,
        success: function(resp)
          { if(resp) {location.reload();}}
      });
    }
    else {
      return false;
    }
  });
  // Add Output title
  $('#add-output').click(function(e) {
    var params = {};
    params.item_title = $('#new-output').val();
    var url = window.location.href;
    var project_path = url.substring(0, url.lastIndexOf("/planning"));
    $.ajax({
      url: project_path + '/addTitleOutput',
      method: 'POST',
      data: params,
      success: function(resp)
            {
              if(resp) {
                var userLang = $("html").prop("lang");
                if(userLang == 'es') {
                  swal("Añadido", "Se ha agregado el título de salida", "success", {
                    buttons: false,
                    timer: 2000,
                  });
                }else if(userLang == 'fr'){
                  swal("Added", "The Output Title has been added", "success", {
                    buttons: false,
                    timer: 2000,
                  });
                }else{
                  swal("Added", "The Output Title has been added", "success", {
                    buttons: false,
                    timer: 2000,
                  });
                }

                $("#addOutputTitle").show();
                $("#addBox").hide();
              }
            }
    });
  });
  // Add KPI title
  $('#add-KPI').click(function(e) {
    var params = {};
    params.item_title = $('#new-kpi').val();
    var url = window.location.href;
    var project_path = url.substring(0, url.lastIndexOf("/planning"));
    $.ajax({
      url: project_path + '/addTitleKPI',
      method: 'POST',
      data: params,
      success: function(resp)
            {
              if(resp) {
                var userLang = $("html").prop("lang");
                if(userLang == 'es') {
                  swal("Añadido", "Se ha agregado el título de KPI", "success", {
                    buttons: false,
                    timer: 2000,
                  });
                }else if(userLang == 'fr'){
                  swal("Added", "The KPI Title has been added", "success", {
                    buttons: false,
                    timer: 2000,
                  });
                }else{
                  swal("Added", "The KPI Title has been added", "success", {
                    buttons: false,
                    timer: 2000,
                  });
                }
                $("#addKPITitle").show();
                $("#kpiBox").hide();
              }
            }
    });
  });

  // Update Outcomecc Generic
  $('#updateOutcomeCCFromModal').click(function(e){
    e.preventDefault();
    var params = {};
    params.description = $('#outcomecc-description').val();
    params.baseline = $('#outcomecc-baseline').val();
    params.baseline_date = $('#outcomecc-baseline_date').val();
    params.objective = $('#outcomecc-objective').val();
    params.objective_date = $('#outcomecc-objective_date').val();
    params.item_path = $('#OutcomeCCPath').html();
    params.year = $('#OutcomeCCYear').html();
    params.id_capacity = $('#idCapacity').html();
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/planning"));
    $.ajax({
      url: project_path + '/updateOutcomeCC',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {
          outcome = $("#" + params.id_capacity + " a ");
          outcome.data("description", params.description);
          outcome.data("base-value", params.baseline);
          outcome.data("base-date", params.baseline_date);
          outcome.data("objective", params.objective);
          outcome.data("objective-date", params.objective_date);
        }}
    });
  });

  // Update Outcomeccs Specific
  $('#updateOutcomeCCSFromModal').click(function(e){
    e.preventDefault();
    var params = {};
    params.description = $('#outcomeccs-description').val();
    params.baseline = $('#outcomeccs-baseline').val();
    params.baseline_date = $('#outcomeccs-baseline_date').val();
    params.objective = $('#outcomeccs-objective').val();
    params.objective_date = $('#outcomeccs-objective_date').val();
    params.item_path = $('#OutcomeCCSPath').html();
    params.year = $('#OutcomeCCSYear').html();
    params.id_specific = $('#idSpecific').html();
    params.id_capacity = $('#idCapacityCCS').html();
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/planning"));
    $.ajax({
      url: project_path + '/updateOutcomeCCS',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {
          outcome = $("#" + params.id_capacity + " a[data-id_specific='" + params.id_specific + "']");
          outcome.addClass("selected");
          img = outcome.find("img");
          img.attr("src", img.attr("data-selected"));
          outcome.data("description", params.description);
          outcome.data("base-value", params.baseline);
          outcome.data("base-date", params.baseline_date);
          outcome.data("objective", params.objective);
          outcome.data("objective-date", params.objective_date);
        }}
    });
  });


 // Add Outcomeccs Specific
  $('#addOutcomeCCSFromModal').click(function(e){
    e.preventDefault();
    var params = {};
    params.item_title = $('#outcomeccs-title').val();
    params.item_title_es = $('#outcomeccs-title_es').val();
    params.item_title_fr = $('#outcomeccs-title_fr').val();
    if (params.item_title == '' || params.item_title_es == '' || params.item_title_fr == ''){
      if($("html").prop("lang") == 'es'){
        swal("Por favor llene los campos requeridos", "Falta el título", "warning");
      }else if(userLang == 'fr'){
        swal("Please fill in the required fields", "Title is missing", "warning");
      }else{
        swal("Please fill in the required fields", "Title is missing", "warning");
      }
      return false;
    }
    params.item_path = $('#OutcomeCCSPath').html();
    params.year = $('#OutcomeCCSYear').html();
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/planning"));
    $.ajax({
      url: project_path + '/addOutcomeCCS',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {location.reload();}}
    });
  });
  $(document).ready(function() {
    var path = window.location.pathname.split('/');
    path.splice(-1,1);
    path = path.join('/');
    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      var placeholder = 'Buscar usuarios';
    }else if(userLang == 'fr'){
      var placeholder = 'Search Users';
    }else{
      var placeholder = 'Search Users';
    }
    $("#modalOutput #out-responsible").select2({
      placeholder: placeholder,
      multiple: true,
      ajax: {
        url: path + "/api-select2-users.json",
        delay: 250,
        results: function (data, page) {
          return data;
        },
      },
    });

    let numPhases = $('#totalPhases').text();
    if (numPhases === "1") {
      $("#KPIaddTargetValueButton, #KPIZoneaddTargetValueButton").hide();
    }

    $("#addTargetValueButton, #KPIaddTargetValueButton, #KPIZoneaddTargetValueButton").click(function () {
      let idnum = counter + 1;
      let okAdd = true;
      let btnID = this.getAttribute('id');
      let userLang = $("html").prop("lang");
      if (btnID == 'addTargetValueButton'){
        let start = $("#modalOutput .modal-start").text();
        let end = $("#modalOutput .modal-end").text();
        // TODO Si se modifica el formato de fecha dejará de funcionar.
        let startYear = start.split('-')[0];
        let endYear = end.split('-')[0];
        let activityNumPhases = endYear - startYear;
        if (end.split('-')[1] > start.split('-')[1]){
          activityNumPhases = activityNumPhases + 1
        }
        if (end.split('-')[1] == start.split('-')[1] && end.split('-')[2] > start.split('-')[2]){
          activityNumPhases = activityNumPhases + 1
        }
        // ----------------------------------------------------------------------------------------

        if (counter >= activityNumPhases) {
          okAdd = false;
          if(userLang == 'es') {
            swal('¡No permitido!',
                 'Lo siento pero solo se aceptan ' + activityNumPhases + ' valores.',
                 'warning');
          }else if(userLang == 'fr'){
            swal('Not allowed!',
                 'Sorry, but only ' + activityNumPhases + ' target values are accepted.',
                 'warning');
          }else{
            swal('Not allowed!',
                 'Sorry, but only ' + activityNumPhases + ' target values are accepted.',
                 'warning');
          }
        }
      }else{
        if (counter >= numPhases) {
          okAdd = false;
          if(userLang == 'es') {
            swal('¡No permitido!',
                 'Lo siento pero solo se aceptan ' + activityNumPhases + ' valores.',
                 'warning');

          }else if(userLang == 'fr'){
            swal('Not allowed!',
                 'Lo siento pero solo ' + numPhases + ' target values are accepted.',
                 'warning');
          }else{
            swal('Not allowed!',
                 'Sorry, but only ' + numPhases + ' target values are accepted.',
                 'warning');
          }
        }
      }

      if (okAdd) {
        let newTextBoxDiv = $(document.createElement('div'));
        newTextBoxDiv.attr("id", 'TextBoxDiv' + idnum);
        newTextBoxDiv.attr("class", "toDelete" );
        newTextBoxDiv.after().html(
        '<div class="row"><div class="col-xs-6 col-md-6" style="margin-top:0px; padding-left:0px;">' +
        '<input type="text" class="form-control" id="target-value-' + idnum + '"/></div>' +
        '<div class="col-xs-6 col-md-6" style="margin:0px 0px 10px 0px; padding-right:0px;">' +
        '<p style="padding: 6px 12px;" id="target-date-' + idnum + '" ></p></div>');
        newTextBoxDiv.appendTo("#TextBoxesGroup");

        let newTextBoxDivKPI = $(document.createElement('div'));
        newTextBoxDivKPI.attr("id", 'KPITextBoxDiv' + idnum);
        newTextBoxDivKPI.attr("class", "toDelete" );
        newTextBoxDivKPI.after().html(
        '<div class="row"><div class="col-xs-6 col-md-6" style="margin-top:0px; padding-left:0px;">' +
        '<input type="text" class="form-control" id="kpi-target-value-' + idnum + '"/></div>' +
        '<div class="col-xs-6 col-md-6" style="margin:0px 0px 10px 0px; padding-right:0px;">' +
        '<p style="padding: 6px 12px;" id="kpi-target-date-' + idnum + '" ></p></div>');
        newTextBoxDivKPI.appendTo("#KPITextBoxesGroup");

        let newTextBoxDivKPIZone = $(document.createElement('div'));
        newTextBoxDivKPIZone.attr("id", 'KPIZoneTextBoxDiv' + idnum);
        newTextBoxDivKPIZone.attr("class", "toDelete" );
        newTextBoxDivKPIZone.after().html(
        '<div class="row"><div class="col-xs-6 col-md-6" style="margin-top:0px; padding-left:0px;">' +
        '<input type="text" class="form-control" id="kpizone-target-value-' + idnum + '"/></div>' +
        '<div class="col-xs-6 col-md-6" style="margin:0px 0px 10px 0px; padding-right:0px;">' +
        '<p style="padding: 6px 12px;" id="kpizone-target-date-' + idnum + '" ></p></div>');
        newTextBoxDivKPIZone.appendTo("#KPIZoneTextBoxesGroup");
      }
      fetch('api-getPhases')
      .then(function(response) { return response.json();})
      .then(function(data) {
          let project_year_num = $('.projectYear').length + 1;
          let userLang = $("html").prop("lang");
          if(userLang == 'es') {
            let project_year = 'Fin del año del proyecto ' + project_year_num
          }else if(userLang == 'fr'){
            let project_year = 'End Project Year ' + project_year_num
          }else{
            let project_year = 'End Project Year ' + project_year_num
          }
          let end_date = data[0].gwopa_year_phases[idnum-1].end;
          if (btnID == 'addTargetValueButton') {
            $('#target-date-' + (idnum) + '').html('<span class="projectYear">' + project_year + '</span> (' + end_date + ')');
          }
          if (btnID == 'KPIaddTargetValueButton') {
            $('#kpi-target-date-' + (idnum) + '').html('<span class="projectYear">' + project_year + '</span> (' + end_date + ')');
          }
          if (btnID == 'KPIZoneaddTargetValueButton') {
            $('#kpizone-target-date-' + (idnum) + '').html('<span class="projectYear">' + project_year + '</span> (' + end_date + ')');
          }

      });
      counter++;
    });
    // Delete element on click button
    $('.btn-delete').on('click', function(e) {
      e.preventDefault();
      item = $(this).attr('data-url');
      item_type = $(this).attr('data-type');
      item_title = $(this).attr('data-id');
      var params = {};
      params.item = item;
      var userLang = $("html").prop("lang");
      if(userLang == 'es') {
        var title = "Eliminar " + item_type + "?";
      }else if(userLang == 'fr'){
        var title = "Delete " + item_type + "?";
      }else{
        var title = "Delete " + item_type + "?";
      }
      swal({
        title: title,
        text: item_title,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        var userLang = $("html").prop("lang");
        if (willDelete) {
          url = window.location.href;
          project_path = url.substring(0, url.lastIndexOf("/planning"));
          $.ajax({
            url: project_path + '/removeElement',
            method: 'POST',
            data: params,
            success: function(resp)
                  {
                    if(resp) {
                      location.reload();
                      if(userLang == 'es') {
                        swal("Eliminado", "El item ha sido eliminado", "success", {
                          buttons: false,
                          timer: 2000,
                        });
                      }else if(userLang == 'fr'){
                        swal("Deleted", "The item has been deleted", "success", {
                          buttons: false,
                          timer: 2000,
                        });
                      }else{
                        swal("Deleted", "The item has been deleted", "success", {
                          buttons: false,
                          timer: 2000,
                        });
                      }
                    }
                  }
        })
        } else {
          if(userLang == 'es') {
            swal("Cancelado", "El proceso de borrado ha sido cancelado", "error", {
              buttons: false,
              timer: 1200,
            });
          }else if(userLang == 'fr'){
            swal("Cancelled", "The deleting process has been cancelled", "error", {
              buttons: false,
              timer: 1200,
            });
          }else{
            swal("Cancelled", "The deleting process has been cancelled", "error", {
              buttons: false,
              timer: 1200,
            });
          }
        }
      });
    });
    $("#addOutputTitle, addKPITitle").click(function () {
      $("#addBox").show();
      $(this).hide();
    });
    $("#addKPITitle").click(function () {
      $("#kpiBox").show();
      $(this).hide();
    });
  });

  $(".cc_container").hide();
  $(".cc_container_others").hide();

  $('.expandccs').click(function() {
    $(this).hide();
    $(this).parent().find('.notexpandccs').show();
    $(this).parent().parent().parent().find('.cc_container').show();
    $(this).parent().parent().parent().find('.cc_container_others').show();
  });

  $('.notexpandccs').click(function() {
    $(this).hide();
    $(this).parent().find('.expandccs').show();
    $(this).parent().parent().parent().find('.cc_container').hide();
    $(this).parent().parent().parent().find('.cc_container_others').hide();
  });

  $('.expandCapPla').click(function() {
    $(this).hide();
    $(this).parent().find('.notexpandCapPla').show();
    $(this).parent().parent().parent().parent().next().show();
  });

  $('.notexpandCapPla').click(function() {
    $(this).hide();
    $(this).parent().find('.expandCapPla').show();
    $(this).parent().parent().parent().parent().next().hide();
  });

  $('.expandPerPla').click(function() {
    $(this).hide();
    $(this).parent().find('.notexpandPerPla').show();
    $(this).parent().parent().parent().parent().next().show();
  });

  $('.notexpandPerPla').click(function() {
    $(this).hide();
    $(this).parent().find('.expandPerPla').show();
    $(this).parent().parent().parent().parent().next().hide();
  });

  $('.expandWaPla').click(function() {
    $(this).hide();
    $(this).parent().find('.notexpandWaPla').show();
    $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').show();
  });

  $('.notexpandWaPla').click(function() {
    $(this).hide();
    $(this).parent().find('.expandWaPla').show();
    $(this).parent().parent().parent().parent().nextAll('.tabla_cuerpo').hide();
  });
});

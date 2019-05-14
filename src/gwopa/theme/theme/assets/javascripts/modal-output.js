require([
  'expect',
  'jquery'
], function(expect, $) {
  // $.fn.editable.defaults.mode = 'inline';
  let counter = 1;
  // Target Value editabble field
  $('.editable').editable({
     inputclass: function(e, f) {
       $("a[aria-describedby=" + $(this).closest(".ui-tooltip").prop("id") + "]").data("shared", this);
     },
     validate: function(value) {
       if (!value) return 'Required value';
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
      $("#out-title").select2({
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
      });
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
              res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
            }
            return { results: res };
          }
        },
      });
      $("#out-frequency").select2({
        dropdownParent: $('#modalOutput'),
        maximumSelectionSize: 1,
        ajax: {
          url: 'api-getFrequency',
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
    fetch('api-getPhases')
    .then(function(response) { return response.json();})
    .then(function(data) {
        let end_date = data[0].gwopa_year_phases[0].end;
        $('#target-date-1').html(end_date);
    });
  });
  // afegirKPI
  $("a.afegirKPI").click(function() {
    var myVal = $(this).data('val');
    var myValStart = $(this).data('start');
    var myValEnd = $(this).data('end');
      $('#modalKPI').find(".modal-url").text(myVal);
      $('#modalKPI').find(".modal-start").text(myValStart);
      $('#modalKPI').find(".modal-end").text(myValEnd);
      $("#kpi-title").select2({
        dropdownParent: $('#modalKPI'),
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
              res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
            }
            return { results: res };
          }
        },
      });
      $("#kpi-unit").select2({
        dropdownParent: $('#modalKPI'),
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
              res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
            }
            return { results: res };
          }
        },
      });
      $("#kpi-frequency").select2({
        dropdownParent: $('#modalKPI'),
        maximumSelectionSize: 1,
        ajax: {
          url: 'api-getFrequency',
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
    fetch('api-getPhases')
    .then(function(response) { return response.json();})
    .then(function(data) {
        let end_date = data[0].gwopa_year_phases[0].end;
        $('#kpi-target-date-1').html(end_date);
    });
  });
  // afegirKPI ZONE
  $("a.afegirKPIZone").click(function() {
    var myVal = $(this).data('val');
    var myValStart = $(this).data('start');
    var myValEnd = $(this).data('end');
      $('#modalKPIZone').find(".modal-url").text(myVal);
      $('#modalKPIZone').find(".modal-start").text(myValStart);
      $('#modalKPIZone').find(".modal-end").text(myValEnd);
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
              res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
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
              res = res.concat({ id: data[i]["name"], text: data[i]["name"] });
            }
            return { results: res };
          }
        },
      });
      $("#kpizone-frequency").select2({
        dropdownParent: $('#modalKPIZone'),
        maximumSelectionSize: 1,
        ajax: {
          url: 'api-getFrequency',
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
    fetch('api-getPhases')
    .then(function(response) { return response.json();})
    .then(function(data) {
        let end_date = data[0].gwopa_year_phases[0].end;
        $('#kpizone-target-date-1').html(end_date);
    });
  });
  // Validate fields Activity
  function validateFormActivity() {
    start_date = $('#act-start').val()
    end_date = $('#act-end').val()
    start = Date.parse(start_date)
    end = Date.parse(end_date)

    if (start>end) {
      swal("Please provide valid dates", 'The start date must begin before the completion date', "warning");
      return false;
    }
    else if ($('#act-title').val() == "") {
      swal("Please fill in the required fields", 'The title field is missing', "warning");
      return false;
    }
    else if ($('#act-start').val() == "") {
      swal('Please fill in the required fields', 'The starting date field is missing', 'warning');
      return false;
    }
    else if ($('#act-end').val() == "") {
      swal('Please fill in the required fields', 'The completion date field is missing', 'warning');
      return false;
    }
    else {
      return true;
    }
  }
  // Validate fields Output
  function validateFormOutput() {
    if ($('#out-title').val() == "") {
      swal("Please fill in the required fields", "The title field is missing", "warning");
      return false;
    }
    else if ($('#out-datetimepicker').val() == "") {
      swal('Please fill in the required fields', 'The completion date field is missing', 'warning');
      return false;
    }
    else if ($('#out-unit').val() == "") {
      swal('Please fill in the required fields', 'The measuring unit field is missing', 'warning');
      return false;
    }
    else {
      return true;
    }
  }
  // Validate fields KPI
  function validateFormKPI() {
    if ($('#kpi-title').val() == "") {
      swal('Please fill in the required fields', "The title field is missing", "warning");
      return false;
    }
    else if ($('#kpi-baseline').val() == "") {
      swal('Please fill in the required fields', 'The baseline value is missing', 'warning');
      return false;
    }
    else if ($('#kpi-datetimepicker').val() == "") {
      swal('Please fill in the required fields', 'The Baseline date is missing', 'warning');
      return false;
    }
    else if ($('#kpi-unit').val() == "") {
      swal('Please fill in the required fields', 'The measuring unit field is missing', 'warning');
      return false;
    }
    else if ($('#kpi-frequency').val() == "") {
      swal('Please fill in the required fields', 'The measuring frequency field is missing', 'warning');
      return false;
    }
    else {
      return true;
    }
  }
  // Validate fields KPIZone
  function validateFormKPIZone() {
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
  // Create Activity
  $('#createActivityFromModal').click(function(e){
    if (validateFormActivity()) {
      e.preventDefault();
      var params = {};
      params.item_type = 'Activity'
      params.item_path = $('#ActivityPath').html()
      params.item_project_start = $('.modal-start').html()
      params.item_project_end = $('.modal-end').html()
      params.item_hidden_project_currency = $('#act-hidden-project-currency').html()
      params.item_title = $('#act-title').val()
      params.item_description = $('#act-description').val()
      params.item_initialdescription = $('#act-initialdescription').val()
      params.item_start = $('#act-start').val()
      params.item_end = $('#act-end').val()
      params.item_budget = $('#act-budget').val()
      params.item_risks = $('#act-risks').val()
      params.item_responsible = $('#act-responsible').val()
      url = window.location.href;
      project_path = url.substring(0, url.lastIndexOf("/planning"))
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
      params.item_type = 'Output'
      params.item_path = $('#OutputPath').html()
      params.item_title = $('#out-title').val()
      params.item_description = $('#out-description').val()
      params.item_date = $('#out-datetimepicker').val()
      params.item_unit = $('#out-unit').val()
      params.item_means = $('#out-means').val()
      params.item_risks = $('#out-risks').val()
      params.item_responsible = $('#out-responsible').val()
      params.item_target1 = $('#target-value-1').val()
      params.item_target2 = $('#target-value-2').val()
      params.item_target3 = $('#target-value-3').val()
      params.item_target4 = $('#target-value-4').val()
      params.item_target5 = $('#target-value-5').val()
      params.item_target6 = $('#target-value-6').val()
      params.item_target7 = $('#target-value-7').val()
      params.item_target8 = $('#target-value-8').val()
      params.item_target9 = $('#target-value-9').val()
      params.item_target10 = $('#target-value-10').val()
      url = window.location.href;
      project_path = url.substring(0, url.lastIndexOf("/planning"))
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
  // Create KPI
  $('#createKPIFromModal').click(function(e){
    if (validateFormKPI()) {
      e.preventDefault();
      var params = {};
      params.item_type = 'OutcomeKPI'
      params.item_path = $('#KPIPath').html()
      params.item_title = $('#kpi-title').val()
      params.item_description = $('#kpi-description').val()
      params.item_baseline = $('#kpi-baseline').val()
      params.item_date = $('#kpi-datetimepicker').val()
      params.item_unit = $('#kpi-unit').val()
      params.item_frequency = $('#kpi-frequency').val()
      params.item_means = $('#kpi-means').val()
      params.item_risks = $('#kpi-risks').val()
      params.item_responsible = $('#kpi-responsible').val()
      params.item_target1 = $('#kpitarget-value-1').val()
      params.item_target2 = $('#kpitarget-value-2').val()
      params.item_target3 = $('#kpitarget-value-3').val()
      params.item_target4 = $('#kpitarget-value-4').val()
      params.item_target5 = $('#kpitarget-value-5').val()
      params.item_target6 = $('#kpitarget-value-6').val()
      params.item_target7 = $('#kpitarget-value-7').val()
      params.item_target8 = $('#kpitarget-value-8').val()
      params.item_target9 = $('#kpitarget-value-9').val()
      params.item_target10 = $('#kpitarget-value-10').val()
      url = window.location.href;
      project_path = url.substring(0, url.lastIndexOf("/planning"))
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
      params.item_type = 'OutcomeZONE'
      params.item_path = $('#KPIZonePath').html()
      params.item_title = $('#kpizone-title').val()
      params.item_description = $('#kpizone-description').val()
      params.item_baseline = $('#kpizone-baseline').val()
      params.item_date = $('#kpizone-datetimepicker').val()
      params.item_unit = $('#kpizone-unit').val()
      params.item_frequency = $('#kpizone-frequency').val()
      params.item_means = $('#kpizone-means').val()
      params.item_risks = $('#kpizone-risks').val()
      params.item_zone = $('#kpizone-zone').val()
      params.item_responsible = $('#kpizone-responsible').val()
      params.item_target1 = $('#kpizonetarget-value-1').val()
      params.item_target2 = $('#kpizonetarget-value-2').val()
      params.item_target3 = $('#kpizonetarget-value-3').val()
      params.item_target4 = $('#kpizonetarget-value-4').val()
      params.item_target5 = $('#kpizonetarget-value-5').val()
      params.item_target6 = $('#kpizonetarget-value-6').val()
      params.item_target7 = $('#kpizonetarget-value-7').val()
      params.item_target8 = $('#kpizonetarget-value-8').val()
      params.item_target9 = $('#kpizonetarget-value-9').val()
      params.item_target10 = $('#kpizonetarget-value-10').val()
      url = window.location.href;
      project_path = url.substring(0, url.lastIndexOf("/planning"))
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

  $(document).ready(function() {
    $("#out-responsible").select2({
      placeholder: "Search Users",
      multiple: true,
      ajax: {
        url: window.location.pathname + "/api-select2-users.json",
        delay: 250,
        results: function (data, page) {
          return data;
        },
      },
    });

    let numPhases = $('#totalPhases').text();
    if (numPhases === "1") {
      $("#addTargetValueButton, #KPIaddTargetValueButton, #KPIZoneaddTargetValueButton").hide();
    }
    $("#addTargetValueButton, #KPIaddTargetValueButton, #KPIZoneaddTargetValueButton").click(function () {
      let idnum = counter + 1;
      if(counter>=numPhases){
        swal('Not allowed!',
             'Sorry, but only ' + numPhases + ' target values are accepted.',
             'warning');
      }
      else {
        let  newTextBoxDiv = $(document.createElement('div'));
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
          let end_date = data[0].gwopa_year_phases[idnum-1].end;
          $('#target-date-' + (idnum) + '').html(end_date);
          $('#kpi-target-date-' + (idnum) + '').html(end_date);
          $('#kpizone-target-date-' + (idnum) + '').html(end_date);
      });
      counter++;
    });
    // Delete element on click button
    $('.btn-delete').on('click', function(e) {
      e.preventDefault();
      item = $(this).attr('data-url')
      item_type = $(this).attr('data-type')
      item_title = $(this).attr('data-id')
      var params = {};
      params.item = item;
      swal({
        title: "Confirm delete " + item_type + "?",
        text: item_title,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          url = window.location.href;
          project_path = url.substring(0, url.lastIndexOf("/planning"))
          $.ajax({
            url: project_path + '/removeElement',
            method: 'POST',
            data: params,
            success: function(resp)
                  {
                    if(resp) {
                      location.reload();
                      swal("Deleted", "The item has been deleted", "success", {
                        buttons: false,
                        timer: 2000,
                      })
                    }
                  }
        })
        } else {
          swal("Cancelled", "The deleting process has been cancelled", "error", {
            buttons: false,
            timer: 1200,
          })
        }
      });
    });
  });

  $(".tabla_cuerpo").hide();
  $("#expandAllProjectTab").hide();
  $("#expandAllOutcomeTab").hide();

  $(".expandWA").on('click', function(e) {
    if (e.target.classList[2] == "collapseWA") {
      $(this).parent().parent().nextAll(".tabla_cuerpo").hide();
      var thisItem = $(this)[0].id;
      var selectorItem = '#' + thisItem;
      $(selectorItem).attr("class", "fas fa-chevron-up expandWA");
    }
    else {
      $(this).parent().parent().nextAll(".tabla_cuerpo").show();
      var thisItem = $(this)[0].id;
      var selectorItem = '#' + thisItem;
      $(selectorItem).attr("class", "fas fa-chevron-down collapseWA");
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

  $(".expandUC").on('click', function(e) {
    if (e.target.classList[2] == "collapseUC") {
      $(this).parent().parent().nextAll(".tabla_cuerpo").hide();
      var thisItem = $(this)[0].id;
      var selectorItem = '#' + thisItem;
      $(selectorItem).attr("class", "fas fa-chevron-up expandUC");
    }
    else {
      $(this).parent().parent().nextAll(".tabla_cuerpo").show();
      var thisItem = $(this)[0].id;
      var selectorItem = '#' + thisItem;
      $(selectorItem).attr("class", "fas fa-chevron-down collapseUC");
    }
  });

});

require([
  'expect',
  'jquery'
], function(expect, $) {
  // $.fn.editable.defaults.mode = 'inline';
  $('.editable').editable({
     inputclass: function(e, f) {
       $("a[aria-describedby=" + $(this).closest(".ui-tooltip").prop("id") + "]").data("shared", this);
     },
     validate: function(value) {
       if (!value) return 'Required value';
     },
     // success: function(){
     //       location.reload();
     // },
  });

  $(".close").click(function() {
    location.reload();
  });
  $(".button-cancel").click(function() {
    location.reload();
  });

  $("a.afegirOutput").click(function() {
    var myVal = $(this).data('val');
      $('#modalOutput').find(".modal-url").text(myVal);
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

  $("a.afegirKPI").click(function() {
      var myVal = $(this).data('val');
      $('#modalKPI').find(".modal-url").text(myVal);
      $("#kpi-title").select2({
        dropdownParent: $('#modalKPI'),
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
        $('#target-date-1, #kpi-target-date-1').html(end_date);
    });
  });

  function validateFormKPI() {
    if ($('#kpi-title').val() == "") {
      swal("Title is missing", '', "warning");
      return false;
    }
    else if ($('#kpi-baseline').val() == "") {
      swal('Baseline value is missing', '', 'warning');
      return false;
    }
    else if ($('#kpi-datetimepicker').val() == "") {
      swal('Baseline date is missing', '', 'warning');
      return false;
    }
    else if ($('#kpi-unit').val() == "") {
      swal('Measuring unit is missing', '', 'warning');
      return false;
    }
    else if ($('#kpi-frequency').val() == "") {
      swal('Measuring frequency is missing', '', 'warning');
      return false;
    }
    else {
      return true;
    }
  }

  function validateForm() {
    if ($('#out-title').val() == "") {
      swal("Title is missing", '', "warning");
      return false;
    }
    else if ($('#out-datetimepicker').val() == "") {
      swal('Completion date is missing', '', 'warning');
      return false;
    }
    else if ($('#out-unit').val() == "") {
      swal('Measuring unit is missing', '', 'warning');
      return false;
    }
    else {
      return true;
    }
  }

  $('#createOutputFromModal').click(function(e){
    if (validateForm()) {
      e.preventDefault();
      var params = {};
      params.item_title = $('#out-title').val()
      params.item_path = $('#OutputPath').html()
      params.item_type = 'Output'
      params.item_description = $('#out-description').val()
      params.item_baseline = $('#out-baseline').val()
      params.item_date = $('#out-datetimepicker').val()
      params.item_unit = $('#out-unit').val()
      params.item_frequency = $('#out-frequency').val()
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
      $.ajax({
        url: 'createElement',
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

  $('#createKPIFromModal').click(function(e){
    if (validateFormKPI()) {
      e.preventDefault();
      var params = {};
      params.item_title = $('#kpi-title').val()
      params.item_path = $('#KPIPath').html()
      params.item_type = 'OutcomeKPI'
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
      $.ajax({
        url: 'createElement',
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
    let counter = 1;
    let numPhases = $('#totalPhases').text();
    if (numPhases === "1") {
      $("#addTargetValueButton, #KPIaddTargetValueButton").hide();
    }


    $("#addTargetValueButton, #KPIaddTargetValueButton").click(function () {
      let idnum = counter + 1;
      if(counter>=numPhases){
        swal('Not allowed!',
             'Sorry, but only ' + numPhases + ' target values are accepted.',
             'warning');
      }
      else {
        let newTextBoxDiv = $(document.createElement('div')).attr("id", 'TextBoxDiv' + idnum);
        newTextBoxDiv.after().html(
        '<div class="row"><div class="col-md-6" style="margin-top:0px; padding-left:0px;">' +
        '' +
        '<input type="text" class="form-control" id="target-value-' + idnum + '" i18n:attributes="placeholder value_for_date" placeholder="Indicate the target value for this date"/></div>' +
        '<div class="col-md-6" style="margin:0px 0px 10px 0px; padding-right:0px;">' +
        '' +
        '<p style="padding: 6px 12px;" id="target-date-' + idnum + '" ></p></div>');
        newTextBoxDiv.appendTo("#TextBoxesGroup");

        let newTextBoxDivKPI = $(document.createElement('div')).attr("id", 'KPITextBoxDiv' + idnum);
        newTextBoxDivKPI.after().html(
        '<div class="row"><div class="col-md-6" style="margin-top:0px; padding-left:0px;">' +
        '' +
        '<input type="text" class="form-control" id="kpi-target-value-' + idnum + '" i18n:attributes="placeholder value_for_date" placeholder="Indicate the target value for this date"/></div>' +
        '<div class="col-md-6" style="margin:0px 0px 10px 0px; padding-right:0px;">' +
        '' +
        '<p style="padding: 6px 12px;" id="kpi-target-date-' + idnum + '" ></p></div>');
        newTextBoxDivKPI.appendTo("#KPITextBoxesGroup");
      }
      fetch('api-getPhases')
      .then(function(response) { return response.json();})
      .then(function(data) {
          let end_date = data[0].gwopa_year_phases[idnum-1].end;
          $('#target-date-' + (idnum) + '').html(end_date);
          $('#kpi-target-date-' + (idnum) + '').html(end_date);
      });
      counter++;
    });

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
          $.ajax({
            url: 'removeElement',
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

  $(".expandItem").hide();
  $(".expandOutcome").hide();
    $("#expandAllProjectTab").hide();
  $("#expandAllOutcomeTab").hide();
  $(".tabla_cuerpo").slideDown();

  $("#expandAllProjectTab").click(function(){
    $(".tabla_cuerpo").slideDown()
    $(".expandItem").parent().parent().parent().slideDown();
    $(".expandItem").hide();
    $(".collapseItem").show();
    $("#expandAllProjectTab").hide();
    $("#collapseAllProjectTab").show();
  });

  $("#collapseAllProjectTab").click(function(){
    $(".tabla_cuerpo").slideUp()
    $(".collapseItem").slideUp();
    $(".collapseItem").hide();
    $(".expandItem").show();
    $("#expandAllProjectTab").show();
    $("#collapseAllProjectTab").hide();
  });

  $("#expandAllOutcomeTab").click(function(){
    $(".tabla_cuerpo").slideDown()
    $(".expandItem").parent().parent().parent().slideDown();
    $(".expandItem").hide();
    $(".collapseItem").show();
    $("#expandAllOutcomeTab").hide();
    $("#collapseAllOutcomeTab").show();
  });

  $("#collapseAllOutcomeTab").click(function(){
    $(".tabla_cuerpo").slideUp()
    $(".collapseItem").slideUp();
    $(".collapseItem").hide();
    $(".expandItem").show();
    $("#expandAllOutcomeTab").show();
    $("#collapseAllOutcomeTab").hide();
  });

  $(".collapseItem").click(function () {
    $(".expandItem").hide();
    $(".collapseItem").show();
    $header = $(this);
    $header.parent().parent().parent().parent().parent().find('.tabla_cuerpo').slideToggle(500);
  });

  $(".expandItem").click(function () {
    $(".collapseItem").hide();
    $(".expandItem").show();
    $header = $(this);
    $header.parent().parent().parent().parent().parent().find('.tabla_cuerpo').slideToggle(500);
  });
});

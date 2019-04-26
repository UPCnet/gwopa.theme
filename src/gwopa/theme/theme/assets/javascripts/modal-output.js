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
  $(".form-buttons-cancel").click(function() {
    location.reload();
  });

  $("a.afegirOutput").click(function() {
    var myVal = $(this).data('val');
      $('#modalOutput').find(".modal-url").text(myVal);
      $("#out-title").select2({
        dropdownParent: $('#modalOutput'),
        maximumSelectionSize: 1,
        ajax: {
          url: '@@api-getOutputs',
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
          url: '@@api-getUnits',
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
          url: '@@api-getFrequency',
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
        $('#target-date-1').val(end_date);
    });
  });

  $('#createOutputFromModal').click(function(e){
    e.preventDefault();
    var params = {};
    params.item_title = $('#out-title').val()
    params.item_path = $('#modalPath').html()
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
    $.ajax({
      url: '@@createElement',
      method: 'POST',
      data: params,
      success: function(resp)
        { if(resp) {location.reload();}}
    });
  });

  $(document).ready(function() {
    let counter = 1;
    let numPhases = $('#totalPhases').text();
    if (numPhases === "1") {
      $("#addTargetValueButton").hide();
    }


    $("#addTargetValueButton").click(function () {
      let idnum = counter + 1;
      if(counter>=numPhases){
        swal('Not allowed!',
             'Sorry, but this output only accepts ' + numPhases + ' target values.',
             'warning');
      }
      else {
        let newTextBoxDiv = $(document.createElement('div')).attr("id", 'TextBoxDiv' + idnum);
        newTextBoxDiv.after().html(
        '<div class="row"><div class="col-md-6" style="margin-top:0px;">' +
        '<label for="message-text" class="control-label"> Target value </label>' +
        '<input type="text" class="form-control" id="target-value-' + idnum + '" i18n:attributes="placeholder value_for_date" placeholder="Indicate the target value for this date"/></div>' +
        '<div class="col-md-6" style="margin:0px 0px 10px 0px;">' +
        '<label for="message-text" class="control-label"> Target date </label>' +
        '<input class="form-control" id="target-date-' + idnum + '" readonly/></div></div>');
        newTextBoxDiv.appendTo("#TextBoxesGroup");
      }
      fetch('api-getPhases')
      .then(function(response) { return response.json();})
      .then(function(data) {
          let end_date = data[0].gwopa_year_phases[idnum-1].end;
          $('#target-date-' + (idnum) + '').val(end_date);
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
            url: '@@removeElement',
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

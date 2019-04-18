require([
  'expect',
  'jquery'
], function(expect, $) {
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
          res = res.concat({ id: data[i]["id"], text: data[i]["name"] });
        }
        return { results: res };
      }
    },
  });

  $(".close").click(function() {
    location.reload();
  });
  $(".form-buttons-cancel").click(function() {
    location.reload();
  });
  
  $('#createOutputFromModal').click(function(e){
    e.preventDefault();
    item_title = $('#out-title').val()
    item_date = $('#out-datetimepicker').val()
    item_path = $('#out-path').val()

    var params = {};
    params.item_title = item_title;
    params.item_date = item_date;
    params.item_path = item_path;
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
    fetch('api-getPhases')
    .then(response => {
        return response.json()
    })
    .then(data => {
        let end_date = data[0].gwopa_year_phases[0].end;
        $('#target-date-1').val(end_date);
    })

    $("#addTargetValueButton").click(function () {
      let idnum = counter + 1;
      if(counter>=numPhases){
          alert(
            'Not allowed! \nSorry, but this output only accepts ' + numPhases + ' target values.');
      }
      else {
        let newTextBoxDiv = $(document.createElement('div')).attr("id", 'TextBoxDiv' + idnum);
        newTextBoxDiv.after().html(
        '<div class="col-md-6">' +
        '<input type="text" class="form-control" id="target-value-' + idnum + '" placeholder="Indicate the target value..."/></div>' +
        '<div class="col-md-6">' +
        '<input class="form-control" id="target-date-' + idnum + '" readonly/></div>');
        newTextBoxDiv.appendTo("#TextBoxesGroup");
      }
      fetch('api-getPhases')
      .then(response => {
        return response.json()
      })
      .then(data => {
          let end_date = data[0].gwopa_year_phases[idnum-1].end;
          $('#target-date-' + (idnum) + '').val(end_date);
      })
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
        title: "Confirm Delete?",
        text: 'You are about to delete ' + item_type + ': ' + item_title,
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
  $(".notexpand").hide();
  $("#expandAll").hide()
  $(".tabla_cuerpo").slideDown()

  $("#expandAll").click(function(){
    $(".tabla_cuerpo").slideDown()
    $(".expand").parent().parent().parent().slideDown();
    $(".expand").hide();
    $(".notexpand").show();
    $("#expandAll").hide();
    $("#collapseAll").show();
  })

  $("#collapseAll").click(function(){
    $(".tabla_cuerpo").slideUp()
    $(".notexpand").slideUp();
    $(".notexpand").hide();
    $(".expand").show();
    $("#expandAll").show();
    $("#collapseAll").hide();
  })

  $(".expand").click(function () {
    $(".expand").hide();
    $(".notexpand").show();
    $header = $(this);
    $header.parent().parent().parent().parent().parent().find('.tabla_cuerpo').slideToggle(500);
  });

  $(".notexpand").click(function () {
    $(".notexpand").hide();
    $(".expand").show();
    $header = $(this);
    $header.parent().parent().parent().parent().parent().find('.tabla_cuerpo').slideToggle(500);
  });
});

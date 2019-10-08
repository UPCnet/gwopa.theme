require([
  'expect',
  'jquery'
], function(expect, $) {

  $("a.addPartner").click(function() {
    var url = $(this).data('url');
    var type = $(this).data('type');
    var currency = $(this).data('currency');
    $('#modalPartner').find(".modal-url").text(url);
    $('#modalPartner').find(".modal-type").text(type);
  });
  // Validate fields Contributors
  function validateForm() {
    var userLang = $("html").prop("lang");
    if(userLang == 'es') {
      if ($('#partnerName').val() == "") {
        swal("Falta el nombre del colaborador", '', "warning");
        return false;
      }
      else if ($('#incash').val() == "") {
        swal('Falta el valor en efectivo', '', 'warning');
        return false;
      }
      else if ($('#inkind').val() == "") {
        swal('Falta el valor en especie', '', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else if(userLang == 'fr'){
      if ($('#partnerName').val() == "") {
        swal("Contributor is missing", '', "warning");
        return false;
      }
      else if ($('#incash').val() == "") {
        swal('In-cash value is missing', '', 'warning');
        return false;
      }
      else if ($('#inkind').val() == "") {
        swal('In-kind value is missing', '', 'warning');
        return false;
      }
      else {
        return true;
      }
    }else{
      if ($('#partnerName').val() == "") {
        swal("Contributor is missing", '', "warning");
        return false;
      }
      else if ($('#incash').val() == "") {
        swal('In-cash value is missing', '', 'warning');
        return false;
      }
      else if ($('#inkind').val() == "") {
        swal('In-kind value is missing', '', 'warning');
        return false;
      }
      else {
        return true;
      }
    }
  }

  // Create Contributor, Donor OtherOrganitzation
  $('#createPartnerFromModal').click(function(e){
    if (validateForm()) {
      e.preventDefault();
      var params = {};

      params.item_type = $('#partnerType')[0].textContent;
      params.item_title = $('#partnerName').val();
      params.item_path = $('#partnerPath')[0].textContent;

      params.item_incash = $('#incash').val();
      params.item_inkind = $('#inkind').val();

      $.ajax({
        url: 'createPartner',
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

  // Delete element on click button
  $('.btn-delete').on('click', function(e) {
    e.preventDefault();
    item = $(this).attr('data-path');
    item_url = $(this).attr('data-url');
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
        // project_path = url.substring(0, url.lastIndexOf("/view"));
        $.ajax({
          url: item_url + '/removeElement',
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

});

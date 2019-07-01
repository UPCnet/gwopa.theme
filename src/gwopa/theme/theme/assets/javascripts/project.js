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
    $('#modalPartner').find(".modal-currency").text(currency.charAt(currency.length-1));


  });
  // Validate fields Contributors
  function validateForm() {
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

});

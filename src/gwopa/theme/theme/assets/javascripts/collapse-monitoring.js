require([
  'expect',
  'jquery'
], function(expect, $) {
  $(document).ready(function() {
    $(".expand").hide();
    $("#expandAllProjectTab").hide()
    $("#expandAllOutcomeTab").hide()
    $(".tabla_cuerpo").slideDown()

    $("#expandAllProjectTab").click(function(){
      $(".tabla_cuerpo").slideDown()
      $(".expand").parent().parent().parent().slideDown();
      $(".expand").hide();
      $(".notexpand").show();
      $("#expandAllProjectTab").hide();
      $("#collapseAllProjectTab").show();
    })

    $("#collapseAllProjectTab").click(function(){
      $(".tabla_cuerpo").slideUp()
      $(".notexpand").slideUp();
      $(".notexpand").hide();
      $(".expand").show();
      $("#expandAllProjectTab").show();
      $("#collapseAllProjectTab").hide();
    })

    $("#expandAllOutcomeTab").click(function(){
      $(".tabla_cuerpo").slideDown()
      $(".expand").parent().parent().parent().slideDown();
      $(".expand").hide();
      $(".notexpand").show();
      $("#expandAllOutcomeTab").hide();
      $("#collapseAllOutcomeTab").show();
    })

    $("#collapseAllOutcomeTab").click(function(){
      $(".tabla_cuerpo").slideUp()
      $(".notexpand").slideUp();
      $(".notexpand").hide();
      $(".expand").show();
      $("#expandAllOutcomeTab").show();
      $("#collapseAllOutcomeTab").hide();
    })

    $(".expand").click(function () {
      $header = $(this);
      $header.find('.expand').hide()
      $header.find('.notexpand').show()
      $header.parent().parent().parent().parent().parent().find('.tabla_cuerpo').slideToggle(500);
    });

    $(".notexpand").click(function () {
      $header = $(this);
      $header.find('.notexpand').hide()
      $header.find('.expand').show()
      $header.parent().parent().parent().parent().parent().find('.tabla_cuerpo').slideToggle(500);
    });
  });
});

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
    params.obstacles = $(id + 'obstacles option:selected').text();
    params.contributing = $(id + 'contributing option:selected').text();
    params.consideration = $(id + 'consideration').val();
    params.limiting = $(id + 'limiting').val();
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
    params.obstacles = $(id + 'obstacles option:selected').text();
    params.contributing = $(id + 'contributing option:selected').text();
    params.consideration = $(id + 'consideration').val();
    params.limiting = $(id + 'limiting').val();
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

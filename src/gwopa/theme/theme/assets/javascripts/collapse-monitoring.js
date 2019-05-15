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
    params.obstacles = $(id + 'obstacles option:selected').text();
    params.contributing = $(id + 'contributing option:selected').text();
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
    params.obstacles = $(id + 'obstacles option:selected').text();
    params.contributing = $(id + 'contributing option:selected').text();
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

  $(document).ready(function() {
    $(".tabla_cuerpo").hide();
    $("#collapseAllProjectTab").hide();
    $("#collapseAllOutcomeTab").hide();
    $("#expandAllProjectTab").hide();
    $("#expandAllOutcomeTab").hide();


    $("#expandAllOutcomeTab").click(function(){
      $(".tabla_cuerpo").slideDown()
      $(".expandWA").parent().parent().parent().slideDown();
      $(".expandWA").hide();
      $(".collapseWA").show();
      $("#expandAllOutcomeTab").hide();
      $("#collapseAllOutcomeTab").show();
    })

    $("#collapseAllOutcomeTab").click(function(){
      $(".tabla_cuerpo").slideUp()
      $(".collapseWA").slideUp();
      $(".collapseWA").hide();
      $(".expandWA").show();
      $("#expandAllOutcomeTab").show();
      $("#collapseAllOutcomeTab").hide();
    })

    $(".expandWA").on('click', function(e) {
      if (e.target.classList[2] == "collapseWA") {
        $(this).parent().parent().parent().parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandWA");
      }
      else {
        $(this).parent().parent().parent().parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseWA");
      }
    });

    $(".expandAct").on('click', function(e) {
      if (e.target.classList[2] == "collapseAct") {
        $(this).parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandAct");
      }
      else {
        $(this).parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseAct");
      }
    });

    $(".expandOut").on('click', function(e) {
      if (e.target.classList[2] == "collapseOut") {
        $(this).parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandOut");
      }
      else {
        $(this).parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseOut");
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

    $(".expandOutcome").on('click', function(e) {
      if (e.target.classList[2] == "collapseOutcome") {
        $(this).parent().nextAll(".tabla_cuerpo").hide();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-up expandOutcome");
      }
      else {
        $(this).parent().nextAll(".tabla_cuerpo").show();
        var thisItem = $(this)[0].id;
        var selectorItem = '#' + thisItem;
        $(selectorItem).attr("class", "fas fa-chevron-down collapseOutcome");
      }
    });
  });
});

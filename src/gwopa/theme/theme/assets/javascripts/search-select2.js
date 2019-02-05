require([
  'expect',
  'jquery'
], function(expect, $) {
  $(document).ready(function() {
    var lang = $('html').attr('lang');

    var base = window.location.pathname
    if (lang == 'es') {
      var placehd = 'Busca proyectos...';
      var moreprojects = 'Más proyectos...';
      var projects_url = base + "/search?portal_type=Project";
      var ajax_url = base + "/@search";
    } else if (lang == 'fr') {
      var placehd = 'Search projects...';
      var moreprojects = 'More projects...';
      var projects_url = base + "/search?portal_type=Project";
      var ajax_url = base + "/@search";
    } else {
      var placehd = 'Search projects...';
      var moreprojects = 'More projects...';
      var projects_url = base + "/search?portal_type=Project";
      var ajax_url = base + "/@search";
    }
    if ( $("input.js-custom-data-ajax.show-more-projects").length > 0 ) {
      var show_more_projects = true;
    } else {
      var show_more_projects = false;
    }

    $("input.js-custom-data-ajax").select2({
      placeholder: placehd,
      multiple: true,
      maximumSelectionSize: 1,
      ajax: {
        url: ajax_url,
        dataType: 'json',
        transport: function(params){
          params.beforeSend = function(request){
            request.setRequestHeader("Accept", "application/json");
          };
          return $.ajax(params);
        },
        quietMillis: 250,
        data: function (term, page) {
          return {
            SearchableText: term, // search term
            sort_on: "effective",
            sort_order: "reverse",
            portal_type: "Project",
            limit: 10
          };
        },
        results: function (data, page) {
          var res = [];
          var len = data.items.length < 10 ? data.items.length : 9;
          for (var i=0; i<len; i++) {
            res = res.concat({ id: data.items[i]["@id"], text: data.items[i]["title"] });
          }
          if ( show_more_projects ) {
            res = res.concat({ id: projects_url, text: moreprojects });
          }
          return { results: res };
        },
      },
    });
    $("input.js-custom-data-ajax").on('change', function() {
      window.location = this.value.split(",").slice(-1)[0];
      $(this).empty();
    });
    if (show_more_projects) {
      $("input.js-custom-data-ajax").on("select2-loaded", function() {
        $('.select2-results li:last-child').attr('style', 'font-weight: 500');
      });
    }
  });
});

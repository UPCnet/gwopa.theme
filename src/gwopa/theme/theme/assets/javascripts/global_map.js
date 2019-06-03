require([
  'expect',
  'jquery'
], function(expect, $) {
    L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.1/dist/images/'
   $("#map-platform").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectWOPPlatform',
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
    $("#map-program").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectWOPProgram',
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
    $("#map-status").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectStatus',
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
    $("#map-country").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectCountry',
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
    $("#map-partner").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectPartners',
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
    $("#map-area").select2({
      maximumSelectionSize: 1,
      ajax: {
        url: 'api-getProjectWorkingArea',
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
    $(".js-range-slider").ionRangeSlider({
          type: "double",
          skin: "sharp",
          grid: false,
          min: 0,
          max: 1000,
          from:0,
          to: 1000,
          step: 100
    })

    var url = 'updatedMap.js';  //REST service
    var map = L.map('map').setView([42.736424, -73.762713], 2);
    var osm=new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
        osm.addTo(map);

/*    function forEachFeature(feature, layer) {
      var popupContent =
          "<a href=''>"+ feature.properties.title + "</a>" +
          "<br/>Region: "+ feature.properties.country +
          "<br/>Budget: "+ feature.properties.total_budget;
      layer.bindPopup(popupContent);
    }

    // Null variable that will hold layer
    var stateLayer = L.geoJson(null, {onEachFeature: forEachFeature});
    $.getJSON(url, function(data) {
          stateLayer.addData(data);
    });
    stateLayer.addTo(map);
    // other layer?
    var otherLayer = L.geoJson(null, {onEachFeature: forEachFeature});
    $.getJSON(url, function(data) {
          otherLayer.addData(data);
    });
    otherLayer.addTo(map);

    // for Layer Control
    var baseMaps = {
        "Projects": osm
    };

    var overlayMaps = {
        "Open":stateLayer,
        "Closed":otherLayer,
    };*/

    //Add layer control
    /*L.control.layers(baseMaps, overlayMaps).addTo(map);*/


  ////////////////////
  var ci_data;

  //Initial Setup  with layer country No
  ci_data = L.geoJson(null, {
      onEachFeature: function (feature, layer) {
        var popupContent =
            "<a href=''>"+ feature.properties.title + "</a>" +
            "<br/>Region: "+ feature.properties.country +
            "<br/>Budget: "+ feature.properties.total_budget;
        layer.bindPopup(popupContent);
      },
    });

    $.getJSON(url, function(data) {
       ci_data.addData(data);
    });

    /// END Initial Setup

    //Using a Layer Group to add/remove data from the map.
    var myData =  L.layerGroup([]);
    myData.addLayer(ci_data);
    myData.addTo(map);

    $("#map-area").change(function () {
        map.removeLayer(myData);
        myData.clearLayers();
        shotresult = $("#map-area").val()
        ci_data = L.geoJson(null, {
            onEachFeature: function (feature, layer) {
              var popupContent =
                  "<a href=''>"+ feature.properties.title + "</a>" +
                  "<br/>Region: "+ feature.properties.country +
                  "<br/>Budget: "+ feature.properties.total_budget;
              layer.bindPopup(popupContent);
            },
            filter: function(feature, layer) {
                 return (feature.properties.areas == shotresult );
            },
        });
        $.getJSON(url, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });

    $("#map-country").change(function () {
        map.removeLayer(myData);
        myData.clearLayers();
        shotresult = $("#map-country").val()
        ci_data = L.geoJson(null, {
            onEachFeature: function (feature, layer) {
              var popupContent =
                  "<a href=''>"+ feature.properties.title + "</a>" +
                  "<br/>Region: "+ feature.properties.country +
                  "<br/>Budget: "+ feature.properties.total_budget;
              layer.bindPopup(popupContent);
            },
            filter: function(feature, layer) {
                 return (feature.properties.country == shotresult );
            },
        });
        $.getJSON(url, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });

    $("#map-platform").change(function () {
      debugger;
        map.removeLayer(myData);
        myData.clearLayers();
        shotresult = $("#map-platform").val()
        ci_data = L.geoJson(null, {
            onEachFeature: function (feature, layer) {
              var popupContent =
                  "<a href=''>"+ feature.properties.title + "</a>" +
                  "<br/>Region: "+ feature.properties.country +
                  "<br/>Budget: "+ feature.properties.total_budget;
              layer.bindPopup(popupContent);
            },
            filter: function(feature, layer) {
                 return (feature.properties.wop_platform == shotresult );
            },
        });
        $.getJSON(url, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });

    $("#map-program").change(function () {
        map.removeLayer(myData);
        myData.clearLayers();
        shotresult = $("#map-program").val()
        ci_data = L.geoJson(null, {
            onEachFeature: function (feature, layer) {
              var popupContent =
                  "<a href=''>"+ feature.properties.title + "</a>" +
                  "<br/>Region: "+ feature.properties.country +
                  "<br/>Budget: "+ feature.properties.total_budget;
              layer.bindPopup(popupContent);
            },
            filter: function(feature, layer) {
              return (feature.properties.wop_program == shotresult );
            },
        });
        $.getJSON(url, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });

    $("#map-partner").change(function () {
        map.removeLayer(myData);
        myData.clearLayers();
          shotresult = $("#map-partner").val()
        ci_data = L.geoJson(null, {
            onEachFeature: function (feature, layer) {
              var popupContent =
                  "<a href=''>"+ feature.properties.title + "</a>" +
                  "<br/>Region: "+ feature.properties.country +
                  "<br/>Budget: "+ feature.properties.total_budget;
              layer.bindPopup(popupContent);
            },
            filter: function(feature, layer) {
              if (feature.properties.partners != null) {
                for (i=0; i<feature.properties.partners.length; i++) {
                if (feature.properties.partners[i] == shotresult)
                  return shotresult;
                }
              }
            },
        });
        $.getJSON(url, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });

    $("#map-tags").change(function () {
        map.removeLayer(myData);
        myData.clearLayers();
        shotresult = $("#map-tags").val()
        ci_data = L.geoJson(null, {
            onEachFeature: function (feature, layer) {
              var popupContent =
                  "<a href=''>"+ feature.properties.title + "</a>" +
                  "<br/>Region: "+ feature.properties.country +
                  "<br/>Budget: "+ feature.properties.total_budget;
              layer.bindPopup(popupContent);
            },
            filter: function(feature, layer) {
              if (feature.properties.tags != null) {
                for (i=0; i<feature.properties.tags.length; i++) {
                if (feature.properties.tags[i] == shotresult)
                  return shotresult;
                }
              }
            },
        });
        $.getJSON(url, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });
    //possible colors 'red', 'darkred', 'orange', 'green', 'darkgreen', 'blue', 'purple', 'darkpuple', 'cadetblue'
/*    var cafeIcon = L.AwesomeMarkers.icon({
        prefix: 'fa', //font awesome rather than bootstrap
        markerColor: 'green', // see colors above
        icon: 'dollar' //http://fortawesome.github.io/Font-Awesome/icons/
    });*/
    $("#map_budget").change(function () {
        map.removeLayer(myData);
        myData.clearLayers();
        budget_start = $("#map_budget").val().split(';')[0]
        budget_end = $("#map_budget").val().split(';')[1]
        ci_data = L.geoJson(null, {
            onEachFeature: function (feature, layer) {
              var popupContent =
                  "<a href=''>"+ feature.properties.title + "</a>" +
                  "<br/>Region: "+ feature.properties.country +
                  "<br/>Budget: "+ feature.properties.total_budget;
              layer.bindPopup(popupContent);
            },
            filter: function(feature, layer) {
                  return ((feature.properties.total_budget >= budget_start) & (feature.properties.total_budget <= budget_end));
            },
            /*pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: cafeIcon
                });
            }*/
        });
        $.getJSON(url, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });
});

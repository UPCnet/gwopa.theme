require([
  'expect',
  'jquery'
], function(expect, $) {
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

    var url_all = 'allProjects.json';
    var url_open = 'activeProjects.json';
    var url_inactive = 'inactiveProjects.json';
    L.Icon.Default.imagePath = '++theme++gwopa.theme/assets/images/'

    var map = L.map('map', {
        center: [41.39, 2.15],
        zoom: 2,
        minZoom: 2,
        maxZoom: 16,
        zoomControl: true,
        attributionControl: true,
        fullscreenControl: true,
        hoverToWake: false,
        sleep: false,
    });

    L.control.scale().addTo(map);
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.keyboard.enable();

    var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
    osm.addTo(map);

    var openLayer = L.geoJson(null, {
        pointToLayer: function (feature, latlng) {
            return new L.CircleMarker(latlng, {radius: 6,
                                                fillOpacity: 1,
                                                color: 'black',
                                                fillColor: '#007BB0',
                                                weight: 1,});
        },
        onEachFeature: forEachFeature
      }
    );
    $.getJSON(url_open, function(data) {
          openLayer.addData(data);
    });
    openLayer.addTo(map);

    var inactiveLayer = L.geoJson(null, {
        pointToLayer: function (feature, latlng) {
            return new L.CircleMarker(latlng, {radius: 6,
                                                fillOpacity: 2,
                                                color: 'black',
                                                fillColor: '#b4b4b4',
                                                weight: 1,});
        },
        onEachFeature: forEachFeature
      }
    );
    $.getJSON(url_inactive, function(data) {
          inactiveLayer.addData(data);
    });
    inactiveLayer.addTo(map);

    var baseMaps = {
        "Projects": osm
    };

    var overlayMaps = {
        "Active": openLayer,
        "Inactive": inactiveLayer,
    };

    L.control.layers(baseMaps, overlayMaps,{
      position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
      collapsed: false
    }).addTo(map);


    function forEachFeature(feature, layer) {
      var popupContent =
          "<a href=''>"+ feature.properties.title + "</a>" +
          "<br/><strong>"+ feature.properties.country + "</strong>" +
          "<br/>Total budget: "+ feature.properties.total_budget;
      layer.bindPopup(popupContent);
    }

  //////////////////
    var ci_data;
    ci_data = L.geoJson(null, {
      onEachFeature: function (feature, layer) {
        var popupContent =
            feature.properties.popup +
            "<br/>Region: "+ feature.properties.country +
            "<br/>Budget: "+ feature.properties.total_budget;
        layer.bindPopup(popupContent);
      },
    });
    $.getJSON(url_all, function(data) {
       ci_data.addData(data);
    });
    var myData =  L.layerGroup([]);
    // myData.addLayer(ci_data);
    // myData.addTo(map);

    // $("#map_budget").change(function () {
    //     map.removeLayer(myData);
    //     myData.clearLayers();
    //     budget_start = $("#map_budget").val().split(';')[0]
    //     budget_end = $("#map_budget").val().split(';')[1]
    //     ci_data = L.geoJson(null, {
    //         onEachFeature: function (feature, layer) {
    //           var popupContent =
    //               feature.properties.popup +
    //               "<br/>Region: "+ feature.properties.country +
    //               "<br/>Budget: "+ feature.properties.total_budget;
    //           layer.bindPopup(popupContent);
    //         },
    //         filter: function(feature, layer) {
    //               return ((feature.properties.total_budget >= budget_start) & (feature.properties.total_budget <= budget_end));
    //         },
            /*pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: cafeIcon
                });
            }*/
    //     });
    //     $.getJSON(url_all, function(data) {
    //            ci_data.addData(data);
    //     });
    //     myData.addLayer(ci_data);
    //     myData.addTo(map);
    // });

    /// Here goes all the fields checking magic ///
    function updateCheckboxStates(feature, layer) {
      years = selected_year.split(',');
      areas = selected_area.split(',');
      countries = selected_country.split(',');
      platforms = selected_platform.split(',');
      programs = selected_program.split(',');
      partners = selected_partner.split(',');
      kpis = selected_kpi.split(',');
      tags = selected_tag.split(',');
      budgets = selected_budget.split(',');
      if (years != '') { hasYears = false; } else { hasYears = true }
      if (areas != '') { hasAreas = false; } else { hasAreas = true }
      if (countries != '') { hasCountries = false; } else { hasCountries = true }
      if (platforms != '') { hasPlatforms = false; } else { hasPlatforms = true }
      if (programs != '') { hasPrograms = false; } else { hasPrograms = true }
      if (programs != '') { hasPrograms = false; } else { hasPrograms = true }
      if (partners != '') { hasPartners = false; } else { hasPartners = true }
      if (kpis != '') { hasKPIS = false; } else { hasKPIS = true }
      if (tags != '') { hasTags = false; } else { hasTags = true}

      // for(var i=0; i<years.length; i++)
      //   if ((feature.properties.years).indexOf(years[i]) > -1) hasYears = true;

      for(var i=0; i<areas.length; i++)
        if ((feature.properties.areas).indexOf(areas[i]) > -1) hasAreas = true;

      for(var i=0; i<countries.length; i++)
        if ((feature.properties.country).indexOf(countries[i]) > -1) hasCountries = true;

      for(var i=0; i<platforms.length; i++)
        if ((feature.properties.wop_platform).indexOf(platforms[i]) > -1) hasPlatforms = true;

      for(var i=0; i<programs.length; i++)
        if ((feature.properties.wop_program).indexOf(programs[i]) > -1) hasPrograms = true;

      for(var i=0; i<partners.length; i++)
        if ((feature.properties.partners).indexOf(partners[i]) > -1) hasPartners = true;

      for(var i=0; i<tags.length; i++)
        if ((feature.properties.tags).indexOf(tags[i]) > -1) hasTags = true;

      if (hasAreas & hasCountries & hasPlatforms & hasPrograms & hasPartners & hasTags) return true;
    };

    // Clicking the apply button filters the results ///
    $('#applyfilters').click(function(){
        selected_year = $("#map-year").val()
        selected_area = $("#map-area").val()
        selected_country = $("#map-country").val()
        selected_platform = $("#map-platform").val()
        selected_program = $("#map-program").val()
        selected_partner = $("#map-partner").val()
        selected_kpi = $("#map-kpi").val()
        selected_tag = $("#map-tags").val()
        selected_budget = $("#map-budget").val()
        map.removeLayer(myData);
        myData.clearLayers();
        ci_data = L.geoJson(null, {
            onEachFeature: function (feature, layer) {
              var popupContent =
                  feature.properties.popup +
                  "<br/>Region: "+ feature.properties.country +
                  "<br/>Budget: "+ feature.properties.total_budget;
              layer.bindPopup(popupContent);
            },
            filter: updateCheckboxStates,
        });
        $.getJSON(url_all, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });
});

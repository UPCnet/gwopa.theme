require([
  'expect',
  'jquery'
], function(expect, $) {
    $(".js-range-slider").ionRangeSlider({
          type: "double",
          skin: "sharp",
          grid: false,
          step: 100
    })

    var portal_url = $('body').attr('data-portal-url');
    var url_all = portal_url + '/allProjects.json';
    var url_open = portal_url + '/activeProjects.json';
    var url_inactive = portal_url + '/inactiveProjects.json';
    L.Icon.Default.imagePath = portal_url + '/++theme++gwopa.theme/assets/images/'

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
      layer.bindPopup(feature.properties.popup);
    }

  //////////////////
    var ci_data;
    ci_data = L.geoJson(null, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.popup);
      },
    });
    $.getJSON(url_all, function(data) {
       ci_data.addData(data);
    });
    var myData =  L.layerGroup([]);
    // myData.addLayer(ci_data);
    // myData.addTo(map);

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
      budget_start = selected_budget.split(';')[0];
      budget_end = selected_budget.split(';')[1];

      if (years != '') { hasYears = false; } else { hasYears = true }
      if (areas != '') { hasAreas = false; } else { hasAreas = true }
      if (countries != '') { hasCountries = false; } else { hasCountries = true }
      if (platforms != '') { hasPlatforms = false; } else { hasPlatforms = true }
      if (programs != '') { hasPrograms = false; } else { hasPrograms = true }
      if (programs != '') { hasPrograms = false; } else { hasPrograms = true }
      if (partners != '') { hasPartners = false; } else { hasPartners = true }
      if (kpis != '') { hasKPIS = false; } else { hasKPIS = true }
      if (tags != '') { hasTags = false; } else { hasTags = true}

      for(var i=0; i<years.length; i++)
        if ((feature.properties.years).indexOf(years[i]) > -1) hasYears = true;

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

      for(var i=0; i<kpis.length; i++)
        if ((feature.properties.kpis).indexOf(kpis[i]) > -1) hasKPIS = true;

      for(var i=0; i<tags.length; i++)
        if ((feature.properties.tags).indexOf(tags[i]) > -1) hasTags = true;

      budget = ((feature.properties.total_budget >= budget_start) & (feature.properties.total_budget <= budget_end))

      if (hasYears & hasAreas & hasCountries & hasPlatforms & hasPrograms & hasPartners & hasKPIS & hasTags & budget) return true;
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
              layer.bindPopup(feature.properties.popup);
            },
            filter: updateCheckboxStates,
        });
        $.getJSON(url_all, function(data) {
               ci_data.addData(data);
        });
        myData.addLayer(ci_data);
        myData.addTo(map);
    });

     $('#clearfilters').click(function(){
        myData.removeLayer(ci_data);
        myData.addTo(map);
    });

     $(document).ready(function(){
      $("#map-year").select2({
        multiple: true,
        ajax: {
          url: window.location.pathname + "/api-getProjectDates",
          delay: 250,
          results: function (data, page) {
            return data;
          },
        },
      });

      $("#map-area").select2({
        multiple: true,
        ajax: {
          url: window.location.pathname + "/api-getProjectWorkingArea",
          delay: 250,
          results: function (data, page) {
            return data;
          },
        },
      });

      $("#map-country").select2({
        multiple: true,
        ajax: {
          url: window.location.pathname + "/api-getProjectCountry",
          delay: 250,
          results: function (data, page) {
            return data;
          },
        },
      });

      $("#map-platform").select2({
        multiple: true,
        ajax: {
          url: window.location.pathname + "/api-getProjectWOPPlatform",
          delay: 250,
          results: function (data, page) {
            return data;
          },
        },
      });

      $("#map-program").select2({
        multiple: true,
        ajax: {
          url: window.location.pathname + "/api-getProjectWOPProgram",
          delay: 250,
          results: function (data, page) {
            return data;
          },
        },
      });

      $("#map-partner").select2({
        multiple: true,
        ajax: {
          url: window.location.pathname + "/api-getProjectPartners",
          delay: 250,
          results: function (data, page) {
            return data;
          },
        },
      });

      $("#map-kpi").select2({
        multiple: true,
        ajax: {
          url: window.location.pathname + "/api-getProjectKPIs",
          delay: 250,
          results: function (data, page) {
            return data;
          },
        },
      });

      $("#map-tags").select2({
        multiple: true,
        ajax: {
          url: window.location.pathname + "/api-getProjectTags",
          delay: 250,
          results: function (data, page) {
            return data;
          },
        },
      });

     });

});

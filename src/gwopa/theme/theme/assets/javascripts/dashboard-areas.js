require([
  'expect',
  'jquery'
], function(expect, $) {
  String.prototype.trunc = String.prototype.trunc ||
    function(n){
      return (this.length > n) ? this.substr(0, n-1) + '...' : this;
    };

  function drawInfo() {
    var params = {};
    params.wa = $('#selectWA').children("option:selected").val();
    params.year = $('.disabled')[0].id;
    url = window.location.href;
    project_path = url.substring(0, url.lastIndexOf("/dash-areas"));
    $.ajax({
      url: window.project_path + '/api-getDashboard',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        drawActivitiesOutputs(resp);
      }
    });
    drawCapacityChanges(window.project_path, params);
    drawCurrentStage(window.project_path, params);
  }

  function drawCapacityChanges(project_path, params) {
    $.ajax({
      url: project_path + '/api-getCapacityChanges',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        resp = JSON.parse(resp);
        var specifics = resp[0];
        for (var i=0; i < specifics.length; i++) {
          if (specifics[i].selected_monitoring == 'notset') {
            $('#'+specifics[i].id+' > div > img').attr("src", specifics[i].icon_basic);
          }
          else {
            $('#'+specifics[i].id+' > div > img').attr("src", specifics[i].icon_url_selected);
          }
          $('#'+specifics[i].id).removeClass();
          $('#'+specifics[i].id).addClass("item basic " + specifics[i].selected_monitoring);
        }
        var others = resp[1];
        if (others.length > 0) {
          $('#others').show();
          $('.cuartafila').html('')
          for (var i=0; i < others.length; i++) {
            $('.cuartafila').append('<a id="' + others[i].id + '" class="item basic ' + others[i].selected_monitoring + '"><div class="item_image "><img alt="" title="" src="++theme++gwopa.theme/assets/images/w-others.png"></div><div class="item_text"><span>lalala</span></div></a>');
            if (others[i].selected_monitoring == 'notset') {
              $('#'+others[i].id+' > div > img').attr("src", others[i].icon_basic);
            }
            else {
              $('#'+others[i].id+' > div > img').attr("src", others[i].icon_url_selected);
            }
            $('#'+others[i].id).removeClass();
            $('#'+others[i].id).addClass("item basic " + others[i].selected_monitoring);
            $('#'+others[i].id).children('.item_text').children().text(others[i].title_specific);
          }
        }
        else {
          $('#others').hide();
        }
      }
    });
  }

  function drawCurrentStage(project_path, params) {
    $.ajax({
      url: project_path + '/api-getCurrentStage',
      method: 'GET',
      data: params,
      transport: function(params){
        params.beforeSend = function(request){
          request.setRequestHeader("Accept", "application/json");
        };
        return $.ajax(params);
      },
      success: function(resp) {
        for (var i=0; i < resp.length; i++) {
          $('#'+resp[i].id).removeClass();
          $('#'+resp[i].id).addClass(resp[i].state);
        }
      }
    });
  }

  function drawActivitiesOutputs(resp) {
    if (!$.isEmptyObject(resp)) {
      $('#graphicActivityOutput').show();
      $('#noInfo').hide();
      $('#graphicActivityOutput').empty();
      var card = '';
      $.each(resp, function(activity, values) {
        var act_val = values['activity_val'];
        var outputs_dict = values['outputs'];
        var showOutputs = '';
        var outputs = '';
        if (!$.isEmptyObject(outputs_dict)) {
          showOutputs = `
          <div class="expand">
            <i class="fas fa-chevron-down showOutputs" aria-hidden="true"></i>
            <i style="display: none" class="fas fa-chevron-up hideOutputs" aria-hidden="true"></i>
          </div>`;
          $.each(outputs_dict, function(output, value) {
            var re  = value.split('/');
            var obtained = parseInt(re[0]);
            var total = parseInt(re[1]);
            var percent = obtained*100/total;
            outputs += `
            <div class="indicators indicators-outputs" style="display: none">
              <div class="indicators__elem">
                <p class="indicators-root indicators-outputs-p">${output}</p>
                <h3 class="indicators-root indicators-outputs-h3">${value}</h3>
                <div class="indicators-outputs-progress" role="progressbar" aria-valuenow=${percent}>
                  <div class="indicators-progress-bar" style="transform: translateX(${percent-100}%);"></div>
                </div>
              </div>
            </div>`;
          });
        }
        card +=
        `<div class="indicators indicators__elem card">
          <div class="indicators__paper">
            <div class="indicators__paper__content">
              <div class="indicators__paper__content--descr">
                <div class="indicators__elem indicators__elem--title">
                  <p class="indicators-root indicators-p">${activity}</p>
                  <h3 class="indicators-root indicators-h3">${act_val}%</h3>
                </div>
                <div class="indicators__elem indicators__elem--icon">
                  <div class="indicators__icon indicators__icon__circle">
                    <div class="indicators__icon--fa">
                      <i class="far fa-chart-bar"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="indicators-progress" role="progressbar" aria-valuenow=${act_val}>
                <div class="indicators-progress-bar" style="transform: translateX(${act_val-100}%);"></div>
              </div>${showOutputs}
            </div>
          </div>${outputs}</div>`;
      });
      $('#graphicActivityOutput').append(card);
      collapseUncollapse()
    }
    else {
      $('#graphicActivityOutput').hide();
      $('#noInfo').show();
    }
  }

  function collapseUncollapse() {
    $('.showOutputs').click(function() {
      $(this).hide();
      $(this).parent().find('.hideOutputs').show();
      $(this).parent().parent().parent().next().slideDown();
    });
    $('.hideOutputs').click(function() {
      $(this).hide();
      $(this).parent().find('.showOutputs').show();
      $(this).parent().parent().parent().next().slideUp();
    });
  }

  $(document).ready(function() {
    drawInfo();

    // habilitar/deshabilitar ProjectYear en dashboard
    $('#1, #2, #3, #4, #5, #6, #7, #8, #9, #10').click(function() {
      let idDis = $('.disabled')[0] ? $('.disabled')[0].id : 0;
      $(`#${this.id}`).removeClass("visible");
      $(`#${this.id}`).addClass("disabled");
      $(`#${idDis}`).removeClass("disabled");
      drawInfo();
    });
    $('#selectWA').change(function() {
      drawInfo();
    });
  });

});

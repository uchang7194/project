(function(global, Utils){
  'use strict';

  var header = null;
  var summary_list = null, summary_list_offsetY = 0;
  var features_list_info = [], features_target = '.features-list > li';

  var innerWidth = 0;

  function init() {
    header = document.querySelector('header');
    
    summary_list = document.querySelector('.summary-list');
    summary_list_offsetY = summary_list.offsetTop;
    
    console.group('init');
    resetDataInfo(features_target, features_list_info);
    console.log('features_list_info', features_list_info);
    console.groupEnd('init');
    bind();
  }

  function bind() {
    window.addEventListener('scroll', function() {
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      var depth = 50;

      if( scrollY !== 0 ) {
        header.setAttribute('class', 'active');
      } else {
        header.setAttribute('class', '');
      }

      // summary add class

      if( isShowSectionsLimit(scrollY, summary_list_offsetY) ) {
        Utils.addClass(summary_list, 'active');
      }

      // feature add class
      for( var i = 0, len = features_list_info.length; i < len; i++ ) {
        var feature_info = features_list_info[i];
        if( isShowSectionsLimit(scrollY, feature_info.offsetY) ) {
          Utils.addClass(feature_info.el, 'active');
        }
      }
      // console.log('scroll');
    });


    var resize_points = [844, 1091];
    window.addEventListener('resize', function() {
      var depth = 30;
      innerWidth = this.innerWidth;
      
      for( var i = 0, len = resize_points.length; i < len; i++ ) {

        if( isShowSectionsLimit(innerWidth, resize_points[i]) ) {
          resetDataInfo(features_target, features_list_info);
          // console.log(features_list_info);
        }
      }
    })
  }

  function isShowSectionsLimit(scrollY, section_offsetY) {
    var depth = 300;

    if( scrollY > (section_offsetY - depth) && scrollY < section_offsetY ) {
      return true;
    } else {
      return false;
    }
  }

  function resetDataInfo(target, info) {
    console.group('resetDataInfo');
    console.log('target: ', target);
    console.log('target -> DOM: ',document.querySelectorAll(target));
    console.groupEnd('resetDataInfo');
    Array.prototype.forEach.call(document.querySelectorAll(target), function(data){
      info.push({
        el: data,
        offsetY: data.offsetTop
      });
    });
  }
  init();
}(window, window.Utils));
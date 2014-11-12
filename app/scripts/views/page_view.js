define([
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/page.handlebars'
], function(_, Backbone, Handlebars, TPL) {

  'use strict';

  var PageView = Backbone.View.extend({

    el: '.l-page',

    visualizations: {
      '1': 'http://simbiotica.github.io/protected-areas',
      '2': 'http://simbiotica.github.io/wpc-twitter'
    },

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.body = $('body');
      this.$header = $('.l-header');
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('page:change', this.onPageChange, this);
    },

    onPageChange: function(page) {
      this.$el
        .removeClass('is-active')
        .find('iframe').fadeOut(500, function() {
          $(this).remove();
        });
      if (page === 'welcome') {
        this.body[0].className = 'welcome-theme';
        this.$header.fadeOut();
        $('#welcomePageView').addClass('is-active');
      } else if (page === 'about') {
        this.body[0].className = 'about-theme';
        this.$header.fadeIn();
        $('#aboutPageView').addClass('is-active');
      } else {
        var $current = $('#vis' + page + 'PageView');
        this.body[0].className = 'theme-' + page;
        this.$header.fadeIn();
        $current
          .html(this.template({
            url: this.visualizations[page]
          }));
        setTimeout(function() {
          $current.addClass('is-active');
        }, 1000);
      }
    }

  });

  return PageView;

});

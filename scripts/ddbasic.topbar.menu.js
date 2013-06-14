/*
 * Creates the topbar toggle menu and fixed header.
 *
 * TODO: Refactor and cleanup, this thing got messy!
 */

(function($) {

  /*
   * Toggle topbar menu items.
   */
  function toggle_topbar(toggleItem) {

    // Elements to toggle
    var ddbasic_topbar_user = $('.js-topbar-user');
    var ddbasic_topbar_search = $('.js-topbar-search');
    var ddbasic_topbar_menu = $('.js-topbar-menu');
    var ddbasic_header_wrapper = $('.header-wrapper');

    switch (toggleItem) {
      case 'search':
        ddbasic_topbar_search.toggleClass('js-topbar-toggled');

        ddbasic_topbar_menu.removeClass('js-topbar-toggled');
        ddbasic_topbar_user.removeClass('js-topbar-toggled');

        ddbasic_header_wrapper.show();
        break;
      case 'user':
        ddbasic_topbar_user.toggleClass('js-topbar-toggled');

        ddbasic_topbar_search.removeClass('js-topbar-toggled');
        ddbasic_topbar_menu.removeClass('js-topbar-toggled');

        ddbasic_header_wrapper.show();
        break;
      case 'menu':
        ddbasic_topbar_menu.toggleClass('js-topbar-toggled');

        ddbasic_topbar_search.removeClass('js-topbar-toggled');
        ddbasic_topbar_user.removeClass('js-topbar-toggled');

        ddbasic_header_wrapper.hide();
        break;
    }
  }


  // When ready start the magic.
  $(document).ready(function () {
    /*
     * Toggle functionality for topbar menu
     */

    // Link elements
    var ddbasic_topbar_link = $(".js-topbar-link");

    // Header wrapper
    var ddbasic_header_wrapper = $('.header-wrapper');

    // Attach some onclick/touch magic
    ddbasic_topbar_link.on('click touchstart', function(event) {

      var clicked = $(this);

      // Toggle elements based on wich link is clicked.
      // User link was clicked.
      if (clicked.hasClass('topbar-link-user')) {
        toggle_topbar('user');
        // Add focus to login field.
        $('.js-topbar-user #edit-name').focus();
      }
      // Search link was clicked
      if (clicked.hasClass('topbar-link-search')) {
        toggle_topbar('search');
        // Add focus to search field.
        $('.js-topbar-search #edit-search-block-form--2').focus();
      }
      // Menu link was clicked
      if (clicked.hasClass('topbar-link-menu')) {
        toggle_topbar('menu');
        clicked.focus();
      }

      // Set clicked to active link if not already active.
      // This makes it possible to toggle the same element on/off.
      if (clicked.hasClass('active')) {
        clicked.removeClass('active');
        ddbasic_header_wrapper.hide();
        clicked.focus();
        // Reset background color to avoid link being in focus when user toggle same element.
        // This only apply to touchscreen devices.
        ddbasic_topbar_link.one('touchend', function() {
          clicked.css('background-color', 'inherit');
        });

        // Add a class to body to determine if body should be fixed.
        $('body').removeClass('js-fixed-body');
      }
      else {
        // Make sure hardcoded style is removed
        clicked.css('background-color', '');
        // Remove active class from all links and add .active to clicked link.
        ddbasic_topbar_link.removeClass('active');
        clicked.addClass('active');

        $('body').addClass('js-fixed-body');
      }

      // Prevent default (href).
      event.preventDefault();

    });

    // Remove active class from topbar menu by default.
    ddbasic_topbar_link.removeClass('active');

    // Toggle header off to begin with.
    ddbasic_header_wrapper.hide();


    // TEMPORARY
    // User test! Remove this if it is here after 18/6-2013, do it! :)

    // Show search on frontpage and search pages.
    var path = window.location.pathname;

    if (path.indexOf('/search', 0) === 0) {
      $('#search-block-form').clone().insertBefore('.pane-ting-search-sort-form');
    }

    if (path === '/') {
      $('a.topbar-link-search').click();
    }

    // TEMPORARY end


    /*
     * Add .fixed class to site header upon scroll
     */

    var header = $('.site-header');
    var pos = header.offset();

    // Fix Drupal administration menu in relation to the fixed header.
    var body_paddding = parseInt($('body').css('paddingTop'), 10);
    if (body_paddding) {
      pos.top = pos.top - body_paddding;
    }

    // Get calculations for header position on the page and their sizes.
    var header_pos_relative = pos.top + 5;

    // User to keep track of headers fixed state.
    var header_fixed = false;

    // Hook into window scroll event (it will fire when attched if window is
    // scrolled down).
    $(window).scroll(function(){
      var top = $(window).scrollTop();

      // Figure out if we should fix position the header or not.
      if (top > header_pos_relative && !header_fixed) {
        header.addClass('js-fixed');
        header_fixed = true;

        // TEMPORARY
        // User test! Remove this if it is here after 18/6-2013, do it! :)

        if ($('.search').hasClass('js-topbar-toggled')) {
          $('.header-wrapper').slideToggle('fast');
          $('a.topbar-link-search').removeClass('active');
        }

        // TEMPORARY end
      }
      else if (top < header_pos_relative && header_fixed) {
        header.removeClass('js-fixed');
        header_fixed = false;

        // TEMPORARY
        // User test! Remove this if it is here after 18/6-2013, do it! :)

        if ($('.search').hasClass('js-topbar-toggled')) {
          $('.header-wrapper').show();
          $('a.topbar-link-search').addClass('active');
        }

        // TEMPORARY end
      }
    });

    /*
     * Add news category menu as submenu to news in main menu
     */
    if ($(".pane-news-category-menu").length > 0) {
      $(".pane-news-category-menu .sub-menu").clone().appendTo('.menu-mlid-1793');
      // Do some class magic to get the submenu reacting like drupal standard submenus.
      $(".main-menu .sub-menu").addClass('main-menu');
      $(".main-menu .sub-menu").removeClass('sub-menu');
      // Add sub-menu-wrapper class to texonomy menu
      $(".pane-news-category-menu").addClass('sub-menu-wrapper');
    }

    /*
     * Add event category menu as submenu to event in main menu
     */
    if ($(".pane-event-category-menu").length > 0) {
      $(".pane-event-category-menu .sub-menu").clone().appendTo('.menu-mlid-1816');
      // Do some class magic to get the submenu reacting like drupal standard submenus.
      $(".main-menu .sub-menu").addClass('main-menu');
      $(".main-menu .sub-menu").removeClass('sub-menu');
      // Add sub-menu-wrapper class to texonomy menu
      $(".pane-event-category-menu").addClass('sub-menu-wrapper');
    }
  });

})(jQuery);
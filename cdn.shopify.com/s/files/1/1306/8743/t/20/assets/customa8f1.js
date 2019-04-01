/*

Flow by WeTheme (http://www.wetheme.com)
Custom JS

*/

/* Mapping from sectionId to Slider instance */
var sliders = {};


function block_select(event) {
    // Stop animation and show block when selected in the Slideshow section
    var slider = sliders[event.detail.sectionId];
    if (slider) {
        var index = parseInt(event.target.dataset.slideIndex);
        slider.show_slide(index);
    }
}

function block_deselect(event) {
    // Resume animation when block is deselected in the Slideshow section
    var slider = sliders[event.detail.sectionId];
    if (slider) {
        slider.start_animation();
    }
}

function get_section_name(event) {
    var section = null;
    if (event && event.detail) {
        var data = {};
        var dataset = event.target.dataset;
        for (var key in dataset) {
            if (dataset.hasOwnProperty(key) && key.indexOf('themeEditorSection-') === 0) {
                data = JSON.parse(dataset[key]);
            }
        }
        if (data.hasOwnProperty('type')) {
            section = data['type'];
        }
    }
    return section;
}

document.addEventListener('shopify:section:load', load_all);
document.addEventListener('shopify:section:unload', unload_all);
window.addEventListener("load", load_all);

// Listen to stylesheet changes in Shopify theme editor
// (e.g. General settings -> Typography) - it doesn't emit section change events
try {
    window.parent.messenger.on('stylesheetContent', load_all);
    window.addEventListener('unload', function () {
        window.parent.messenger.off('stylesheetContent', load_all);
    });
} catch (e) {
    console.log('Unable to attach to stylesheetContent change');
}


// Run the fade in animation as soon as possible, don't wait for full content load
$(document).ready(function () {
    load_show_on_scroll();
});

function load_all(event) {
    document.addEventListener('shopify:block:select', block_select);
    document.addEventListener('shopify:block:deselect', block_deselect);

    var section = get_section_name(event);

    if (!section || section === 'products-block') {
        load_homepage_fading();
        load_featured_masonry();
    }
    load_blog_masonry();
    if (!section || section === 'slideshow') {
        // Do not reload slider when header or footer is changed
        load_slider(event && event.target);
    }
    if (!section || section === 'featured-blog') {
        load_carousel();
    }
    if (!section || section === 'text-adverts') {
        load_TextAdvertCarousel();
    }
    if (!section || section === 'product-template') {
        load_ownCarousel();
        load_swatches();
        load_reviews();
        load_imageZoomEvents();
    }
    if (!section || section === 'indiv-product') {
        load_indiv_product_slider();
        load_product_review_badges();
    }
    if (!section || section === 'product-template' || section === 'indiv-product') {
        load_quantity_selector();
        load_option_selectors(event.target);
        load_tabs();
    }
    if (!section || section === 'header') {
        load_accessible_menu();
        load_sticky_header();
        load_sticky();
        load_log_in();
        load_search_drawer();
    }
    if (!section || section === 'instagram') {
        load_instagram();
    }
    if (!section || section === 'collection-list') {
        load_home_collection();
    }
    if (!section || section === 'products-block') {
        load_product_block();
    }
    if (!section || section === 'home-hero' || section === 'video') {
        load_youtube_api();
        load_vimeo_api();
    }
    if (!section || section === 'home-hero') {
        load_hero();
    }
    if (!section || section === 'map') {
        load_googlemaps();
    }
    if (!section || section === 'feature-row' || section === 'image-with-text-overlay') {
        load_parallax();
    }
    if (!section || section === 'collection-template') {
        load_collection_tag_filter();
        load_infinite_scroll();
        load_product_review_badges();
    }
    if (!section || section === 'featured-products') {
        load_product_review_badges();
    }
    if (!section || section === 'collection-template' || section === 'featured-products' || section === 'product-template') {
        load_shop_now();
    }
    if (!section) {
        load_drawer_sticky_menu();
    } else {
        load_show_on_scroll();
    }

    //Close drawers when clicked on drawer overlay
    $('#DrawerOverlay').off('click').on('click', function (evt) {
        if (timber.LeftDrawer.drawerIsOpen) {
            timber.LeftDrawer.close();
            evt.stopImmediatePropagation();
        }
        if (timber.RightDrawer.drawerIsOpen) {
            timber.RightDrawer.close();
            evt.stopImmediatePropagation();
        }
    });

    // Hide mobile search bar when disabled
    var has_search = $('.search-button').length > 0;
    $('.input-group.search-bar').toggle(has_search);
}

function unload_all() {
    document.removeEventListener('shopify:block:select', block_select);
    document.removeEventListener('shopify:block:deselect', block_deselect);
    sliders = {};
}


// Show on scroll animation
function load_show_on_scroll() {
    $(window).on('scroll', function () {
        show_on_scroll_checker();
    });
    show_on_scroll_checker();

    new WOW().init();
}

function show_on_scroll_checker() {
    var window_height = $(window).height();
    $('.show-on-scroll').each(function (index, section) {
        var rect = section.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top < window_height) {
            $(section).removeClass('show-on-scroll').addClass('shown-on-scroll animated fadeIn');
        }
    });
}


// Fading on homepage blocks
function load_homepage_fading() {
    apply_fade_effect('.homepage-featured-products-grid', '.homepage-featured-grid-item');
    apply_fade_effect('.collection-grid', '.homepage-collection-grid-item');
}

function apply_fade_effect(parent_selector, child_selector) {
    $(parent_selector).each(function (index, parent) {
        apply_fade_effect_to_element(parent, child_selector);
    });
}

function apply_fade_effect_to_element(element, child_selector) {
    var children = $(element).find(child_selector);

    children.on('mouseenter mouseleave', function(e) {
        children.not(this).stop(true).fadeTo('fast', e.type === 'mouseenter' ? 0.2 : 1);
    });
}

// Mobile Blog

function load_carousel() {
    $(".homepage-blog-mobile").addClass('owl-carousel owl-theme').owlCarousel({
       items: 1,
       autoHeight: true
    });

    $("#homepage-collection-mobile").addClass('owl-carousel owl-theme').owlCarousel({
       items: 1,
       autoHeight: true
    });
}

function load_sticky() {
    var $productSticky = $('.product-sticky.ui.sticky');
    if ($productSticky.length === 0) {
        return;
    }

    var $window = $(window);

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize > 768) {
            var context = $('.context');

            if (context.height() > $productSticky.height()) {
                var $site_header = $('.site-header');
                var offset = 0;
                if ($site_header.hasClass('sticky-header')) {
                    offset = $site_header.outerHeight() || 0;
                }
                $productSticky
                    .sticky({
                        context: '.context',
                        // We might need offset for custom header
                        offset: offset,
                        bottomOffset : 50,
                        observeChanges: true
                   });
            }
        } else {
            // console.log(windowsize);
        }
    }
    // Execute on load
    checkWidth();
    // Reexecute on page resize
    $(window).resize(checkWidth);
    // Reexecute when product review form opens (it changes page height)
    if ($('#shopify-product-reviews').length >= 0) {
        // The reviews will appear in the future, we need to wait for it
        var wait_for_review = setInterval(function () {
            var review_button = $('.spr-summary-actions-newreview');
            if (review_button.length === 0) {
                return;
            }
            clearInterval(wait_for_review);
            review_button.on('click', function () {
                // Reexecute the sticky
                checkWidth();
            });
        }, 1000);
    }
}

// Quantity Selector

function load_quantity_selector() {
    var $quantity = $('.nonajax-quantity-selector');
    if ($quantity.length === 0) {
        return;
    }

    var $input = $quantity.find('input');
    $quantity.find('.js-qty__adjust--minus').on('click', function () {
        $input.val(Math.max(1, parseInt($input.val()) - 1));
    });
    $quantity.find('.js-qty__adjust--plus').on('click', function () {
        $input.val(parseInt($input.val()) + 1);
    });
}

// Load ownCarousel on Product

function load_ownCarousel() {
  var product_images = $("#product-images-mobile");
  if (product_images.length === 0) {
      return;
  }
  var is_shop_now = product_images.closest('#ShopNowContainer').length > 0;

  var options;
  if (is_shop_now) {
      // Shop now
      options = {
          center: true,
          items: 2,
          autoHeight: true,
          dots: true
      };
  } else {
      // Mobile menu
      options = {
          items: 1,
          autoHeight: true
      };
  }

  product_images.owlCarousel(options);
  if (is_shop_now) {
    // Clicking on next and previous item should select it
    $(document).on('click', '#product-images-mobile .owl-item', function () {
      n = $(this).index();
      $("#product-images-mobile").trigger('to.owl.carousel', n);
    });
  }

    owlCarouselPaginationFix(product_images);
    owlCarouselSlowImageLoadFix(product_images);

}

//owl carousel pagination fix
function owlCarouselPaginationFix(product_images){

    product_images.on('refreshed.owl.carousel changed.owl.carousel', function(event) {

        $('#product-images-mobile .owl-dots').each(function(index, ele){

            if($(ele).children().length > 1){

                $(ele).removeClass('disabled');

            }

        });

    });
}

//owl carousel slow image load fix
function owlCarouselSlowImageLoadFix(product_images){

    product_images.on('refreshed.owl.carousel', function(event) {

        $(this).delay(500).queue(function() { //wait for owlCarousel to catch up.

            if($('.owl-stage-outer', product_images).height() == 1){

                $('.owl-stage-outer', product_images).css({'height' : 'auto'});

            }

        });

    });
}

// Load Product

function Product(element) {
    this.element = element;
    if (!this.element) {
        return;
    }
    this.$element = $(this.element);
    this.sectionId = this.element.dataset.sectionId;
    var product_json_el = document.querySelector('#ProductJson-' + this.sectionId);
    if (!product_json_el) {
        // No product on the page - maybe just product placeholder
        return;
    }
    this.product = JSON.parse(product_json_el.innerText);
    this.$selects = this.$element.find('.selector-wrapper select');
    this.$selects.on('change', this.on_select_change.bind(this));
    this.$original_select = this.$element.find('.original-select');

    this.thumbnail_changes_variant = this.$element.find('#thumbnail_changes_variant').val() === 'true';
    this.$main_image = this.$element.find('.product-single__photo');
    this.$main_image_wrapper = this.$main_image.closest('.product-single__photo-wrapper');
    this.$thumbnails = this.$element.find('.product-single__thumbnail-wrapper');
    this.$thumbnails.on('click', function (e) {
        // Handle product image thumbnails
        e.preventDefault();
        this.on_thumbnail_click(e.currentTarget, true);
    }.bind(this));

    this.on_select_change();
}

Product.prototype.on_select_change = function () {
    var values = this.$selects.map(function (index, select) {
        return $(select).val();
    });
    var matching_variants = this.product.variants.filter(function (variant) {
        for (var i = 0; i < values.length; i++) {
            if (values[i] !== variant.options[i]) {
                return false
            }
        }
        return true;
    });
    if (matching_variants.length === 0) {
        this.update_variant(null);
    } else {
        this.update_variant(matching_variants[0]);
    }
};

Product.prototype.on_thumbnail_click = function (thumbnail, update_variant) {
    var $thumbnail = $(thumbnail);
    var link = $thumbnail.attr('href');

    this.$main_image
        .attr('src', link)
        .data('imageZoom', $thumbnail.data('imageZoom'))
        .removeClass('js__image_already_loaded');

    this.$main_image_wrapper.trigger('zoom.destroy').find('.zoomImg').remove();

    loadImageZoom();

    // select variant
    if (this.thumbnail_changes_variant && update_variant) {
        var variant_id = $(thumbnail).data('variant');
        if (variant_id) {
            this.on_variant_selected(variant_id);
        }
    }
};

Product.prototype.on_variant_selected = function (variant_id) {
    var matching_variants = this.product.variants.filter(function (variant) {
        return variant.id == variant_id;
    });
    if (matching_variants.length === 0) {
        this.update_variant(null);
    } else {
        var variant = matching_variants[0];
        this.update_variant(matching_variants[0]);
        for (var i = 0; i < variant.options.length; i++) {
            $('#SingleOptionSelector-' + i).val(variant.options[i]);
        }
    }
};

Product.prototype.update_variant = function (variant) {
    timber.productPage({
        money_format: window.Currency ? window.Currency.moneyFormats[window.Currency.shopCurrency].money_format : window.default_currency_format,
        variant: variant,
        element: this.$element
    });
    if (variant) {
        if (variant.featured_image) {
            // update selected images from thumbnails
            var $newImageThumb = this.$element.find('.product-single__thumbnail[data-image-id="' + variant.featured_image.id + '"]');
            if ($newImageThumb.length > 0) {
                this.on_thumbnail_click($newImageThumb.parent(), false);
            }
        }

        this.$original_select.val(variant.id);

        var is_indiv_product = $(this.element).closest('.shopify-section').hasClass('homepage-section--indiv-product-wrapper');
        var has_more_variants = this.product.variants.length > 1;
        if (history.replaceState && !is_indiv_product && has_more_variants) {
            // Change url to include variant if we're not on homepage
            var search = [];
            if (window.location.search.length > 1) {
                // select non-variant query params
                search = window.location.search.slice(1).split('&').filter(function (q) {
                    return q.indexOf('variant=') !== 0;
                });
            }
            // add current variant
            search.push('variant=' + variant.id);

            // set the url to include the variant
            var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + search.join('&');
            window.history.replaceState({path: newurl}, '', newurl);
        }

        var is_sale = variant.compare_at_price && variant.compare_at_price > variant.price;
        $('.product-page--sale-badge').toggleClass('hide', !is_sale);

        if ($('.product-details-wrapper').data('show-sku')) {
            $('.js__currentVariantSKU').text(variant.sku);
            $('.product__meta--sku').toggleClass('hide', !variant.sku);
        }
    }
};

function load_option_selectors(section) {
    var root = section || document;
    Array.prototype.forEach.call(root.querySelectorAll('.product-single'), function (element) {
        var product = new Product(element);
    });
}

// Product Tabs

function load_tabs() {
    $('ul.tabs').each(function(){
        var active, content, links = $(this).find('a');
        active = links.first().addClass('active');
        content = $(active.attr('href'));
        links.not(':first').each(function () {
            $($(this).attr('href')).hide();
        });
        $(this).find('a').click(function(e){
            active.removeClass('active');
            content.hide();
            active = $(this);
            content = $($(this).attr('href'));
            active.addClass('active');
            content.fadeIn();
            return false;
        });
    });
}

// Load swatches on product page

function load_swatches() {
    // Swatches now disabled
    /*
    $('.swatch :radio').change(function() {
        var $this = $(this);
        var optionIndex = $this.closest('.swatch').attr('data-option-index');
        var optionValue = $this.val();
        $this
            .closest('form')
            .find('#SingleOptionSelector-' + optionIndex)
            .val(optionValue)
            .trigger('change');
    });
    */
}

// Reload reviews on change in theme admin

function load_spr() {
    // wait for SPR script to be loaded
    var wait_for_review = setInterval(function () {
        if (!window.SPR || !window.SPR.$) {
            return;
        }
        clearInterval(wait_for_review);
        window.SPR.initDomEls();
        window.SPR.loadProducts();
        window.SPR.loadBadges();
    }, 500);
}

function load_reviews() {
    if ($('#shopify-product-reviews').length >= 0) {
        load_spr();
    }
}

// Reload review badges on change in theme admin

function load_product_review_badges() {
    if ($('#shopify-product-reviews-badge').length >= 0) {
        load_spr();
    }
}

// Flexslider in Indiv Product section

function load_indiv_product_slider() {
    var slider = $('.homepage-sections--indiv-product-slider');
    slider.flexslider({
        directionNav: false,
        slideshow: false,
        animation: "slide"
    });

    slider.find('img').removeClass('hide');
}

// Blog Masonry

function load_blog_masonry() {
    var $grid2 = $('.blog-article-wrapper').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.blog-grid-item',
        // use element for option
        columnWidth: '.blog-grid-item',
        gutter: '.blog-gutter-sizer',
        percentPosition: true
    });
}


// Featured Products Masonry

function load_featured_masonry() {
    var $grid = $('.homepage-featured-products-grid').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.homepage-featured-grid-item',
        // use element for option
        columnWidth: '.homepage-featured-grid-item',
        percentPosition: true,
        gutter: '.gutter-sizer'
    });

    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });
}

// Accessible Menu JS
function load_accessible_menu() {
    $(".site-nav").addClass("js");
    $(".site-nav li").hover(
        function() {
            $("ul.site-nav__dropdown", $(this)).fadeIn();
        },
        function() {
            $("ul.site-nav__dropdown", $(this)).fadeOut();
        });
    $(".site-nav li a").focus(function() { // main nav anchor focus
       $(this).parent().children("ul").fadeIn();
    });
    $(".site-nav li li a").unbind(); // unbind hide drop downs from sub nav anchors
}

function resize_sticky_header() {
    var stickyHeader = $('.sticky-header');
    var height = Math.max(stickyHeader.first().outerHeight(true), stickyHeader.last().outerHeight(true));
    stickyHeader.parent().innerHeight(height);
}

// Sticky page header
function load_sticky_header(skip_reload_on_image_load) {
    var stickyHeader = $('.sticky-header');
    stickyHeader
        .sticky({
            observeChanges: true,
            onStick: function () {
                var $this = $(this);
                $this.parent().innerHeight($this.outerHeight(true));
            },
            context: 'body',
            silent: true
        });

    var $logo = $('.site-header__logo-image img');
    if (!skip_reload_on_image_load) {
        // Update header size when logo is loaded
        $logo.css('visibility', 'hidden');
        $logo.imagesLoaded(function () {
            load_sticky_header(true);
        });
    } else {
        resize_sticky_header();
        $logo.css('visibility', 'visible');
    }

    $(window).off('resize', resize_sticky_header).on('resize', resize_sticky_header);
}

// Instagram section

var INSTAGRAM_SELECTOR = '.instagram-wrapper';
var INSTAGRAM_TEMPLATE = '<div class="grid__item %grid% homepage-instagram-indiv"><a href="\{\{link\}\}" target="_blank"><div style="background-image: url(\{\{image\}\})" class="instagram-image"></div><div class="homepage-instagram-hover"><span class="fa-stack fa-2x"><i class="fa fa-circle fa-stack-2x fa-inverse"></i><i class="fa fa-instagram fa-stack-1x"></i></span></div></a></div>';

var INSTAGRAM_OPTIONS = {
    get: 'user',
    userId: 'self',
    resolution: 'standard_resolution'
};

var instagrams = {};

function instagram_init(instagram_element) {
    var section = instagram_element.dataset.id;

    // Read the instagram token
    var token_input = document.querySelector('#token-' + section);
    if (!token_input) {
        // We don't have a token, no data are available and placeholder is shown, just apply fade effect
        apply_fade_effect_to_element(instagram_element, '.grid__item');
        return;
    }
    var token = token_input.value;

    // Set up options for instafeed
    var target = document.querySelector('#instafeed-' + section),
        gridWidth = target.dataset.gridWidth,
        rows = parseInt(target.dataset.rows),
        grid = parseInt(target.dataset.grid);

    var options = $.extend({}, {
        target: target,
        accessToken: token,
        template: INSTAGRAM_TEMPLATE.replace('%grid%', gridWidth),
        limit: rows * grid,
        error: function (message) {
            console.error("Unable to download instagram data: " + message);
        },
        after: function () {
            // Apply the fade effect
            // global method 'apply_fade_effect_to_element' defined in custom.js.liquid
            apply_fade_effect_to_element(target, '.grid__item');
        },
        success: function () {
            // Remove all previous images
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
        }
    }, INSTAGRAM_OPTIONS);

    // Fetch and show instagram pictures
    var feed = new Instafeed(options);
    feed.run();
}

function load_instagram() {
    var instagram_elements = document.querySelectorAll(INSTAGRAM_SELECTOR);
    Array.prototype.forEach.call(instagram_elements, instagram_init);
}


// Home Collection section

function load_home_collection() {
    var homepageCollection = $('.homepage-collection-grid-item');
    homepageCollection.on('mouseenter mouseleave', function(e) {
       homepageCollection.not(this).stop(true).fadeTo('fast', e.type == 'mouseenter' ? 0.2 : 1);
    });
}


// Product Block section

function load_product_block() {
    var $grid = $('.homepage-featured-products-grid').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.homepage-featured-grid-item',
        // use element for option
        columnWidth: '.homepage-featured-grid-item',
        percentPosition: true,
        gutter: '.gutter-sizer'
    });

    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
    });
}

function load_youtube(element) {
    var autoplay = element.dataset.homepageHeroVideoAutoplay === "true",
        mute = element.dataset.homepageHeroVideoMute === "true",
        loop = element.dataset.homepageHeroVideoLoop === "true";
    player = new YT.Player(element.id, {
        width: 746,
        videoId: element.dataset.homepageHeroVideoLink,
        playerVars: {
            showinfo: 0,
            modestbranding: 1,
            rel: 0,
            autoplay: autoplay ? 1 : 0
        },
        events: {

            onReady: function (event) {
                var el = document.getElementById(element.id);
                if (mute) {
                    event.target.mute();
                    if (autoplay) {
                        event.target.playVideo();
                    }
                }

                if (autoplay) {
                    hideVideoOverlays(el);
                }

                registerVideoPlayButton(el, 'youtube', event.target);
            },
            onStateChange: function (event) {
                if (event.data === YT.PlayerState.ENDED && loop) {
                    event.target.playVideo();
                }
            }
        }
    });
}

function load_youtube_all() {
    $('.homepage-hero-youtube-video').each(function (index, el) {

        load_youtube(el);

    });
}

function load_youtube_api() {
    if (!document.querySelector('.homepage-hero-youtube-video')) {
        // No youtube elements, do not load youtube API
        return;
    }

    if (!document.querySelector('#youtube_api')) {
        // Youtube API is not yet loaded, create script that loads it
        create_script("youtube_api", "https://www.youtube.com/player_api");

        // Call 'youtube_load_all' as soon as the API is loaded
        window.onYouTubePlayerAPIReady = load_youtube_all;
    } else if (!window.YT) {
        // Script for loading youtube API is there, but youtube is not yet loaded,
        // load_youtube_all will be called when script finishes loading
    } else {
        // We already have youtube API loaded, call 'load_youtube_all'
        load_youtube_all();
    }
}

function load_vimeo(element) {

    var player = new Vimeo.Player(element.id);

    player.ready().then(function(){

        registerVideoPlayButton(element, 'vimeo', player);

        if (document.querySelector('#' + element.id).dataset.vimeoAutoplay === "true") {
            hideVideoOverlays(element);
        }

        if (document.querySelector('#' + element.id).dataset.homepageHeroVideoMute === "true") {
            player.setVolume(0);
        }

    }).catch(function (e) {

        document.getElementById(element.id).innerText = e;

    });

}

function load_vimeo_all() {
    $('.homepage-hero-vimeo-video').each(function (index, el) {
        load_vimeo(el);
    });
}

function load_vimeo_api() {
    if (!document.querySelector('.homepage-hero-vimeo-video')) {
        // No vimeo elements, do not load vimeo API
        return;
    }

    if (!document.querySelector('#vimeo_api')) {
        // Vimeo API is not yet loaded, create script that loads it
        var script = create_script("vimeo_api", "https://player.vimeo.com/api/player.js");

        if (script.readyState) {
            // IE
            script.onreadystatechange = function() {
                if (element.readyState == "loaded" || element.readyState == "complete") {
                    element.onreadystatechange = null;
                    load_vimeo_all();
                }
            };
        } else {
            // Other browsers
            script.onload = function() {
                load_vimeo_all();
            };
        }
    } else if (!window.Vimeo) {
        // Script for loading vimeo API is there, but vimeo is not yet loaded,
        // load_vimeo_all will be called when script finishes loading
    } else {
        // We already have vimeo API loaded, call 'load_vimeo_all'
        load_vimeo_all();
    }
}

// register events on the video play button, plays video and hides certain elements.
function registerVideoPlayButton(element, type, player){

    var videoParent = element.closest('.homepage-hero-content--video');
    if (!videoParent) {
        return;
    }
    var $playButton = $(".homepage-video-play-button", videoParent);

    // bind custom play button events
    $playButton.on("click", function(event) {

        if(type === 'youtube') {

            player.playVideo();

        } else if(type === 'vimeo') {

            player.play();

        }

        hideVideoOverlays(element);

    });

}

function hideVideoOverlays(videoElement){

    var videoParent = videoElement.closest('.homepage-hero-content--video');

    // hide some things when we press play.
    $(".js__hide-on-play", videoParent).fadeOut("slow");

    //we need to hide the ::before pseudo-element on the container when we press play.
    $('.homepage-hero-content-overlay-wrapper', videoParent).addClass('hidden');

}

function create_script(id, src) {
    var tag = document.createElement('script');
    tag.id = id;
    tag.src = src;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    return tag;
}

function hover_effect($link) {
    var $overlay = $('#' + $link.data('overlayId'));
    $link.hover(
       function () {
           $overlay.addClass("active");
       },
       function () {
           $overlay.removeClass("active");
        });

    // Apply hover on page load
    if ($link.is(':hover')) {
       $overlay.addClass("active");
    }
}

function load_hero() {
    $('.homepage-hero-content-overlay-menu-item').imagesLoaded( { background: true }, function() {
        $(".homepage-hero-text-advert-link").each(function (index, link) {
            hover_effect($(link));
        });

        $('.homepage-hero-menu li').each(function (index, link) {
            hover_effect($(link));
        });
    });
}

function load_drawer_sticky_menu() {
    // Fix that scrolling inside drawer propagates to page content on iPad
    // it's an workaround for https://bugs.webkit.org/show_bug.cgi?id=153852
    // can be replaced by setting "overflow: hidden" to js-drawer-open
    // class after the bug is fixed
    var body_scroll = 0;
    $(document.body).off('beforeDrawerOpen.timber').on('beforeDrawerOpen.timber', function () {
        if ($(document.body).css('position') === 'fixed') {
            return;
        }
        body_scroll = $(window).scrollTop();
        $(document.body).css({
            position: 'fixed',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            marginTop: '-' + body_scroll + 'px'
        });
        load_sticky_header();
        load_sticky();
    });
    $(document.body).off('beforeDrawerClose.timber').on('beforeDrawerClose.timber', function () {
        $(document.body).css({
            position: 'static',
            height: 'auto',
            width: 'auto',
            overflow: 'auto',
            marginTop: '0'
        });
        $(window).scrollTop(body_scroll);
        load_sticky_header();
        load_sticky();
    });
}


// Slider section

var DEFAULT_OPTIONS = {
    directionNav: true,
    controlNav: false,
    startAt: 0
};

var SLIDER_SELECTOR = '.flexslider-homepage';
var SLIDER_REENABLE_INTERVAL = 6000;


/* Initialize all the sliders */
function load_slider(section) {
    sliders = {};
    section = section || document;
    var slider_elements = section.querySelectorAll(SLIDER_SELECTOR);
    Array.prototype.forEach.call(slider_elements, function (slider_element) {
        // Prevent flickering in the flexslider by setting fixed width of the slides
        $(slider_element).find('li').css('width', $(slider_element).width());

        sliders[slider_element.dataset.sliderId] = new Slider(slider_element);
    });
}

function Slider(element) {
    this.$element = $(element);
    this.restartTimer = null;
    this.running = true;

    this.get_speed = function () {
        return parseInt(this.$element.data('sliderSlideTime'));
    };

    this.get_animation = function () {
        return this.$element.data('sliderAnimation');
    };

    this.show_slide = function (index) {
        if (this.get_speed() > 0) {
            this.$element.flexslider("stop");
        }
        this.running = false;
        this.$element.flexslider(index);
    };

    this.start_animation = function () {
        this.running = true;
        // Don't start animation when autorotate is disabled
        if (this.get_speed() > 0) {
            this.$element.flexslider("play");
        }
    };

    this.on_slide_change = function(slider) {
        speed = this.get_speed();
        if (this.running && !slider.playing && speed > 0) {
            // restart autoscroll after given interval since last interaction
            clearTimeout(this.restartTimer);
            this.restartTimer = setTimeout(function () {
                slider.play();
            }, Math.max(0, SLIDER_REENABLE_INTERVAL - speed));
        }
    };

    this.configure = function (options) {
        var speed = this.get_speed();
        var $navigation = this.$element.parent().find(".custom-navigation");
        var opts = $.extend({
                controlsContainer: $navigation,
                slideshowSpeed: speed,
                animation: this.get_animation(),
                slideshow: speed > 0,
                useCSS: false, // Fix for background disappearing: http://stackoverflow.com/a/27298397
                pauseOnAction: true,
                after: this.on_slide_change.bind(this),
                customDirectionNav: $navigation.find('a')
            }, DEFAULT_OPTIONS, options);
        this.$element.flexslider(opts);
    };
    this.configure({});

    // flexslider stops the animation when the page is not focused, this breaks when the section is
    // changed in theme admin because it triggers 'blur' event when another iframe is selected
    $(window).unbind('blur');
}

function load_collection_tag_filter() {
    /* Product Tag Filters - Good for any number of filters on any type of collection pages */
    var collFilters = jQuery('.coll-filter');
    collFilters.change(function () {
        var newTags = [];
        collFilters.each(function () {
            var val = jQuery(this).val();
            if (val) {
                newTags.push(val);
            }
        });
        if (newTags.length) {
            var query = newTags.join('+');
            window.location.href = $('#link-to-tag-generic a').attr('href').replace(/\/tag($|\?)/, '/' + query + '$1');
        } else {
            window.location.href = $('#link-to-collection').val();
        }
    });
}

var rellax_by_id = {};
var was_mobile = false;
var resize_handler = null;
var rellax_elements = [];

function apply_parallax(id) {
    var old_relax = rellax_by_id[id];
    if (old_relax) {
        old_relax.destroy();
    }
    rellax_by_id[id] = new Rellax('#' + id, {
        center: true,
        speed: -4
    });
}

function parallaxes(apply) {
    Array.prototype.forEach.call(document.querySelectorAll('.rellax'), function (el) {
        el.style.transform = 'translate3d(0,0,0)';
        if (apply) {
            apply_parallax(el.id);
        }
    });
}

function load_parallax() {
    rellax_elements = document.querySelectorAll('.rellax');

    if (rellax_elements.length === 0) {
        // There is no rellax element
        return;
    }

    if ($(window).width() <= 768) {
        // No parallax on mobile
        was_mobile = true;
    } else {
        setTimeout(parallaxes.bind(null, true), 100);
    }

    if (resize_handler) {
        window.removeEventListener(resize_handler);
    }
    resize_handler = window.addEventListener('resize', function() {
        for (var key in rellax_by_id) {
            if (rellax_by_id.hasOwnProperty(key)) {
                var id = key;
                var rellax = rellax_by_id[key];
                rellax.destroy();
            }
        }
        rellax_by_id = {};
        setTimeout(function () {
            parallaxes($(window).width() > 768);
        }, 100);
        /*

            if (!was_mobile) {
                Array.prototype.forEach.call(rellax_elements, function (el) {
                    if (rellax_by_id.hasOwnProperty(el.id)) {
                        rellax_by_id[el.id].destroy();
                        delete rellax_by_id[el.id];
                        setTimeout(function () {
                            el.style.transform = 'translate3d(0,0,0)';
                        }, 100);
                    }
                });
            }
            was_mobile = true;
        } else {
            if (was_mobile) {
                Array.prototype.forEach.call(rellax_elements, function (el) {
                    apply_parallax(el.id)
                });
            }
            was_mobile = false;
        }
        */
    });
}

// Infinite scrolling

function Pagination() {
    // how many pixels from bottom should next page start loading
    this.PAGINATION_LOAD_OFFSET = 1200;
    // how often should the scroll position should be checked (in milliseconds)
    this.SCROLL_DELAY = 200;

    this.PAGINATION_SELECTOR = '.pagination';
    this.COLLECTION_MAIN_SELECTOR = '.collection-main-body-inner';
    this.COLLECTION_HEADER_SELECTOR = '.collection-main-central-header';
    this.COLLECTION_ITEM_SELECTOR = '.grid__item';
    this.COLLECTION_ITEM_EXCLUDE_SELECTOR = '.collection-central-description-block';

    this.$w = $(window);
    this.$doc = $(document);
    this.$collection = $(this.COLLECTION_MAIN_SELECTOR);
    this.$loading_indicator = $('.pagination-loading');
    this.loading = false;
    this.fully_loaded = false;
    this.scroll_timeout = null;

    this.scroll_handler = this.scroll_handler.bind(this);
    this.check_infinite_scroll = this.check_infinite_scroll.bind(this);
    this.install_scroll_handler();
}

Pagination.prototype.install_scroll_handler = function () {
    $(window).on("scroll", this.scroll_handler);
};

Pagination.prototype.uninstall_scroll_handler = function () {
    $(window).off("scroll", this.scroll_handler);
};

Pagination.prototype.scroll_handler = function () {
    if (this.scroll_timeout) {
        clearTimeout(this.scroll_timeout);
    }
    this.scroll_timeout = setTimeout(this.check_infinite_scroll, this.SCROLL_DELAY);
};

Pagination.prototype.check_infinite_scroll = function () {
    if (this.$doc.height() - this.PAGINATION_LOAD_OFFSET < (this.$doc.scrollTop() + this.$w.height())) {
        this.load_next_page();
    }
};

Pagination.prototype.set_loading = function (loading) {
    if (loading) {
        this.loading = true;
        this.$loading_indicator.show();
        $(this.PAGINATION_SELECTOR).hide();
    } else {
        this.loading = false;
        this.$loading_indicator.hide();
        $(this.PAGINATION_SELECTOR).show();
    }
};

Pagination.prototype.load_next_page = function () {
    if (this.loading) {
        return false;
    }
    var next_url = $(this.PAGINATION_SELECTOR).find('.pagination-next a').attr('href');
    if (!next_url || next_url === '#') {
        this.uninstall_scroll_handler();
        return;
    }
    this.set_loading(true);
    $.ajax({
        type: 'GET',
        url: next_url,
        dataType: "html"
    })
        .done(this.page_loaded.bind(this))
        .always(this.set_loading.bind(this, false));
};

Pagination.prototype.page_loaded = function (data) {
    var data_dom = $(data);
    this.$collection.append(
        data_dom.find(this.COLLECTION_HEADER_SELECTOR + ' > ' + this.COLLECTION_ITEM_SELECTOR).not(this.COLLECTION_ITEM_EXCLUDE_SELECTOR),
        data_dom.find(this.COLLECTION_MAIN_SELECTOR + ' > ' + this.COLLECTION_ITEM_SELECTOR)
    );
    $(this.PAGINATION_SELECTOR).replaceWith(data_dom.find(this.PAGINATION_SELECTOR));

    // Add handlers for 'shop now' buttons
    load_shop_now();
    // Load reviews
    load_product_review_badges();
};

var pagination = null;

function load_infinite_scroll() {
    if (pagination) {
        pagination.uninstall_scroll_handler();
        pagination = null;
    }

    var $pagination = $('.pagination-infinite');
    if ($pagination.length === 0) {
        return;
    }

    pagination = new Pagination();
}

// Base for all the secondary drawers, primary drawer is the Cart

function Drawer(container_selector, title_selector) {
    this.animation_duration = 800;
    this.$body = $('body');
    this.$drawer = $('#CartDrawer');
    this.$primary_container = $('#CartContainer');
    this.$primary_title = $('#CartTitle');
    this.$secondary_container = $(container_selector);
    this.$secondary_title = $(title_selector);

    this.$primary_group = this.$primary_container.add(this.$primary_title);
    this.$secondary_group = this.$secondary_container.add(this.$secondary_title);
}

Drawer.prototype.show_primary = function () {
    this.$secondary_group.addClass('hide');
    this.$primary_group.removeClass('hide');
};

Drawer.prototype.show_secondary = function () {
    this.$primary_group.addClass('hide');
    this.$secondary_group.removeClass('hide');
};

Drawer.prototype.open = function () {
    this.show_secondary();
    this.$body.one('afterDrawerClose.timber', this.close.bind(this));
    timber.RightDrawer.open();
};

Drawer.prototype.close = function () {
    // Show cart after the animation ends
    setTimeout(function () {
        this.show_primary();
    }.bind(this), this.animation_duration);
};

// Load Quick Shop in the Cart drawer

function ShopNow(url) {
    this.$body = $('body');
    this.drawer = new Drawer('#ShopNowContainer', '#ShopNowTitle');

    this.$body.on('afterAddItem.ajaxCart', this.animate_to_cart.bind(this));

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'html'
    })
        .done(this.page_loaded.bind(this))
        .error(function (error) {
            // FIXME: handle error correctly
            alert(error);
        });
}

ShopNow.prototype.page_loaded = function (data) {
    var data_dom = $(data);
    var product_single = data_dom.find('.product-single');

    // We don't want to see reviews
    product_single.find('#shopify-product-reviews').remove();
    // We want to see mobile slider instead of desktop version
    product_single.find('.product-single__photos').hide();
    product_single.find('#product-images-mobile').removeClass('large--hide');

    // Replace product html content
    var container = this.drawer.$secondary_container;
    container.find('.product-single').remove();
    container.append(product_single);

    // Replace product JSON
    container.find('#ProductJson-product-template').remove();
    container.append(data_dom.find('#ProductJson-product-template'));

    load_quantity_selector();
    load_ownCarousel();
    load_option_selectors(container[0]);
    load_tabs();
    load_swatches();

    if (typeof ajaxCart !== "undefined") {
        ajaxCart.init({
            formSelector: '#AddToCartForm',
            cartContainer: '#CartContainer',
            addToCartSelector: '#AddToCart',
            cartCountSelector: '#CartCount',
            moneyFormat: window.Currency ? window.Currency.moneyFormats[window.Currency.shopCurrency].money_format : window.default_currency_format
        });
    }

    this.drawer.open();
};


// Fade in animation between Quick Shop and Cart
ShopNow.prototype.animate_to_cart = function () {
    this.$body.one('afterCartLoad.ajaxCart', function () {
        timber.RightDrawer.close();
        setTimeout(function () {
            this.drawer.show_primary();
            timber.RightDrawer.open();
            this.drawer.$drawer.scrollTop(0);
        }.bind(this), this.drawer.animation_duration);
    }.bind(this));
};

function shop_now_handler(e) {
    var url = $(this).attr('href');
    new ShopNow(url);
    return false;
}

function load_shop_now() {
    $('.shop-now-button').off('click', shop_now_handler).on('click', shop_now_handler);
}

// Load Log In in the Cart drawer

function LogInDrawer(url) {
    this.drawer = new Drawer('#LogInContainer', '#LogInTitle');

    this.$body = $('body');

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'html'
    })
        .done(this.page_loaded.bind(this))
        .error(function (error) {
            // FIXME: handle error correctly
            alert(error);
        });
}

LogInDrawer.prototype.page_loaded = function (data) {
    var data_dom = $(data);
    var main_content = data_dom.find('.main-content');
    main_content.find('.login-form-cancel').remove();
    main_content.find('.sitewide--title-wrapper').remove();
    this.drawer.$secondary_container.empty().append(main_content);

    // Bind recover password button
    timber.cacheSelectors();
    timber.loginForms();

    this.drawer.open();
};

function log_in_handler(e) {
    var url = $(this).attr('href');
    new LogInDrawer(url);
    return false;
}

function load_log_in() {
    $('.log-in-button').off('click', log_in_handler).on('click', log_in_handler);
}

function SearchDrawer() {
    this.drawer = new Drawer('#SearchContainer', '#SearchTitle');
    this.drawer.open();
    this.section_by_type = {
        'article': 'Articles',
        'page': 'Pages',
        'product': 'Products'
    };
    this.current_xhr = null;
    this.onchange_timer = null;

    this.$results = $('#search-results');
    var source = $("#LiveSearchResultTemplate").html();
    this.template = Handlebars.compile(source);

    var self = this;
    $('#search-input').bind('keyup change', function () {
        self.onchange($(this).val());
    });
}

SearchDrawer.prototype.onchange = function (query) {
    if (this.onchange_timer) {
        clearTimeout(this.onchange_timer);
    }
    this.onchange_timer = setTimeout(this.onchange_throttled.bind(this, query), 200);
    if (this.current_xhr) {
        this.current_xhr.abort();
    }
};

SearchDrawer.prototype.get_search_url = function(query, json) {
    var types = 'product,article,page';
    var view = '';
    if (json) {
        view = '&view=json';
    }
    return '/search?type=' + types + view + '&q=' + encodeURIComponent(query);
};

SearchDrawer.prototype.onchange_throttled = function (query) {
    var url = this.get_search_url(query, true);
    this.$results.empty();
    this.$results.append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i><span class="sr-only">Loading...</span>');

    this.current_xhr = $.getJSON(url)
        .done(this.show_results.bind(this))
        .fail(this.show_error.bind(this))
        .always(function () { this.current_xhr = null; }.bind(this));
};

SearchDrawer.prototype.show_results = function (data) {
    var $show_more = $('#search-show-more');
    $show_more.addClass('hide');
    this.$results.empty();
    var results_by_type = {};
    data.results.forEach(function (result) {
        if (results_by_type.hasOwnProperty(result.type)) {
            results_by_type[result.type].push(result);
        } else {
            results_by_type[result.type] = [result];
        }
    });

    if (data.terms) {
        if (data.results.length > 0) {
            this.$results.append('<p>' + SearchTranslations.results_for_html.replace('\{\{ terms \}\}', data.terms) + '</p>');
            for (var type in results_by_type) {
                if (results_by_type.hasOwnProperty(type)) {
                    this.$results.append('<h2>' + this.section_by_type[type] + '</h2>');
                    results_by_type[type].forEach(this.show_result.bind(this));
                }
            }
            if (data.has_more) {
                $show_more.removeClass('hide').attr('href', this.get_search_url(data.terms, false));
            }
            if (window.Currency) {
                window.Currency.convertAll(window.Currency.shopCurrency, window.Currency.currentCurrency);
            }
        } else {
            this.$results.append('<p>' + SearchTranslations.no_results_html.replace('\{\{ terms \}\}', data.terms) + '</p>');
        }
    }
};

SearchDrawer.prototype.show_result = function (result) {
    this.$results.append(this.template(result));
};

SearchDrawer.prototype.show_error = function (error) {
    if (error.statusText === 'abort') {
        return;
    }
    console.error("statusText", error.statusText);
    console.error("error", JSON.stringify(error));
    // We'll redirect the user to /search page when search fails (for whatever reason)
    var query = $('#search-input').val();
    window.location = this.get_search_url(query, false);
};

function search_handler(e) {
    new SearchDrawer();
    return false;
}

function load_search_drawer() {
    $('.search-button').off('click', search_handler).on('click', search_handler);
}

$(document).ready(function(){

    load_imageZoomEvents();

});


function load_imageZoomEvents(){

    //page load
    loadImageZoom();

    //responsive check
    $(window).on('resize', function(){

        loadImageZoom();

    });

}

function loadImageZoom(){

    //only tablet and up
    if($(window).width() > 768){
        $('.product-single__photo-wrapper img.product-single__photo')
            .unbind('mouseenter').unbind('mouseleave')
            .removeProp('hoverIntent_t')
            .removeProp('hoverIntent_s')
            .hoverIntent(hoverZoomIn, hoverZoomOut);

    } else {

        // kill all zoom events if we re-size below tablet
        $('.product-single__photo').each(function(index, image){

            $(image).trigger('zoom.destroy'); // remove zoom

        });

    }

}

var hover_zoom_timer = null;

function hoverZoomIn(event){
        var image = $(this);

        var imageZoomEnabled = image.data().imageZoomEnable;

        var alreadyLoaded = image.hasClass('js__image_already_loaded');

        var smallImage = image.hasClass('js__smallImage');

        // only if image-zoom enabled
        if(imageZoomEnabled == true && !alreadyLoaded && !smallImage) {

            image.css({opacity : 0.5});

            var imageZoom = image.data().imageZoom;

            var imageParent = image.closest('.product-single__photo-wrapper');

            var imageZoomLoader = imageParent.find('#featured-image-loader').fadeIn('fast');

            imageParent
                .css('display', 'inline-block')
                .zoom({
                    url: imageZoom,
                    callback: function () { //fires when the zoomed image has finished loading
                        image.addClass('js__image_already_loaded');
                        imageZoomLoader.fadeOut('slow');
                        // slight quirk means we need to re-fire the mouseover event to actually see the image.
                        image.trigger('mouseover');
                    },
                    onZoomIn: function () {
                        var zoomImg = imageParent.find('.zoomImg');

                        // Hide the zoom when zoomed image has the same size as original
                        if (zoomImg.width() <= image.width()) {
                            image.css({opacity: 1});
                            zoomImg.css('visibility', 'hidden');
                        } else {
                            zoomImg.css('visibility', 'visible');
                        }
                    }
                });
        }
}

function hoverZoomOut(){

    var image = $(this);

    image.css({opacity : 1});

}

if($('#shopify-product-reviews').length > 0){

    var $productReviewsPlaceholder = $('.desktop_review_placeholder');
    var $productReviews = $('#shopify-product-reviews', $productReviewsPlaceholder);
    var $productReviewsClone = $productReviews.clone();

    moveProductReviews($productReviewsClone);

    $(window).on('resize', function(){

        moveProductReviews($productReviewsClone);

    });

}

function moveProductReviews($productReviews){

    if($(window).width() < 768) {

        $('.mobile_review_placeholder').append($productReviews);

    } else {

        $('.mobile_review_placeholder #shopify-product-reviews').remove();

    }

}

load_TextAdvertCarousel();

function load_TextAdvertCarousel(){

    if($('.text-advert-section').length > 0){

        $(".text-advert-section .slides").addClass('owl-carousel owl-theme').owlCarousel({
            items: 1,
            autoHeight: true
        });
    }
}

// Set map Variables
var MAP_SELECTOR = '.map-wrapper';
var MAP_API_FAILED = false;
var map_objects = [];

function set_map_error(message, container) {
    if (!container) {
        container = $('.map-section__container');
    }
    container.addClass('hide');
    if (Shopify.designMode) {
        $('<div class="map-container-error"></div>').text(message).appendTo(container.parent().find('.map-section__overlay'));
    }
    container.parent().find('.homepage-map--fallback').removeClass('hide');
}

function maps_resize() {
    // Center map when screensize is changed
    map_objects.forEach(function (map) {
        var currCenter = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(currCenter);
    });
}

function map_init(map_element) {
    var config = {
      zoom: 14
    };

    var section = map_element.dataset.id;
    var colors = map_element.dataset.colors;
    var style = [];
    try {
        style = JSON.parse(document.getElementById('homepage-map--theme--' + section).textContent);
    } catch (e) {
        console.error('Unable to parse theme style:', e);
    }
    var container = document.querySelector('#map-container-' + section);
    if (!container) {
        return;
    }
    var $container = $(container);
    if (MAP_API_FAILED) {
        set_map_error('Google Maps authentication error, API key might be invalid', $container);
    }

    var map = new google.maps.Map(container, {
        zoom: config.zoom,
        styles: style,
        disableDefaultUI: true,
        draggable: false,
        clickableIcons: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
    });
    map_objects.push(map);

    var geocoder = new google.maps.Geocoder();

    geocodeAddress(geocoder, map);

    function geocodeAddress(geocoder, resultsMap) {
        var address = $('#map-container-' + section).data('address-setting');
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                set_map_error('Error looking up that address', $container);
            }
        });
    }
}

// Google Map JS
function load_googlemaps() {
  var mapElements = document.querySelectorAll(MAP_SELECTOR);
  if (mapElements.length === 0) {
      // No map element on the page, don't load the map API
      return;
  }

  var apiKey = null;
  Array.prototype.forEach.call(mapElements, function (map_element) {
    var section = map_element.dataset.id;
    var elementApiKey = document.querySelector('#apikey-' + section).value;
    if (!elementApiKey) {
        return;
    }
    if (apiKey && elementApiKey && elementApiKey !== apiKey) {
        console.warn('Multiple different Google Maps API keys are not allowed, using only the first one');
        return;
    }
    apiKey = elementApiKey;
  });
  if (!apiKey) {
    console.error('Google Maps API key not provided!');
    set_map_error('Google Maps API key not provided!', null);
    return;
  }

  if (MAP_API_FAILED || !window.google || !window.google.maps || !window.google.maps.Geocoder || !window.google.maps.Map) {
    MAP_API_FAILED = false;
    $.getScript(
        'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=google_maps_loaded'
    );
  } else {
    google_maps_loaded();
  }
}

function google_maps_loaded() {
    Array.prototype.forEach.call(document.querySelectorAll(MAP_SELECTOR), map_init);
    $(window).off('resize', maps_resize).on('resize', maps_resize);
}

// Global function called by Google on auth errors.
// Show an auto error message on all map instances.
// eslint-disable-next-line camelcase, no-unused-vars

function gm_authFailure() {
  MAP_API_FAILED = true;
  console.error('Authentication Failure');

  var $container = $('.map-section__container');

  set_map_error('Google Maps authentication error, API key might be invalid', null);
}

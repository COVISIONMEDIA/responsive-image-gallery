// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

// remember to change every instance of "pluginName" to the name of your plugin!
(function($) {

    // here we go!
    $.pluginName = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {
            over_all_layer: '',
            layer_css_class: '',
            path_to_image: '',
            break_points: {
                extralarge: 1200,
                large: 992,
                medium: 768,
                small: 576

            },


            number_of_images: {
                larger: 4,
                extralarge: 4,
                large: 4,
                medium: 4,
                small: 2,
                smaller: 1
            },
            tolerance: 35,
            max_images: 4



        }

        // to avoid confusions, use "plugin" to reference the
        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('pluginName').settings.propertyName from outside the plugin,
        // where "element" is the element the plugin is attached to;
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default and
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);



            plugin.calculateImageHeight();

            $(window).resize(function() {

                plugin.calculateImageHeight();

            });


            // code goes here

        }

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('pluginName').publicMethod(arg1, arg2, ... argn) from outside
        // the plugin, where "element" is the element the plugin is attached to;

        // a public method. for demonstration purposes only - remove it!
        plugin.getAllWidth = function() {

            var allWidth = $('.' + plugin.settings.over_all_layer).width();

            return allWidth;

        },
            plugin.getBreakPoint = function () {

                var browserWidth = $(window).width();

                var breakPoints = plugin.settings.break_points;

                var breakpointreturn = "larger";

                var isSmaller = true;

                $.each(breakPoints, function(breakpointname, breakPoint) {

                    if(browserWidth >= breakPoint) {

                        breakpointreturn = breakpointname;

                        isSmaller = false;

                        return false;

                    }

                });

                if(isSmaller === true)
                    breakpointreturn = "smaller";

                return breakpointreturn;

            },

            plugin.getNumberOfImages = function () {

            var breakPointNameSearch = plugin.getBreakPoint();

            var numberofimagesreturn = plugin.settings.maximum_of_images;

                $.each(plugin.settings.number_of_images, function(breakpointname, numberOfImages) {

                    if(breakPointNameSearch == breakpointname) {

                        numberofimagesreturn = numberOfImages;

                    }

                });

                return numberofimagesreturn;

            },

            plugin.calculateImageHeight = function () {

                var numberOfImagesInARow = plugin.getNumberOfImages();

                var allWidth = plugin.getAllWidth();

                $('.' + plugin.settings.over_all_layer).each(function(l, layer) {

                var imageHeight = 0;

                var imageWidth = 0;

                var imageProportion = 0;

                var faktorForAllImages = 0;

                var countImages = 0;

                var countAllImages = 0;

                var start = 0;

                var last = $(layer).find('.' + plugin.settings.layer_css_class + ' ' + plugin.settings.path_to_image + ' > img').length;


                $(layer).find('.' + plugin.settings.layer_css_class + ' ' + plugin.settings.path_to_image + ' > img').each(function(k, elm) {

                    imageHeight = $(elm).height();

                    imageWidth = $(elm).width();

                    imageProportion = imageWidth / imageHeight;

                    faktorForAllImages += imageProportion;

                    countImages++;

                    countAllImages++;

                    if(countImages == numberOfImagesInARow || last == countAllImages) {

                        var newHeight = (allWidth - (plugin.settings.tolerance * numberOfImagesInARow * 2)) / faktorForAllImages;

                        for(let i=start; i<countAllImages;i++) {

                            $(layer).find('.' + plugin.settings.layer_css_class).eq(i).find(plugin.settings.path_to_image + ' > img').height(newHeight);

                        }

                        faktorForAllImages = 0;

                        countImages = 0;



                        start = k + 1;



                    }

                });


                });




            }


        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.imagesInALineGallery = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('imagesInALineGallery')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.pluginName(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('imagesInALineGallery', plugin);

            }

        });

    }

})(jQuery);

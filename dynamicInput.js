(function($) {

    var defaultHtml = "<div><input type='text' /><a class='plusbutton'>+</a><a class='minusbutton'>-</a></div>";

    var thisDiv = {};

    var methods = {
        init: function() {
            thisDiv = this;

            $(this).on("keydown", "input", function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    var thisElement = $(event.target).parent();
                    $(thisElement).after(defaultHtml);
                    var elementToFocus = $(thisElement).next().children("input");
                    $(elementToFocus).focus();
                }

                if (event.keyCode === 8 && $(event.target).val() == "" && $(thisDiv).children().length > 1) {
                    event.preventDefault();
                    var firstChild = $(thisDiv).children().filter(":first");
                    var elementToFocus = $(event.target).parent().prev().children("input");
                    $(event.target).parent().remove();

                    if ($(event.target).parent().is(firstChild)) {
                        $(thisDiv).children().filter(":first").children("input").focus()
                    }
                    else {
                        $(elementToFocus).focus();
                    }
                }

                if (event.keyCode === 46 && $(event.target).val() == "" && $(thisDiv).children().length > 1) {
                    event.preventDefault();
                    var lastChild = $(thisDiv).children().filter(":last");
                    var elementToFocus = $(event.target).parent().next().children("input");
                    $(event.target).parent().remove();

                    if ($(event.target).parent().is(lastChild)) {
                        $(thisDiv).children().filter(":last").children("input").focus()
                    }
                    else {
                        $(elementToFocus).focus();
                    }


                }
            });

            $(this).append(defaultHtml);

            $(this).on("click", ".plusbutton", function() {
                return methods['addInput'].apply(this, Array.prototype.slice.call(arguments, 1));
            });

            $(this).on("click", ".minusbutton", function() {
                return methods['removeInput'].apply(this, Array.prototype.slice.call(arguments, 1));
            });
        },
        addInput: function(options) {
            if ($(this).is(thisDiv)) {
                $(thisDiv).append(defaultHtml);
            }
            else {
                $(this).parent().parent().append(defaultHtml);
            }
        },
        removeInput: function(options) {
            if (options && options.selector) {
                $(thisDiv).find(options.selector).parent().remove();
                if ($(thisDiv).children().length === 0) {
                    $(thisDiv).append(defaultHtml);
                }
                return;
            }

            if ($(this).is(thisDiv)) {
                if ($(this).children().length > 1) {
                    $(thisDiv).children().filter(":last").remove();
                }
            }
            else {
                if ($(this).parent().siblings().length > 0) {
                    $(this).parent().remove();
                }
                else {
                    $(this).siblings("input").val("");
                }
            }
        }
    }

    $.fn.dynamicInput = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.dynamicInput');
        }
    };


})(jQuery);
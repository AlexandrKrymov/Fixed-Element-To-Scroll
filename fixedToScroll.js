(function( $ ) {
    $.fn.fixedToScroll = function(customOptions) {

        var options = {
            position: 'top', // Где должен прилипать элемент, доступно 'top' и 'bottom', тип String
            end: true // Если элемент является первым или последним внутри body, то true. Если элемент не является первым или последним внутри body, то false
        };

        var $element = this;
        var elementHeight = +$element.outerHeight();
        var prevElementHeight = +$element.prev().outerHeight();

        options = $.extend(true, options, customOptions);

        if(options.position == 'top'){ // Если элемент должен прилипать к верху экрана

            if(options.end){ // Если элемент первый или последний внутри Body, то сразу прибиваем его

                $element.addClass('fixed fixed-top');
                // Пустой элемент с высотой равной фиксированному элементу. Он нужен для того, что бы не было резких скачков при смене состояния
                $element.after('<div style="height: ' + elementHeight + 'px' + '" class="fixed-empty"></div>');

            } else { // Если элемент не первый или последний внутри Body, то вешаем обработчик на событие скролл

                $(window).on('scroll', function () {

                    if( $(document).scrollTop() > ( +$element.prev().offset().top + prevElementHeight ) && !$element.hasClass('fixed') ){

                        $element.addClass('fixed fixed-top');
                        // Пустой элемент с высотой равной фиксированному элементу. Он нужен для того, что бы не было резких скачков при смене состояния
                        $element.after('<div style="height: ' + elementHeight + 'px' + '" class="fixed-empty"></div>');

                    } else if( $(document).scrollTop() <= ( +$element.prev().offset().top + prevElementHeight ) && $element.hasClass('fixed') ) {

                        $element.removeClass('fixed fixed-top');
                        // Удаляем пустой элемент
                        $element.next('.fixed-empty').remove();
                    }
                });
            }
        } else if(options.position == 'bottom') { // Если элемент должен прилипать к низу экрана

            if(options.end){ // Если элемент первый или последний внутри Body, то сразу прибиваем его

                $element.addClass('fixed fixed-bottom');
                // Пустой элемент с высотой равной фиксированному элементу. Он нужен для того, что бы не было резких скачков при смене состояния
                $element.after('<div style="height: ' + elementHeight + 'px' + '" class="fixed-empty"></div>');

            } else { // Если элемент не первый или последний внутри Body, то вешаем обработчик на событие скролл

                $(window).on('scroll', function () {

                    if( ($(window).scrollTop() + $(window).outerHeight()) > $element.next().next().offset().top && $element.hasClass('fixed') ){

                        $element.removeClass('fixed fixed-bottom');
                        // Удаляем пустой элемент
                        $element.next('.fixed-empty').remove();

                    } else if( ($(window).scrollTop() + $(window).outerHeight()) <= $element.next().offset().top && !$element.hasClass('fixed') ) {

                        $element.addClass('fixed fixed-bottom');
                        // Пустой элемент с высотой равной фиксированному элементу. Он нужен для того, что бы не было резких скачков при смене состояния
                        $element.after('<div style="height: ' + elementHeight + 'px" class="fixed-empty"></div>');

                    }
                });
            }
        }
    };
})(jQuery);

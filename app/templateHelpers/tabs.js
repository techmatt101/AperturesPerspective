Handlebars.registerHelper('tabs', function(options) {
    var markup = '';
    var length = options.hash.items.length;
    for (var i = 0; i < length; i++) {
        markup += '<li class="tabs__content__pane ' + options.hash.class + '" id="' + options.hash.items[i].toLowerCase() +'" style="width:' + (100 / length).toFixed(2) + '%">' + options.fn(this) + '</li>';
    }
    return new Handlebars.SafeString('<ul class="tabs__content" style="width:' + length + '00%">' + markup + '</ul>');
});
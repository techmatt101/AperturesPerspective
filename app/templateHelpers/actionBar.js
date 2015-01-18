Handlebars.registerHelper('actionBar', function(options) {
    var markup = '<nav class="action-bar">' +
        '<button id="navigator" class="icon md-menu"></button>' +
        '<h1>' + options.hash.title + '</h1>' +
        '<span class="action-bar__actions">' + options.fn(this) + '</span>' +
        '</nav>';

    return new Handlebars.SafeString(markup);
});
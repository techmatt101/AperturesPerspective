/// <reference path='lib/handlebars.d.ts'/>

window.addEventListener('load', () => {
    var source = document.getElementById('foo').innerHTML;
    var template = Handlebars.compile(source);

    document.body.innerHTML = template({title: "Matt's New Post", body: "This is my first post!"});
});
/// <reference path='../lib/handlebars.d.ts'/>
/// <reference path='../lib/qwest.d.ts'/>

var source, template;

window.addEventListener('load', () => {
    document.body.innerHTML = hbs.home({title: "Matt's Web App", body: "YAY it works!, kinda"});
    console.log("YAY");
    //qwest.get('views/home.hbs', {}, {responseType: ''})
    //    .then((response) => {
    //        template = Handlebars.compile(response);
    //        document.body.innerHTML = template({title: "Matt's Web App", body: "YAY it works!, kinda"});
    //    }).catch((e) => {
    //        console.error(e);
    //    });
});
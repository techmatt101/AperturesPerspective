/// <reference path='../lib/handlebars.d.ts'/>

declare var Views : IViews;
declare var Templates : ITemplates;

interface IViews {
    home : (content) => string
}

interface ITemplates {
    card : (content : ICard) => string
}


//var source, template;

window.addEventListener('load', () => {
    document.body.innerHTML = Views.home({title: "Matt's Web App"});

    //document.getElementsByClassName('body')[0].innerHTML = Templates.card({title: 'YAY it works', info: 'kinda'});

    console.log("YAY");

    //var url = 'http://feedproxy.google.com/DigitalPhotographySchool';

    //qwest.get('views/home.hbs', {}, {responseType: ''})
    //    .then((response) => {
    //        template = Handlebars.compile(response);
    //        document.body.innerHTML = template({title: "Matt's Web App", body: "YAY it works!, kinda"});
    //    }).catch((e) => {
    //        console.error(e);
    //    });
});


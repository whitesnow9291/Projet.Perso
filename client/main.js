import { Template } from 'meteor/templating';
import './main.html';




// Fonction de la localisation & du storytelling
class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}
function storytellingLocate(position) {
    function calculDistance(lat_a, lon_a, lat_b, lon_b){
        a = Math.PI / 180;
        lat1 = lat_a * a;
        lat2 = lat_b * a;
        lon1 = lon_a * a;
        lon2 = lon_b * a;

        t1 = Math.sin(lat1) * Math.sin(lat2);
        t2 = Math.cos(lat1) * Math.cos(lat2);
        t3 = Math.cos(lon1 - lon2);
        t4 = t2 * t3;
        t5 = t1 + t4;
        rad_dist = Math.atan(-t5/Math.sqrt(-t5 * t5 +1)) + 2 * Math.atan(1);
        return (rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446;
    }
    var maposition = {
        "latitude": '48.875161',
        "longitude": '2.221950'
    }
    distance = calculDistance(position.coords.latitude,position.coords.longitude, maposition.latitude, maposition.longitude);
    distance = Math.round(distance);
    // Calcul de la distance terminé, la variable pour la récuperer est distance

    // ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————



    // ——————————————————————————————————————————————————
    // storytelling
    // ——————————————————————————————————————————————————


    if(distance < 2){
        var phrases = [
            'Bonjour',
            'Pour l\'instant ' + distance + ' km nous séparent',
            'heureusement, le digital nous a permet de nous rencontrer',
            'ou simplement s\'ajouter sur les réseaux sociaux',
            'that there\'s a difference',
            'between knowing the path',
            'and walking the path'
        ];
        var link = "#first";
        var linkText = "Go";

    }
    else if(distance < 25){
        var phrases = [
            distance + ' km nous séparent',
            'sooner or later',
            'you\'re going to realize',
            'just as I did',
            'that there\'s a difference',
            'between knowing the path',
            'and walking the path'
        ];
        var link = "#first";
        var linkText = "Go";

    }

    else{
        var phrases = [
            distance + ' km nous séparent, c\'est un peu loin ...',
            'mais ne digital nous rapproche',
            'you\'re going to realize',
            'just as I did',
            'that there\'s a difference',
            'between knowing the path',
            'and walking the path'

        ];
        var link = "#first";
        var linkText = "Go";
    }

    document.querySelector('#storytellingLink').innerHTML = "<a href=\""+ link + "\" class=\"button big wide smooth-scroll-middle discoverBtn\">"+linkText+"</a>";
    $('.discoverBtn').hide();
    var el = document.querySelector('.text')
    var fx = new TextScramble(el)

    let counter = 0
    var next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 3000)
        })
        if(counter == 1){
            $('.discoverBtn').fadeIn();
        }
        counter = (counter + 1) % phrases.length
    }


    next()



}
function storytellingUnlocate() {


    var phrases = [
        'Je ne sais pas où tu es ... ',
        '... ni ce que tu fais mais ...',
        'grâce à internet nous pouvons être plus proche ',
        'just as I did',
        'that there\'s a difference',
        'between knowing the path',
        'and walking the path'
    ]
    var link = "#first";
    var linkText = "Go";

    document.querySelector('#storytellingLink').innerHTML = "<a href=\""+ link + "\" class=\"button big wide smooth-scroll-middle discoverBtn\">"+linkText+"</a>";
    $('.discoverBtn').hide();
    var el = document.querySelector('.text')
    var fx = new TextScramble(el)

    let counter = 0
    var next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 3000)
        })
        if(counter == 1){
            $('.discoverBtn').fadeIn();
        }
        counter = (counter + 1) % phrases.length
    }
    next()


}


// Au chargement ..
$( window ).load(function() {

    var today=new Date();
    var annee = today.getFullYear();
    console.log('© Wladimir Delenclos - '+annee+'\n \n- Github: https://github.com/wdelenclos/Projet.Perso \n \n  \\\\°'  );
    // Console Log des crédits

    $('.discoverBtn').hide();
    if(navigator.geolocation){ // Lancement du storytelling
        navigator.geolocation.getCurrentPosition(storytellingLocate, storytellingUnlocate);
    }

});


// Generation contenus statiques des templates(JSON)

Template.portrait.helpers({
    h2: "A propos",
    subtitle: "Heticien - UX Designer @DigitasLBi",
    p1: "Concevoir et réaliser des expériences sur les supports digitaux suppose à la fois une connaissance générale de tous les enjeux, qu'une expertise approfondie dans certains des domaines qui compose cet univers digital qui s'étends sans cesse toujours plus.",
    p2: "Heticien en Bachelor Chef de projet Multimédia (promotion 2018) et UX Designer chez DigitasLBi, j'approfondis mes connaissances en conception d'expérience utilisateur par des recherches sur le No-Interface Design et les microintérations.",
    p3:" Ces recherches et connaissances théoriques viennent se completer en un savoir-faire technique; aussi bien créatif (aquis en classe préparatoire pour les arts décoratifs) qu'en développement (JS, NodeJS, Meteor, PHP ...) qui me permettent de passer par moi même mes idées en produits finaux.",
    aTitle: "Voir mon profil LinkedIn",
    a:"https://www.linkedin.com/in/wdelenclos",
    img:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAf5AAAAJDI2NmViNjAyLWNkN2EtNDIxNC1iN2YyLWRiMzNkY2IyOTg3Zg.jpg",
    alt:"Portrait de Wladimir Delenclos",
});
Template.publications.helpers({
    h2: "Dernières publications",
    p: "Découvrez mes derniers articles publiés sur Medium",

});
var today = new Date();
var annee = today.getFullYear();
Template.footer.helpers({

    credits: "W Delenclos - " + annee,
    username: "wdelenclos",

});

// Generation contenus dynamique des templates (fonctions)

Template.background.helpers({
    imageId: function (){
        min = Math.ceil(1);
        max = Math.floor(6);
        return Math.floor(Math.random() * (max - min)) + min;
    }
});

Meteor.call("publication", function(err, res) { // récupération data Medium envoyé coté serveur

    Meteor.call("publicationTitle", function(irr, ras) {
    for( var i = 0; i < res.length; i++) {
        var titre = ras.items[i].title;
        document.querySelector('#publications').innerHTML = "<article id=\"publication" + i + "\"><a href=\""+ res[i].url+"\" target='_blank' class=\"image\"> <img src=\""+res[i].image+"\" alt=\""+titre+"\" /> </a> <div class=\"caption\"> <h3>"+titre+"</h3> <p>"+ res[i].time+"</p> <ul class=\"actions\"> <li><span class=\"button small\">Lire</span></li> </ul> </div> </article>";
    }
    });
});



// Events des templates

Template.storytelling.events({
    'click #firstBtn': function () {
        console.log('ok');
    },
});





   
   
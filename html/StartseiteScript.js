
const form = document.querySelector('form');

const Beispielangebot = {
    Bild : src="Audibild.jpg",
    Marke: 'Porsche',
    Preis: 90000,
    Model: '-',
    Kilometer: 100000,
    Ort: 'Stuttgart',
    Autor: 'Abcdef',
    Jahr: 2010,
    Beschreibung: 'Hier kann das Angebot genauer beschrieben werden'
}

form.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    const values = Object.fromEntries(new FormData(evt.target));
    console.log(values);
    document.querySelector('#Unterüberschrift').innerHTML = 'Angebote: ';
    document.querySelector('#Angebotsbild').innerHTML = '';
    document.querySelector('#MarkeA').innerHTML = Beispielangebot.Marke;
    document.querySelector('#PreisA').innerHTML = Beispielangebot.Preis + '€';
    document.querySelector('#ModellA').innerHTML = Beispielangebot.Model;
    document.querySelector('#zweiteZeile').innerHTML = Beispielangebot.Beschreibung;
});


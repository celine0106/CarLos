
const button = document.querySelector('form');
const list = document.querySelector("#Angebotsliste");

button.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    var filter = Object.fromEntries(new FormData(evt.target));
    console.log(filter);
    document.querySelector('#Unterüberschrift').innerHTML = 'Angebote: ';
    var an = document.getElementById("eins");
    an.remove();
    fetch("/angebote")
    .then((res) => {
      console.log(res.ok, res.status, res);

      if (!res.ok) return Promise.reject(res.status);

      return res.json();
    })
    .then((angebote) => {
      console.log(angebote);
      angebote.forEach((angebot) => {
        const listItem = document.createElement("li");
        console.log(angebot.ID);
        listItem.innerHTML = '<p>' + angebot.Marke + " "+ angebot.Modell+ " " + angebot.Preis + "€ " + angebot.Kilometer +"km "+ angebot.Ort + '<\p>' + '<p>' + angebot.Beschreibung +'<\p>' + '<hr>';
        //listItem.append( angebot.Beschreibung);
        list.appendChild(listItem);
        
      });
    })
    .catch((e) => {
      alert(`WHOOPS: ${e}`);
    });
});

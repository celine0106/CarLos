
const button = document.querySelector('form');
const list = document.querySelector("#Angebotsliste");

button.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    var filter = Object.fromEntries(new FormData(evt.target));
    console.log(filter);
    document.querySelector('#Unterüberschrift').innerHTML = 'Angebote: ';
    
    
    fetch("/angebote")
    .then((res) => {
      console.log(res.ok, res.status, res);

      if (!res.ok) return Promise.reject(res.status);

      return res.json();
    })
    .then((angebote) => {
      list.innerHTML="";
      console.log(angebote);
      angebote.forEach((angebot) => {
        if((filter.Marke == "" || filter.Marke === angebot.Marke) && (filter.Preis === "beliebig" || filter.Preis >= angebot.Preis) && (filter.Kilometer =="beliebig" || filter.Kilometer >= angebot.Kilometer) && (filter.Ort == "" || filter.Ort == angebot.Ort) && (filter.Autor == "" || filter.Autor == angebot.Autor) && (filter.Jahr === "beliebig" || filter.Jahr <= angebot.Erstzulassung)){
          const listItem = document.createElement("li");
        console.log(angebot.ID);
        var preis = angebot.Preis;
        let ausgabepreis = preis.toString().replace(/\./, ',');
        listItem.innerHTML = '<p>' + angebot.Marke + " "+ angebot.Modell+ " " + ausgabepreis + "€ " + angebot.Kilometer +"km "+ angebot.Ort + '<\p>' + '<p>' + angebot.Beschreibung +'<\p>' + '<hr>';
        list.appendChild(listItem);
        }
      });
    })
    .catch((e) => {
      alert(`WHOOPS: ${e}`);
    });
});

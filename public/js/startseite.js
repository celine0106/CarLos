
const button = document.querySelector('form');
const list = document.querySelector("#Angebotsliste");
//Quelle: https://stackoverrun.com/de/q/11837034
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});
//Ende Quelle

fetch("/angemeldet").then ((res) => {if(res.status === 401){
  alert('Bitte melden Sie sich an um die Angebote einsehen zu können!');
  window.location = "login.html";
}
}).catch((e) => {
  alert(`WHOOPS: ${e}`);
}); 
button.addEventListener("submit", (evt)=> {
  evt.preventDefault();
  var filter = Object.fromEntries(new FormData(evt.target));
  console.log(filter);
  fetch("/angebote").then((res) => {
    console.log(res.ok, res.status, res);
    if (!res.ok) return Promise.reject(res.status);
    return res.json();
  }).then((angebote) => {
    document.querySelector('#Unterüberschrift').innerHTML = 'Angebote: ';
    list.innerHTML="";
    console.log(angebote);
    angebote.forEach((angebot) => {
      if((filter.Marke == "" || filter.Marke === angebot.Marke) && (filter.Preis === "beliebig" || filter.Preis >= angebot.Preis) && (filter.Kilometer =="beliebig" || filter.Kilometer >= angebot.Kilometer) && (filter.Ort == "" || filter.Ort == angebot.Ort) && (filter.Autor == "" || filter.Autor == angebot.Autor) && (filter.Jahr === "beliebig" || filter.Jahr <= angebot.Erstzulassung)){
        const listItem = document.createElement("div");
        listItem.className = ("col-lg-6 mb-4")
        console.log(angebot.ID);
        var preis = angebot.Preis;
        let ausgabepreis = preis.toString().replace(/\./, ',');
        const quelle = "../uploads/"+ angebot.Bild;
        listItem.innerHTML = 
        '<div class="card">'
        + '<img class="card-img-top" src="'+ quelle +'" alt="Autobild">' 
        + '<div class="card-body">' 
        + '<h5 class="card-title">' + angebot.Marke + '</h5>'
        + '<h6 class="card-subtitle mb-2 text-muted">' + "Modell: " + angebot.Modell + '</h6>'
        + '<h6 class="card-subtitle mb-2 text-muted">' + "Preis: " + ausgabepreis + " €" + '</h6>'
        + '<h6 class="card-subtitle mb-2 text-muted">' + "Kilometerstand: " + angebot.Kilometer + " km" + '</h6>'
        + '<h6 class="card-subtitle mb-2 text-muted">' + "Ort: " + angebot.Ort + '</h6>'
        + '<h6 class="card-subtitle mb-2 text-muted">' + "Händler: " + angebot.Autor + '</h6>'
        + '<p class="card-text">' + angebot.Beschreibung + '</p>'
        + '</div>'
        + '</div>'
        list.appendChild(listItem);
        }
      });
    })
    .catch((e) => {
      alert(`WHOOPS: ${e}`);
    });
});

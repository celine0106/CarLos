
const button = document.querySelector('form');
const list = document.querySelector("#Angebotsliste");

button.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    const values = Object.fromEntries(new FormData(evt.target));
    console.log(values);
    document.querySelector('#Unterüberschrift').innerHTML = 'Angebote: ';
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
        listItem.textContent = angebot.Marke + " "+ angebot.Modell+ " " + angebot.Preis + "€ " + angebot.Kilometer +"km "+ angebot.Ort + " ";
        
        listItem.append("Beschreibung");

        list.appendChild(listItem);
      });
    })
    .catch((e) => {
      alert(`WHOOPS: ${e}`);
    });
});


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("PlusButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Quelle: https://stackoverrun.com/de/q/11837034
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});
//Ende Quelle

const list = document.querySelector("#Angebotsliste1");

fetch("/angemeldet")
.then ((res) => {if(res.status === 401){
  alert('Bitte melden Sie sich an um Angebote zu erstellen!');
  window.location = "loginIndex.html";
}
else {
  fetch("/Meineinserate")
 .then((res) => {
   console.log(res.ok, res.status, res);

   if (!res.ok) return Promise.reject(res.status);

   return res.json();
 })
 .then((angebote) => {
   list.innerHTML="";
   console.log(angebote);
   angebote.forEach((angebot) => {
    const listItem = document.createElement("li");
     console.log(angebot.ID);
     var preis = angebot.Preis;
     let ausgabepreis = preis.toString().replace(/\./, ',');
     listItem.innerHTML = '<p>' + angebot.Marke + " "+ angebot.Modell+ " " + ausgabepreis + "€ " + angebot.Kilometer +"km "+ angebot.Ort + '<\p>' + '<p>' + angebot.Beschreibung +'<\p>' + '<hr>';
     list.appendChild(listItem);
     }
   );
 })
 .catch((e) => {
   alert(`WHOOPS: ${e}`);
 
});
}
})
.catch((e) => {
  alert(`WHOOPS: ${e}`);
}); 

const createForm = document.querySelector('#aerstellen');
const abbrechenButton = document.querySelector('#abbrechnen');
var erg = 2;

abbrechenButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  window.location = "MAIndex.html";
});

createForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  console.log("jj");
  
  const values = Object.fromEntries(new FormData(evt.target));

  console.log(values);
  fetch("/benutzer")
    .then((res) => {
      console.log(res.ok, res.status, res);

      if (!res.ok) return Promise.reject(res.status);

      return res.json();
    })
    .then((benutzer) => {
      
      benutzer.forEach((benutzer) => {
        if(benutzer.benutzername === values.autor){
            console.log("success");
            erg = benutzer;
            fetch("/meineAngebote", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "content-type": "application/json",
              },
            }).then((res) => {
                console.log(res.ok);
                window.location = "MAIndex.html";
            }).catch((e)=>{
              alert('Whoops: ${e}');
            });
          
            console.log("FORM SUBMITTED", values);
        }
      });
      if (erg === 2){
        alert("Benutzername nicht gefunden! Bitte überprüfen Sie Ihre Eingabe im Feld Autor.");
      }  
    })
    .catch((e) => {
      alert(`WHOOPS: ${e}`);
    });
  });
    

 


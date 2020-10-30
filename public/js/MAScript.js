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
  .then ((res) => {
    if(res.status === 401) {
      alert('Bitte melden Sie sich an um Angebote zu erstellen!');
      window.location = "loginIndex.html";
    } 
    else {
      fetch("/Meineinserate").then((res) => {
      console.log(res.ok, res.status, res);
      if (!res.ok) return Promise.reject(res.status);

      return res.json();
      }).then((angebote) => {
        list.innerHTML="";
        console.log(angebote);
        angebote.forEach((angebot) => {
          const listItem = document.createElement("div");
          listItem.className = ("col-lg-6 mb-4");

          console.log(angebot.ID);
          var preis = angebot.Preis;
          let ausgabepreis = preis.toString().replace(/\./, ',');
          
          const editbtn = document.createElement("button");
        editbtn.className = ("btn btn-primary")
        editbtn.innerHTML = 'Bearbeiten';

        const deletebtn = document.createElement("button");
        deletebtn.className = ("btn btn-danger mr-2")
        deletebtn.innerHTML = 'Löschen';
        
          const quelle = "../uploads/"+ angebot.Bild;

          
          listItem.innerHTML = 
          '<div class="card">'
              + '<img class="card-img-top" src="'+ quelle +'" alt="Autobild">'
              + '<div class="card-body">' 
                + '<h5 class="card-title pt-2">' + angebot.Marke + '</h5>'
                + '<h6 class="card-subtitle mb-2 text-muted">' + "Modell: " + angebot.Modell + '</h6>'
                + '<h6 class="card-subtitle mb-2 text-muted">' + "Preis: " + ausgabepreis + " €" + '</h6>'
                + '<h6 class="card-subtitle mb-2 text-muted">' + "Kilometerstand: " + angebot.Kilometer + " km" + '</h6>'
                + '<h6 class="card-subtitle mb-2 text-muted">' + "Ort: " + angebot.Ort + '</h6>'
                + '<h6 class="card-subtitle mb-2 text-muted">' + "Händler: " + angebot.Autor + '</h6>'
                + '<p class="card-text w-30">' + angebot.Beschreibung + '</p>'
              + '</div>'
              // + '<div class="card-footer">'
              //   + deletebtn// Hier sollen die Buttons rein, ansonsten einfach kompletten card-footer weglassen, sieht zwar nicht gut aus, aber passt schon
              // + '</div>'
          + '</div>';

        listItem.append(deletebtn, editbtn);
        list.appendChild(listItem);

        
          // Modal Fenster für das Bearbeiten eines Angebots öffnen
          var modalEdit = document.getElementById("modalEdit");
          editbtn.onclick = function() {
            modalEdit.style.display = "block";
          }
          window.onclick = function(event) {
            if (event.target == modalEdit) {
              modalEdit.style.display = "none";
            }
          }

          editbtn.addEventListener("click", (evt) => {
            evt.preventDefault();
          
            p.value = angebot.Preis;
            k.value = angebot.Kilometer;
            o.value = angebot.Ort;
            e.value = angebot.Erstzulassung;
            b.value = angebot.Bild;
            bess.value = angebot.Beschreibung;
            a.value = angebot.Autor;
            m.value = angebot.Marke;
            mo.value = angebot.Modell;
      
            const abbrechenEdit = document.querySelector('#abbrechenEdit');
            const saveEdit = document.querySelector('#aaendern');

            //Modal-Fenster abbrechen 
            abbrechenEdit.addEventListener("click", (evt) => {
              evt.preventDefault();
              window.location = "MAIndex.html";
            });

            //Fetch-Aufruf der Update-Methode
            saveEdit.addEventListener("submit", (evt) => {
              evt.preventDefault();
              const valuesChange = Object.fromEntries(new FormData(evt.target));

              console.log(valuesChange);
              fetch(`/meinAngebotUpdate/${angebot.ID}`, {
              method: "PATCH",
              body: JSON.stringify(valuesChange),
              headers: {
                "content-type": "application/json",
              },
              }).then((res)=> {
                window.location="MAIndex.html";
                console.log(res.status);
              })
            })
          });
          // Lösche ausgewähltes Angebot
          deletebtn.addEventListener("click", (evt) => {
            evt.preventDefault();

            if(window.confirm('Bist du dir sicher?'))
            {
              fetch(`/angebotLoeschen/${angebot.ID}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then ((res) => {
                window.location = "MAIndex.html";
              })
            };
          })
        });
      }).catch((e) => {
        alert(`WHOOPS: ${e}`);
      });
    }
    }).catch((e) => {
      alert(`WHOOPS: ${e}`);
  }); 


  const createForm = document.querySelector('#aerstellen');
  const abbrechenButton = document.querySelector('#abbrechnen');
  var erg = 2;

  abbrechenButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    window.location = "MAIndex.html";
  });

  const inputbild = document.getElementById("bild");
  createForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    
    const values = Object.fromEntries(new FormData(evt.target));

    console.log(values);
    values.Bild = inputbild.files[0].name;
    console.log(values.Bild);
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
              var preis = values.preis;
              preis = preis.toString().replace(/\./, '');
              values.preis = preis.toString().replace(/\,/, '.');
              fetch("/meineAngebote", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "content-type": "application/json",
                },
              }).then((res) => {
                  console.log(res.ok);
                  const fd = new FormData();
                  fd.append('bild', inputbild.files[0]);
                  console.log(inputbild.files[0]);
                  console.log("a");
                  console.log(fd);
                  fetch('/uploadBild', {
                  method: "post",
                  body: fd
                })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error(err));
              window.location = "MAIndex.html";
              }).catch((e)=>{
                alert(`Whoops: ${e}`);
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
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

     const editbtn = document.createElement("button");
        editbtn.innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';

        const deletebtn = document.createElement("button");
        deletebtn.innerHTML = '<i class="glyphicon glyphicon-trash" style="font-size: 20px;"></i>';

     listItem.innerHTML = '<p>' + angebot.Marke + " "+ angebot.Modell+ " " + ausgabepreis + "€ " + angebot.Kilometer +"km "+ angebot.Ort + '<\p>' + '<p>' 
     + angebot.Beschreibung +'<\p>';
     
        listItem.append(editbtn, deletebtn);
        const strich = document.createElement("hr");
        const img = document.createElement('img');
        const quelle = "../uploads/"+ angebot.Bild;
        console.log(quelle);
        img.src = quelle;
        img.height="100";
        img.width="150";
        listItem.append(img);
        listItem.append(strich);
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
  
});
/*//Fetch-Aufruf der Update-Methode mit Mitgabe der ID:
fetch(`/meinAngebotUpdate/${angebot.id}`, {
  method: "PUT",
  body: JSON.stringify(values),
              headers: {
                "content-type": "application/json",
              },
});*/
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

/*const uploadFile = (file) => {
  const fd = new FormData();
  fd.append('bild', file);
  console.log("a");
  console.log(fd);
  fetch('/uploadBild', {
    method: "post",
    body: fd
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
}*/
    

 


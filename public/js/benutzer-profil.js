
var bearbeitbarV = false;
var bearbeitbarN = false;
var bearbeitbarT = false;
var bearbeitbarE = false;

const Vorname = document.querySelector('#v');

const vausgabe = document.querySelector('#Vorname');
const nausgabe = document.querySelector('#Nachname');
const tausgabe = document.querySelector('#Telefon');
const eausgabe = document.querySelector('#Email');

//Quelle: https://stackoverrun.com/de/q/11837034
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});
//Ende Quelle

fetch("/angemeldet")
.then((res)=> {
  console.log(res.ok, res.status, res);
      if(res.status === 401){
        alert('Bitte melden Sie sich an um ein Profil erstellen zu können!');
        window.location = "login.html";
      }
      else {
        fetch("/meineDatenAnzeigen")
    .then((res) => {
      console.log(res.ok, res.status, res);

      if (!res.ok) return Promise.reject(res.status);

      return res.json();
    })
    .then((daten) => {
      daten.forEach((data) => {
        vausgabe.value = data.vorname;
        nausgabe.value = data.nachname;
        tausgabe.value = data.telefon;
        eausgabe.value = data.email;
      })
  
    })
  }
})
    .catch((e) => {
      alert(`WHOOPS: ${e}`);
    });
      


Vorname.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarV == false){
        document.querySelector('#Vorname').readOnly = false;
        bearbeitbarV = true;
        document.querySelector('#vnameb').innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>' +
        '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>'
        + '</svg>';
        document.querySelector('#Vorname').style.backgroundColor = "rgba(255, 255, 255, 0.644)";
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Vorname').readOnly = true;
        bearbeitbarV = false;
        document.querySelector('#vnameb').innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>' +
        '</svg>';
        document.querySelector('#Vorname').style.background = "none";
        fetch("/vornameaktualisierung", {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          }).then((res) => {
            console.log(res.ok);
          });
        
          console.log("FORM SUBMITTED", values);
        }
});

const Nachname = document.querySelector('#n');

Nachname.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarN == false){
        document.querySelector('#Nachname').readOnly = false;
        bearbeitbarN = true;
        document.querySelector('#nnameb').innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>' +
        '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>'
        + '</svg>';
        document.querySelector('#Nachname').style.backgroundColor = "rgba(255, 255, 255, 0.644)";
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Nachname').readOnly = true;
        bearbeitbarN = false;
        document.querySelector('#nnameb').innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>' +
        '</svg>';
        document.querySelector('#Nachname').style.background = "none";
        fetch("/nachnameaktualisierung", {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          }).then((res) => {
            console.log(res.ok);
          });
        
          console.log("FORM SUBMITTED", values);
        }
});

const Email = document.querySelector('#e');

Email.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarE == false){
        document.querySelector('#Email').readOnly = false;
        bearbeitbarE = true;	
      document.querySelector('#emailb').innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>' +
      '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>'
      + '</svg>';
      document.querySelector('#Email').style.backgroundColor = "rgba(255, 255, 255, 0.644)";
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Email').readOnly = true;
        bearbeitbarE = false;
        document.querySelector('#emailb').innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>' +
        '</svg>';
        document.querySelector('#Email').style.background = "none";
        fetch("/emailaktualisierung", {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          }).then((res) => {
            console.log(res.ok);
          });
        
          console.log("FORM SUBMITTED", values);
        }
});

const Telefon = document.querySelector('#t');

Telefon.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarT == false){
        document.querySelector('#Telefon').readOnly = false;
        bearbeitbarT = true;
        document.querySelector('#telb').innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>' +
        '<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>'
        + '</svg>';
        document.querySelector('#Telefon').style.backgroundColor = "rgba(255, 255, 255, 0.644)";
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Telefon').readOnly = true;
        bearbeitbarT = false;
        document.querySelector('#telb').innerHTML = '<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>' +
        '</svg>';
        document.querySelector('#Telefon').style.background = "none";
        fetch("/telefonaktualisierung", {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          }).then((res) => {
            console.log(res.ok);
          });
        
          console.log("FORM SUBMITTED", values);
        }
});

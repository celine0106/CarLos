
var bearbeitbarV = false;
var bearbeitbarN = false;
var bearbeitbarT = false;
var bearbeitbarE = false;

const Vorname = document.querySelector('#v');

const vausgabe = document.querySelector('#Vorname');
const nausgabe = document.querySelector('#Nachname');
const tausgabe = document.querySelector('#Telefon');
const eausgabe = document.querySelector('#Email');

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
    .catch((e) => {
      alert(`WHOOPS: ${e}`);
    });

Vorname.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarV == false){
        document.querySelector('#Vorname').readOnly = false;
        bearbeitbarV = true;
        document.querySelector('#vnameb').innerHTML = '<i class="glyphicon glyphicon-ok" style="font-size: 20px;"></i>';
        document.querySelector('#Vorname').style.backgroundColor = "rgba(255, 255, 255, 0.644)";
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Vorname').readOnly = true;
        bearbeitbarV = false;
        document.querySelector('#vnameb').innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';
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
        document.querySelector('#nnameb').innerHTML = '<i class="glyphicon glyphicon-ok" style="font-size: 20px;"></i>';
        document.querySelector('#Nachname').style.backgroundColor = "rgba(255, 255, 255, 0.644)";
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Nachname').readOnly = true;
        bearbeitbarN = false;
        document.querySelector('#nnameb').innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';
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
      document.querySelector('#emailb').innerHTML = '<i class="glyphicon glyphicon-ok" style="font-size: 20px;"></i>';
      document.querySelector('#Email').style.backgroundColor = "rgba(255, 255, 255, 0.644)";
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Email').readOnly = true;
        bearbeitbarE = false;
        document.querySelector('#emailb').innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';
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
        document.querySelector('#telb').innerHTML = '<i class="glyphicon glyphicon-ok" style="font-size: 20px;"></i>';
        document.querySelector('#Telefon').style.backgroundColor = "rgba(255, 255, 255, 0.644)";
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Telefon').readOnly = true;
        bearbeitbarT = false;
        document.querySelector('#telb').innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';
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

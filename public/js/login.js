var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
var formbox = document.getElementById("formbox");

//Wechsel auf Registrierungsansicht 
function register(){
  x.style.left ="-400px";
  y.style.left ="50px";
  z.style.left ="110px";
  formbox.style.height = "480px";
}

//Wechsel auf Loginansicht 
function login(){
  x.style.left ="50px";
  y.style.left ="-450px";
  z.style.left ="0px";
  formbox.style.height = "270px";
}

const button = document.querySelector('form');
const createForm = document.querySelector('#register');

//Benutzer anmelden
button.addEventListener("submit", (evt)=> {
  evt.preventDefault();
  const values = Object.fromEntries(new FormData(evt.target));
  var erg = 2;
  //Überprüfung über fetch-Aufruf, ob Benutzer mit den eingegebenen Daten in der Datenbank existiert
  fetch("/benutzer").then((res) => {
    console.log(res.ok, res.status, res);
    if (!res.ok) return Promise.reject(res.status);
    return res.json();
  }).then((benutzer) => {
    benutzer.forEach((benutzer) => {
      if(benutzer.benutzername === values.username && benutzer.passwort == values.pwd){
        console.log("success");
        erg = benutzer;
        //Speicherung des angemeldeten Benutzers in einer Session 
        var url = "/login/"+benutzer.benutzername;{
          fetch(url).then((res)=> {
            if(res.ok){
              console.log("success");
              window.location = "startseite.html";
            }
            else {
              alert("Sie sind bereits mit einem anderen Benutzernamen angemeldet");
            }
          }).catch((e)=> {
            alert(`WHOOPS: ${e}`);
          })
        }
            
      }
    });
    if (erg === 2){
      alert("Benutzername oder Passwort falsch!");
    }  
  })
  .catch((e) => {
    alert(`WHOOPS: ${e}`);
  });
});

//Registrierung
createForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const values = Object.fromEntries(new FormData(evt.target));
  console.log(values);
  if (values.username !== "" && values.pwd !== "") {
    //Speicherung der Daten in der Datenbank über fetch
    fetch("/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      if(res.status == 401){
        alert("Der eingegebene Benutzername existiert bereits!");
      }
      else {
        console.log(res.ok);
        window.location = "login.html";
      }
    });
  
    console.log("FORM SUBMITTED", values);
  }
  else if (values.username === ""){
    alert("Bitte geben Sie einen Benutzernamen ein!");
  }
  else if (values.pwd === ""){
    alert("Bitte geben Sie ein Passwort ein!");
  }
}); 
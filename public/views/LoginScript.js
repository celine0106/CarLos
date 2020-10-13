var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
var formbox = document.getElementById("formbox");

function register(){
  x.style.left ="-400px";
  y.style.left ="50px";
  z.style.left ="110px";
  formbox.style.height = "480px";
}

function login(){
  x.style.left ="50px";
  y.style.left ="-450px";
  z.style.left ="0px";
  formbox.style.height = "270px";
}
const button = document.querySelector('form');

button.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    const values = Object.fromEntries(new FormData(evt.target));
    var erg = 2;
    fetch("/benutzer")
    .then((res) => {
      console.log(res.ok, res.status, res);

      if (!res.ok) return Promise.reject(res.status);

      return res.json();
    })
    .then((benutzer) => {
      
      benutzer.forEach((benutzer) => {
        if(benutzer.benutzername === values.username && benutzer.passwort == values.pwd){
            console.log("success");
            erg = benutzer;
            window.location = "startseiteindex.html";
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
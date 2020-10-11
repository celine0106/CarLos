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
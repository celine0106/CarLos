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

const createForm = document.querySelector('#aerstellen');
const abbrechenButton = document.querySelector('#abbrechnen');

abbrechenButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  window.location = "MAIndex.html";
});

createForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  console.log("jj");
  
  const values = Object.fromEntries(new FormData(evt.target));

  console.log(values);

  fetch("/meineAngebote", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => {
    if(res.status == 401){
      alert("Der eingegebene Benutzername existiert nicht!");
    }
    else {
      console.log(res.ok);
      window.location = "MAIndex.html";
    }
  }).catch((e)=>{
    alert("a")
  });

  console.log("FORM SUBMITTED", values);
});

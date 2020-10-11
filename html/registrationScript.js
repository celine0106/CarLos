const createForm = document.querySelector('form');


createForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    const values = Object.fromEntries(new FormData(evt.target));

    console.log(values);
  
    fetch("/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      console.log(res.ok);
      window.location = "loginINdex.html";
    });
  
    console.log("FORM SUBMITTED", values);
  });
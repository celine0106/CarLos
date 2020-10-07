
var bearbeitbarV = false;
var bearbeitbarN = false;
var bearbeitbarT = false;
var bearbeitbarE = false;

const Vorname = document.querySelector('#v');
Vorname.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarV == false){
        document.querySelector('#Vorname').readOnly = false;
        bearbeitbarV = true;
        document.querySelector('#vnameb').innerHTML = '<i class="glyphicon glyphicon-ok" style="font-size: 20px;"></i>';
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Vorname').readOnly = true;
        bearbeitbarV = false;
        document.querySelector('#vnameb').innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';
    }
});

const Nachname = document.querySelector('#n');

Nachname.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarN == false){
        document.querySelector('#Nachname').readOnly = false;
        bearbeitbarN = true;
        document.querySelector('#nnameb').innerHTML = '<i class="glyphicon glyphicon-ok" style="font-size: 20px;"></i>';
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Nachname').readOnly = true;
        bearbeitbarN = false;
        document.querySelector('#nnameb').innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';
    }
});

const Email = document.querySelector('#e');

Email.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarE == false){
        document.querySelector('#Email').readOnly = false;
        bearbeitbarE = true;	
	    document.querySelector('#emailb').innerHTML = '<i class="glyphicon glyphicon-ok" style="font-size: 20px;"></i>';
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Email').readOnly = true;
        bearbeitbarE = false;
        document.querySelector('#emailb').innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';
    }
});

const Telefon = document.querySelector('#t');

Telefon.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    if (bearbeitbarT == false){
        document.querySelector('#Telefon').readOnly = false;
        bearbeitbarT = true;
        document.querySelector('#telb').innerHTML = '<i class="glyphicon glyphicon-ok" style="font-size: 20px;"></i>';
    }
    else {
        const values = Object.fromEntries(new FormData(evt.target));
        console.log(values);
        document.querySelector('#Telefon').readOnly = true;
        bearbeitbarT = false;
        document.querySelector('#telb').innerHTML = '<i class="glyphicon glyphicon-pencil" style="font-size: 20px;"></i>';
    }
});

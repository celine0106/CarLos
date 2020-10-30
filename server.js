require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const session = require("express-session");
const fileUpload = require("express-fileupload");

const app = express();

let connection;

mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "carlos",
  })
  .then((con) => {
    connection = con;
  })
  .catch((err) => {
    console.log("Überprüfen Sie die Datenbankeinstellungen: " + err)
  });

app.use(express.static("public"));
app.use(express.json());
app.use(fileUpload({
  createParentPath: true
}));

app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login/:username", (req, res) => {
  try {
    if(!req.session.username || req.session.username === req.params.username){
      req.session.username = req.params.username;
      console.log("/login/:username", req.session.username);
      res.status(200).send();
    }
     else {
       res.status(401).send();
     }
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

app.get("/angemeldet", async (req,res) => {
  try {
    if (!req.session.username) {
      return res.status(401).send();
    }
    else {
      return res.status(200).send();
    }
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
})

app.get("/logout", async (req,res) => {
  try {
    req.session.destroy();
    return res.status(200).send();
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
})

app.get("/topangebot", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM angebot where preis = (SELECT min(preis) FROM angebot)");
    console.log(rows);
    res.json(rows[0]);
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
})
//Daten des angemeldeten Benutzer 
app.get("/meineDatenAnzeigen", async (req, res) => {
  try {
    console.log(req.session.username);
    const [rows] = await connection.execute("SELECT * FROM benutzer where benutzername = ?", [req.session.username]);
    console.log(rows);

    res.json(rows);
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

//Daten des jeweiligen Händlers anzeigen 
app.get("/HaendlerDatenAnzeigen/:username", async (req, res) => {
  try {
    console.log(req.params.username);
    const [rows] = await connection.execute("SELECT * FROM benutzer where benutzername = ?", [req.params.username]);
    console.log(rows);

    res.json(rows);
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

//erstellte Angebote eines Benutzers
app.get("/Meineinserate", async (req, res) => {
  try {
    console.log(req.session.username);
    const [rows] = await connection.execute("SELECT * FROM angebot WHERE autor =?", [req.session.username]);
    console.log(rows);

    res.json(rows);
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

//Alle Angebote aus der Datenbank 
app.get("/angebote", async (req, res) => {
  try {
    console.log(req.session.username);
    const [rows] = await connection.execute("SELECT * FROM angebot");
    console.log(rows);

    res.json(rows);
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  } 
});

//Angebot einer bestimmten ID
app.get("/angebotId", async (req, res) =>{
  try {
    const [rows] = await connection.execute("SELECT * FROM angebot WHERE ID =?", [req.body.id]);
    console.log(rows);

    res.json(rows);
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  } 
})


app.get("/benutzer", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM benutzer");
      
    res.json(rows);
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }   
});

app.post("/register", async (req, res) => {
  try {
    const[affectedRows] = await connection.execute ("SELECT * FROM benutzer where benutzername = ?", [req.body.username]);
    if (affectedRows == 0){
     const [
      rows,
     ] = await connection.execute(
      "INSERT INTO benutzer (benutzername, passwort, vorname, nachname, telefon, email) VALUES (?, ?, ?, ?, ?, ?)",
      [req.body.username, req.body.pwd, req.body.vorname, req.body.nachname, req.body.tel, req.body.email]
    );
  
     res.json({
       benutzername: req.body.username,
       vorname: req.body.vorname,
       nachname: req.body.nachname,
       telefon: req.body.tel,
       email: req.body.email,
       password: req.body.pwd,
      });
    }
    else {
      res.status(401).send();
    }
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

app.patch("/vornameaktualisierung", async (req, res) => {
  try {
    const[affectedRows] = await connection.execute ("UPDATE benutzer SET vorname = ? where benutzername = ?", [req.body.Vorname, req.session.username]);
  
    res.json({
      benutzername: req.body.username,
      vorname: req.body.vorname,
    });
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

app.patch("/nachnameaktualisierung", async (req, res) => {
  try {
    const[affectedRows] = await connection.execute ("UPDATE benutzer SET nachname = ? where benutzername = ?", [req.body.Nachname, req.session.username]);
  
    res.json({
      benutzername: req.body.username,
      nachname: req.body.nachname,
    });
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

app.patch("/telefonaktualisierung", async (req, res) => {
  try {
    const[affectedRows] = await connection.execute ("UPDATE benutzer SET telefon = ? where benutzername = ?", [req.body.Telefon, req.session.username]);
  
    res.json({
      benutzername: req.body.username,
      vorname: req.body.telefon,
    });
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

app.patch("/emailaktualisierung", async (req, res) => {
  try {
    const[affectedRows] = await connection.execute ("UPDATE benutzer SET email = ? where benutzername = ?", [req.body.Email, req.session.username]);
  
    res.json({
      benutzername: req.body.username,
      vorname: req.body.email,
    });
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

// Delete an Angebot 
app.delete("/angebotLoeschen/:id", async (req, res) => {
  try {
    console.log(req.params.id);

    const [rows] = await connection.execute("DELETE FROM angebot WHERE id = ?", [
    req.params.id,
    ]);

    if (rows.affectedRows === 1) {
     res.status(200).send();
    } else {
      res.status(404).send();
    }
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

//Insert an Angebot 
app.post("/meineAngebote", async (req, res) => {
  try {
    const [
      rows,
    ] = await connection.execute(
      "INSERT INTO angebot (Preis, Kilometer, Ort, Erstzulassung, Bild, Beschreibung, Autor, Marke, Modell) \
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [req.body.preis,req.body.kilometer,req.body.ort,req.body.erstz,req.body.Bild,req.body.bes,req.session.username,req.body.marke,req.body.modell]
    );
  
    res.json({
      Preis: req.body.preis,
      Kilometer: req.body.kilometer,
      Ort: req.body.ort,
      Erstzulassung: req.body.erstz,
      Bild: req.body.bild,
      Beschreibung: req.body.bes,
      Autor: req.session.username,
      Marke: req.body.marke,
      Modell: req.body.modell,
    });
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
});

app.post('/uploadBild', async (req,res) =>{
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded!'
      });
     } else {
        let bild = req.files.bild;
        bild.mv('./public/uploads/' + bild.name);
        console.log("uploaded");
        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: bild.name,
            mimetype: bild.mimetype,
            size: bild.size,
          }
        });
    }
  }
    catch(err){
      res.status(500).send(err);
      console.log("Fehler: " + err);
    }
});

//Update an Angebot 
app.patch("/meinAngebotUpdate/:id", async(req,res) =>{
  try {
    const[affectedRows] = await connection.execute ("UPDATE angebot SET Preis = ?, Kilometer = ?, Ort = ?, Erstzulassung = ?, Bild = ?, Beschreibung = ?, Autor = ?, Marke = ?, Modell = ? WHERE ID =?", 
    [req.body.p,req.body.k,req.body.o,req.body.e,req.body.bd,req.body.bes,req.session.username,req.body.m,req.body.mo, req.params.id]);
    res.json({
      Preis: req.body.p,
      Kilometer: req.body.k,
      Ort: req.body.o,
      Erstzulassung: req.body.e,
      Bild: req.body.bd,
      Beschreibung: req.body.bes,
      Autor: req.session.username,
      Marke: req.body.m,
      Modell: req.body.mo,
    });
  }
  catch(err){
    res.status(500).send(err);
    console.log("Fehler: " + err);
  }
})



app.listen(5100);
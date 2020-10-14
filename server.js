require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const session = require("express-session");

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
  });

app.use(express.static("public"));
app.use(express.json());

app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: true,
  })
);

/*app.get("/login/:username", (req, res) => {
  req.session.username = req.params.username;

  console.log("/login/:username", req.session.username);

  res.send();
});*/

app.get("/angebote", async (req, res) => {
  
    const [rows] = await connection.execute("SELECT * FROM angebot");
    console.log(rows);

    res.json(rows);

  /*console.log("/todos", req.session.username);
  if (!req.session.username) {
    return res.status(401).send();
  }*/

  /*const [
    rows,
  ] = await connection.execute("SELECT * FROM todos WHERE author = ?", [
    req.session.username,
  ]);
  */
});

app.get("/benutzer", async (req, res) => {

    const [rows] = await connection.execute("SELECT * FROM benutzer");
      
    res.json(rows);
   
    

  /*console.log("/todos", req.session.username);
  if (!req.session.username) {
    return res.status(401).send();
  }*/

  /*const [
    rows,
  ] = await connection.execute("SELECT * FROM todos WHERE author = ?", [
    req.session.username,
  ]);
  */
});
app.post("/register", async (req, res) => {
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
});
/*
app.delete("/todos/:id", async (req, res) => {
  console.log(req.params.id);

  const [rows] = await connection.execute("DELETE FROM angebot WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.affectedRows === 1) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});*/

//Insert an Angebot 
app.post("/meineAngebote", async (req, res) => {
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO angebot (Preis, Kilometer, Ort, Erstzulassung, Bild, Beschreibung, Autor, Marke, Modell) \
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [req.body.preis,req.body.kilometer,req.body.ort,req.body.erstz,req.body.bild,req.body.bes,req.body.autor,req.body.marke,req.body.modell]
  );

  res.json({
    Preis: req.body.preis,
    Kilometer: req.body.kilometer,
    Ort: req.body.ort,
    Erstzulassung: req.body.erstz,
    Bild: req.body.bild,
    Beschreibung: req.body.bes,
    Autor: req.body.autor,
    Marke: req.body.marke,
    Modell: req.body.modell,
  });
});


app.listen(5100);
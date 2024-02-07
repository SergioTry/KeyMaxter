const express = require("express");
const db = require("./db.js");
const multer = require("multer");
const upload = multer();

const app = express();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

app.use(express.json());
app.use(express.static("public"));

// async function demo() {
//   await db.altaTeclado({
//     modelo: "Teclado129",
//     precio: 59.99,
//     enlace: "http://ejemplo.com",
//   });
//   console.log(JSON.stringify(await db.listarTeclados(), null, 2));
// }
// demo();

app.get("/teclados", async (req, res) => {
  // /teclados?marca=hola
  const marca = req.query.marca;
  const orden = req.query.orden;
  console.log(marca);
  // if (filtro) {
  //   res.send(db.buscarContactos(filtro));
  // } else {
  //   res.send(db.listarContactos());
  // }
  res.send(await db.listarTeclados());
});

app.post("/teclados", upload.none(), (req, res) => {
  console.log(req.body);
  res.sendStatus(HTTP_INTERNAL_SERVER_ERROR);
  // try {
  //   const nuevo = db.crearContacto(req.body);
  //   if (nuevo)
  //     res
  //       .status(HTTP_CREATED)
  //       .location(`/contactos/${nuevo.id}`)
  //       .send("Contacto creado.");
  //   else res.status(HTTP_BAD_REQUEST).send("Datos incorrectos.");
  // } catch (err) {
  //   res.sendStatus(HTTP_INTERNAL_SERVER_ERROR);
  // }
});

app.listen(5500, () => {
  try {
    console.log("Servicio escuchando");
  } catch {}
});

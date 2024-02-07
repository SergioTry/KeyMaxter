const db = require("./db.js");

async function demo() {
  await db.conectar();
  db.verificarConexion();

  await db.resetDB();

  // Comprovación de algunos errores:
  try {
    console.log(
      "Teclados ordenados por precio ascendente:",
      await db.Productos.tecladosOrdenAsc()
    );
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }

  var productos = await db.altaProductos({});

  try {
    await productos.addTeclado({
      modelo: "K31",
      marca: "Keychron",
      precio: -5,
      fechaLanzamiento: new Date("1990-01-01"),
    });
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }

  await productos.addTeclado({
    modelo: "K31",
    marca: "Keychron",
    precio: 140,
    fechaLanzamiento: new Date("1990-01-01"),
  });

  try {
    await productos.addTeclado({
      modelo: "K31",
      marca: "Keychron",
      precio: 140,
      fechaLanzamiento: new Date("1990-01-01"),
    });
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }

  try {
    console.log(productos.getTecladoXModelo("hola").modelo);
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }

  try {
    console.log(await productos.eliminarTecladoXModelo("hola"));
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }

  try {
    await productos.addSwitch({
      modelo: "2.0",
      color: "black",
      marca: "CheryMX",
      precio: 45,
      pack: [1, 30, 50],
      preLubed: true,
    });
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }

  await productos.addSwitch({
    modelo: "3.0",
    color: "red",
    marca: "CherryMX",
    precio: 45,
    packs: [110, 120],
    preLubed: true,
  });

  console.log(productos.getSwitchXModelo("3.0").packs);
  try {
    productos.getSwitchXModelo("3.0").addPack("");
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }
  productos.getSwitchXModelo("3.0").addPack(3);
  console.log(productos.getSwitchXModelo("3.0").packs);

  const teclado1 = productos.getTecladoXModelo("K31");

  await productos.addTeclado({
    modelo: "K32",
    marca: "Keychron",
    precio: 145,
    fechaLanzamiento: new Date("2020-01-01"),
  });

  await productos.addTeclado({
    modelo: "K35",
    marca: "Keychron",
    precio: 142,
    fechaLanzamiento: new Date("2024-01-01"),
  });

  var teclado4 = await db.Teclado.findOne({ modelo: "K32" });

  console.log(teclado4);
  await teclado4.modificarPrecio(900);

  // Me he visto obligado pese a que dentro del método
  // modificarPrecio uso el save y en el middleware de
  // productos también, los valores de las variables
  // no se actualizan por lo que tengo que hacerlo a mano.

  teclado4 = await db.Teclado.findOne({ modelo: "K32" });
  try {
    await teclado4.updateOne();
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }

  productos = await db.Productos.findOne();
  console.log(teclado4);
  const teclado2 = productos.getTecladoXModelo("K32");
  console.log(teclado2);

  const teclado3 = productos.getTecladoXModelo("K35");

  try {
    teclado1.comprar(51);
  } catch (e) {
    console.error(`Hubo un problema: ${e}`);
  }
  teclado1.comprar(49);
  console.log(teclado1);

  teclado1.reponer(2);
  console.log(teclado1);

  const switch1 = productos.getSwitchXModelo("3.0");

  var switch5 = await db.Switch.findOne({ modelo: "3.0" });
  console.log(switch5);
  await switch5.modificarColor("blue");
  productos = await db.Productos.findOne();
  switch5 = await db.Switch.findOne({ modelo: "3.0" });
  console.log(switch5);
  console.log(productos);

  // Ejemplo de campos virtuales
  console.log(
    `Modelo de teclado: ${teclado1.modelo} Antigüedad: ${teclado1.antiguedad}`
  );
  console.log(
    `Modelo de teclado: ${teclado2.modelo} Antigüedad: ${teclado2.antiguedad}`
  );
  console.log(
    `Modelo de teclado: ${teclado3.modelo} Antigüedad: ${teclado3.antiguedad}`
  );
  console.log(`Modelo de switch: ${switch1.modelo} Tipo: ${switch1.tipo}`);

  // Ejemplo de mostrar un teclado incluyendo los campos virtuales
  console.log(teclado1.toJSON({ virtuals: true }));

  await productos.addSwitch({
    modelo: "4.0",
    color: "blue",
    marca: "Gateron",
    precio: 10,
    packs: [110, 120],
    preLubed: false,
  });

  await productos.addSwitch({
    modelo: "5.0",
    color: "brown",
    marca: "Gateron",
    precio: 70,
    packs: [120],
    preLubed: false,
  });

  console.log(productos);

  // Al eliminar, se añade un registro en productos sobre el modelo eliminado y la fecha
  await productos.eliminarTecladoXModelo("K31");
  console.log(productos);

  //Consultas de ordenación
  console.log(
    "Teclados ordenados por precio ascendente:",
    await db.Productos.tecladosOrdenAsc()
  );
  console.log(
    "Teclados ordenados por precio descendente:",
    await db.Productos.tecladosOrdenDesc()
  );

  db.desconectar();
  db.verificarConexion();
}

demo();
// preguntar (ya es tarde para eso jajajajaj)
//db.verificarConexion();

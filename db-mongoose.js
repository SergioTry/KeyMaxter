const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/keymaxter");

function numeroNoNegativo(value) {
  return value >= 0;
}

const TecladoSchema = new mongoose.Schema(
  {
    // Teclado: modelo,marca,precio,stock,ventas,fechaLanzamiento
    //     virt: antigüedad, disponible
    modelo: { type: String, required: true, unique: true },
    marca: { type: String, required: true },
    precio: {
      type: Number,
      required: true,
      validate: {
        validator: numeroNoNegativo,
        message: "Debe ser un número positivo",
      },
    },
    stock: {
      type: Number,
      default: 50,
      validate: {
        validator: numeroNoNegativo,
        message: "Debe ser un número positivo",
      },
    },
    ventas: {
      type: Number,
      default: 0,
      validate: {
        validator: numeroNoNegativo,
        message: "Debe ser un número positivo",
      },
    },
    fechaLanzamiento: { type: Date, required: true },
  },
  {
    virtuals: {
      antiguedad: {
        get() {
          // Si fechaLanzamiento>=8años --> Antigüo, si fechaLanzamiento<8años --> Actual
          // si fechaLanzamiento<=2años --> Nuevo
          let diferenciaMiliSegundos =
            new Date() - this.fechaLanzamiento.getTime();
          let diferenciaEnAnios =
            diferenciaMiliSegundos / (1000 * 60 * 60 * 24 * 365.25);
          let aniosTranscurridos = Math.floor(diferenciaEnAnios);

          if (aniosTranscurridos >= 8) return "Antigüo";
          if (aniosTranscurridos < 8 && aniosTranscurridos > 2) return "Actual";
          return "Nuevo";
        },
      },
      disponible: {
        get() {
          return this.stock > this.ventas;
        },
      },
    },
    methods: {
      comprar(cantidadTeclados) {
        if (typeof cantidadTeclados !== "number") {
          throw new Error("Debe ser una cantidad numérica.");
        }
        if (!numeroNoNegativo(cantidadTeclados)) {
          throw new Error("Debe ser un número positivo.");
        }
        if (this.ventas + cantidadTeclados > this.stock)
          throw new Error("No hay stock suficiente.");
        this.ventas = this.ventas + cantidadTeclados;
      },
      reponer(cantidadTeclados) {
        if (typeof cantidadTeclados !== "number") {
          throw new Error("Debe ser una cantidad numérica.");
        }
        if (!numeroNoNegativo(cantidadTeclados)) {
          throw new Error("Debe ser un número positivo.");
        }
        this.stock = this.stock + cantidadTeclados;
      },
      async modificarPrecio(nuevoPrecio) {
        if (typeof nuevoPrecio !== "number") {
          throw new Error("Debe ser una cantidad numérica.");
        }
        if (!numeroNoNegativo(nuevoPrecio)) {
          throw new Error("Debe ser un número positivo.");
        }
        await Teclado.updateOne(
          { modelo: this.modelo },
          { precio: nuevoPrecio }
        );
        await this.save();
      },
    },
  }
);

TecladoSchema.pre("updateOne", async function () {
  // Esto lo hago para comprovar si hay alguna condición establecida en
  // el update.
  if (Object.keys(this._conditions).length === 0)
    throw new Error("No has establecido un filtro para modificar");
  let productosEncontrados = Productos.find();
  // El _conditions contiene el filtro usado en el update,
  // del cual saco el modelo del teclado que quiero modificar
  // en el array de teclados de productos.
  // De el _update saco el precio
  let modeloActualizado = this._conditions.modelo;
  let productoCorrespodiente = await productosEncontrados
    .where("teclados")
    .elemMatch({ modelo: modeloActualizado });

  productoCorrespodiente[0].teclados.forEach((tec) => {
    if (tec.modelo == modeloActualizado) {
      tec.precio = this._update.precio;
    }
  });
  await productoCorrespodiente[0].save();
});

const SwitchSchema = new mongoose.Schema(
  {
    //Swtich: modelo,color,marca,preLubed,packs
    //  virt: tipo
    modelo: { type: String, required: true, unique: true },
    color: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          value = value.toUpperCase();
          return value == "RED" || value == "BLUE" || value == "BROWN";
        },
        message: (props) => `${props.value} is not a valid color of switch!`,
      },
    },
    marca: {
      type: String,
      required: true,
      enum: {
        values: ["Gateron", "Kailh", "CherryMX", "OUTEMU"],
        message: `{VALUE} no es una marca permitida`,
      },
    },
    precio: {
      type: Number,
      required: true,
      validate: {
        validator: numeroNoNegativo,
        message: "Debe ser un número positivo",
      },
    },
    preLubed: { type: Boolean, required: true },
    packs: { type: [Number], required: true },
    stock: {
      type: Number,
      default: 50,
      validate: {
        validator: numeroNoNegativo,
        message: "Debe ser un número positivo",
      },
    },
    ventas: {
      type: Number,
      default: 0,
      validate: {
        validator: numeroNoNegativo,
        message: "Debe ser un número positivo",
      },
    },
  },
  {
    virtuals: {
      tipo: {
        get() {
          if (this.color == "RED") return "Lineal";
          if (this.color == "BLUE") return "Táctil";
          return "Lineal y táctil";
        },
      },
    },
    methods: {
      comprar(cantidadSwitch) {
        if (typeof cantidadSwitch !== "number") {
          throw new Error("Debe ser una cantidad numérica.");
        }
        if (!numeroNoNegativo(cantidadSwitch)) {
          throw new Error("Debe ser un número positivo.");
        }
        if (this.ventas + cantidadSwitch > this.stock)
          throw new Error("No hay stock suficiente.");
        this.ventas = this.ventas + cantidadSwitch;
      },
      reponer(cantidadSwitch) {
        if (typeof cantidadSwitch !== "number") {
          throw new Error("Debe ser una cantidad numérica.");
        }
        if (!numeroNoNegativo(cantidadSwitch)) {
          throw new Error("Debe ser un número positivo.");
        }
        this.stock = this.stock + cantidadSwitch;
      },
      addPack(pack) {
        if (typeof pack !== "number") {
          throw new Error("Debe ser una cantidad numérica.");
        }
        if (!numeroNoNegativo) {
          throw new Error("Debe ser un número positivo.");
        }
        this.packs.addToSet(pack);
      },
      async modificarColor(nuevoColor) {
        await Switch.updateOne({ modelo: this.modelo }, { color: nuevoColor });
        await this.save();
      },
    },
  }
);

SwitchSchema.pre("save", function () {
  this.color = this.color.toUpperCase();
});

SwitchSchema.pre("updateOne", async function () {
  if (Object.keys(this._conditions).length === 0)
    throw new Error("No has establecido un filtro para modificar");
  let productosEncontrados = Productos.find();
  let modeloActualizado = this._conditions.modelo;
  let productoCorrespodiente = await productosEncontrados
    .where("switches")
    .elemMatch({ modelo: modeloActualizado });

  productoCorrespodiente[0].switches.forEach((swi) => {
    if (swi.modelo == modeloActualizado) {
      swi.color = this._update.color;
    }
  });
  await productoCorrespodiente[0].save();
});

async function altaTeclado(datosTeclado) {
  return await Teclado.create(datosTeclado);
}
async function altaSwitch(datosSwitch) {
  return await Switch.create(datosSwitch);
}

// Al principio pensé en hacer los métodos CRUD en métodos estáticos
// pero, los métodos estáticos no tienen acceso a las instancias de un
// documento específico osea que no pueden acceder o sus atributos directamente.
// Esto me impedía acceder a los arrays de teclados y switches.

const ProductosSchema = new mongoose.Schema(
  {
    teclados: [TecladoSchema],
    switches: [SwitchSchema],
    registro: {
      type: Map,
      of: String,
      default: new Map(),
    },
  },
  {
    methods: {
      async addTeclado(datosTeclado) {
        let nuevoTeclado = await altaTeclado(datosTeclado);
        this.teclados.push(nuevoTeclado);
        await this.save();
      },
      async addSwitch(datosSwitch) {
        let nuevoSwitch = await altaSwitch(datosSwitch);
        this.switches.addToSet(nuevoSwitch);
        await this.save();
      },
      async eliminarTecladoXModelo(modeloTeclado) {
        let tecladoIndex = this.teclados.findIndex(
          (teclado) => teclado.modelo === modeloTeclado
        );

        if (tecladoIndex !== -1) {
          this.teclados.splice(tecladoIndex, 1);
          this.registro.set(modeloTeclado, new Date());
          await this.save();
          return `Teclado con modelo ${modeloTeclado} eliminado.`;
        } else {
          throw new Error(
            `Teclado con modelo ${modeloTeclado} no encontrado en la lista.`
          );
        }
      },
      async eliminarSwitchXModelo(modeloSwitch) {
        let swtichIndex = this.teclados.findIndex(
          (switc) => switc.modelo === modeloSwitch
        );

        if (swtichIndex !== -1) {
          this.switches.splice(swtichIndex, 1);
          this.registro.set(modeloSwitch, new Date());
          await this.save();
          return `Switch con modelo ${modeloSwitch} eliminado.`;
        } else {
          throw new Error(
            `Switch con modelo ${modeloSwitch} no encontrado en la lista.`
          );
        }
      },
      getSwitchXModelo: function (modelo) {
        let switchEncontrado = this.switches.find(
          (switc) => switc.modelo === modelo
        );
        if (!switchEncontrado) {
          throw new Error("Switch no encontrado");
        }
        return switchEncontrado;
      },
      getTecladoXModelo: function (modelo) {
        let tecladoEncontrado = this.teclados.find(
          (tec) => tec.modelo === modelo
        );
        if (!tecladoEncontrado) {
          throw new Error("Teclado no encontrado");
        }
        return tecladoEncontrado;
      },
    },
    statics: {
      tecladosOrdenAsc: async function () {
        let produc = await Productos.findOne();
        if (!produc) {
          throw new Error("No hay lista de productos existente.");
        }
        let arrayDeTeclados = produc.teclados;
        let tecladosOrdenadosAscendente = arrayDeTeclados
          .slice()
          .sort((a, b) => a.precio - b.precio);
        return tecladosOrdenadosAscendente;
      },
      tecladosOrdenDesc: async function () {
        let produc = await Productos.findOne();
        let arrayDeTeclados = produc.teclados;
        if (!produc) {
          throw new Error("No hay lista de productos existente.");
        }
        let tecladosOrdenadosDescendente = arrayDeTeclados
          .slice()
          .sort((a, b) => b.precio - a.precio);
        return tecladosOrdenadosDescendente;
      },
      switchesOrdenAsc: async function () {
        let produc = await Productos.findOne();
        if (!produc) {
          throw new Error("No hay lista de productos existente.");
        }
        let arrayDeSwitches = produc.switches;
        let switchesOrdenadosAscendente = arrayDeSwitches
          .slice()
          .sort((a, b) => a.precio - b.precio);
        return switchesOrdenadosAscendente;
      },
      switchesOrdenDesc: async function () {
        let produc = await Productos.findOne();
        let arrayDeSwitches = produc.switches;
        if (!produc) {
          throw new Error("No hay lista de productos existente.");
        }
        let switchesOrdenadosDescendente = arrayDeSwitches
          .slice()
          .sort((a, b) => b.precio - a.precio);
        return switchesOrdenadosDescendente;
      },
    },
  }
);

const Teclado = mongoose.model("Teclado", TecladoSchema);
const Switch = mongoose.model("Switch", SwitchSchema);
const Productos = mongoose.model("Producto", ProductosSchema);

exports.conectar = async function () {
  await mongoose.connect("mongodb://127.0.0.1:27017/keymaxter");
};

exports.desconectar = mongoose.disconnect;

exports.altaProductos = async function (datosProductos) {
  return await Productos.create(datosProductos);
};

exports.mostrarTeclados = async function () {
  return await Teclado.find();
};

exports.resetDB = async function () {
  await Teclado.deleteMany();
  await Switch.deleteMany();
  await Productos.deleteMany();
};

exports.Productos = Productos;
exports.Teclado = Teclado;
exports.Switch = Switch;

exports.verificarConexion = function () {
  const estadoConexion = mongoose.connection.readyState;

  switch (estadoConexion) {
    case 0:
      console.log("Desconectado");
      break;
    case 1:
      console.log("Conectado");
      break;
    case 2:
      console.log("Conectando...");
      break;
    case 3:
      console.log("Desconectando...");
      break;
    default:
      console.log("Estado desconocido");
  }
};

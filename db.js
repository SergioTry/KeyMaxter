const { Sequelize, DataTypes } = require("sequelize");
const multer = require("multer");

const sequelize = new Sequelize("XE", "keymaxter", "deamu", {
  host: "localhost",
  dialect: "oracle",
  dialectOptions: { maxRows: 500 },
});

const ModeloTeclado = sequelize.define(
  "teclado",
  {
    modelo: {
      field: "MODELO",
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 30],
      },
    },
    precio: {
      field: "PRECIO",
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    enlace: {
      field: "ENLACE",
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      field: "AUTOR",
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        len: [0, 15], // Validación de longitud máxima de 15 caracteres
      },
    },
    image1: {
      field: "IMAGE_1",
      type: DataTypes.STRING,
      allowNull: true,
    },
    image2: {
      field: "IMAGE_2",
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "PROD_TECLADO",
    timestamps: false,
    // Si no hay campos de timestamp en la tabla
  }
);

const ModeloSwitch = sequelize.define(
  "switch",
  {
    modelo: {
      field: "MODELO",
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 30],
      },
    },
    precio: {
      field: "PRECIO",
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    enlace: {
      field: "ENLACE",
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      field: "MARCA",
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        len: [0, 15],
      },
    },
    image1: {
      field: "IMAGE_1",
      type: DataTypes.STRING,
      allowNull: true,
    },
    image2: {
      field: "IMAGE_2",
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "PROD_SWITCH",
    timestamps: false,
  }
);

exports.altaTeclado = async function (datosTeclado) {
  // Esto es necesario para que en caso de que no exista la tabla
  // se cree en el momento
  await sincronizarDB();
  await validacionAlta(datosTeclado, ModeloTeclado);
  return await ModeloTeclado.create(datosTeclado);
};

exports.altaSwitch = async function (datosSwitch) {
  await sincronizarDB();
  await validacionAlta(datosSwitch, ModeloSwitch);
  return await ModeloSwitch.create(datosSwitch);
};

exports.borrarTeclado = async function (idTeclado) {
  await sincronizarDB();
  return await ModeloTeclado.destroy({ where: { id: idTeclado } });
};

exports.borrarSwitch = async function (idSwitch) {
  await sincronizarDB();
  return await ModeloSwitch.destroy({ where: { id: idSwitch } });
};

exports.modificarTeclado = async function (datosTeclado) {
  await sincronizarDB();
  if (!/^\d+(,\d+)?$/.test(datosTeclado.precio))
    throw new Sequelize.ValidationError("formato de precio no válido");
  return await ModeloTeclado.update(datosTeclado, {
    where: {
      modelo: datosTeclado.modelo,
    },
  });
};

exports.modificarSwitch = async function (datosSwitch) {
  await sincronizarDB();
  if (!/^\d+(,\d+)?$/.test(datosSwitch.precio))
    throw new Sequelize.ValidationError("formato de precio no válido");
  return await ModeloSwitch.update(datosSwitch, {
    where: {
      modelo: datosSwitch.modelo,
    },
  });
};

exports.listarProductos = async function (
  orden = undefined,
  autor = undefined
) {
  await sincronizarDB();
  if (autor) {
    if (orden) {
      if (orden == 1) {
        return await ModeloTeclado.findAll({
          where: {
            autor: autor,
          },
          order: {
            precio: "DESC",
          },
        });
      } else {
        return await ModeloTeclado.findAll({
          where: {
            autor: autor,
          },
          order: {
            precio: "ASC",
          },
        });
      }
    } else {
      return await ModeloTeclado.findAll({
        where: {
          autor: autor,
        },
      });
    }
  }
  if (orden) {
    if (orden == 1) {
      return await ModeloTeclado.findAll({
        order: {
          precio: "DESC",
        },
      });
    } else {
      return await ModeloTeclado.findAll({
        order: {
          precio: "ASC",
        },
      });
    }
  }
  return await ModeloTeclado.findAll();
};

exports.listarAutoresTeclados = async function () {
  await sincronizarDB();
  return await ModeloTeclado.findAll({
    attributes: ["autor"],
    group: ["AUTOR"],
  });
};

exports.listarMarcasSwitchs = async function () {
  await sincronizarDB();
  return await ModeloSwitch.findAll({
    attributes: ["marca"],
    group: ["marca"],
  });
};

exports.listarSwitchs = async function () {
  await sincronizarDB();
  return await ModeloSwitch.findAll();
};

async function validacionAlta(datosProducto, modelo) {
  // Validación de precio mediante regex
  if (!/^\d+(,\d+)?$/.test(datosProducto.precio))
    throw new Sequelize.ValidationError("formato de precio no válido");
  const resultados = await modelo.findAll({
    where: {
      modelo: datosProducto.modelo,
    },
  });
  if (resultados.length >= 1)
    throw new Sequelize.ValidationError("modelo ya existente");
}

async function sincronizarDB() {
  await ModeloTeclado.sync({ forze: true });
  await ModeloSwitch.sync();
}

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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      type: DataTypes.STRING,
      allowNull: true,
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
  await ModeloTeclado.sync();
  return await ModeloTeclado.create(datosTeclado);
};

exports.altaSwitch = async function (datosSwitch) {
  await ModeloSwitch.sync();
  return await ModeloSwitch.create(datosSwitch);
};

exports.borrarTeclado = async function (idTeclado) {
  return await ModeloTeclado.destroy({ where: { id: idTeclado } });
};

exports.borrarSwitch = async function (idSwitch) {
  return await ModeloSwitch.destroy({ where: { id: idSwitch } });
};

exports.modificarTeclado = async function (idTeclado, datosTeclado) {
  return await ModeloTeclado.update(datosTeclado, {
    where: {
      id: idTeclado,
    },
  });
};

exports.listarProductos = async function (
  producto,
  orden = undefined,
  marca = undefined
) {
  if (marca) {
    if (orden) {
      if (orden == 1) {
        return await ModeloTeclado.findAll({
          where: {
            marca: marca,
          },
          order: {
            precio: "DESC",
          },
        });
      } else {
        return await ModeloTeclado.findAll({
          where: {
            marca: marca,
          },
          order: {
            precio: "ASC",
          },
        });
      }
    } else {
      return await ModeloTeclado.findAll({
        where: {
          marca: marca,
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

exports.listarMarcasTeclados = async function () {
  return await ModeloTeclado.findAll({ attributes: ["marca"] });
};

exports.listarSwitchs = async function () {
  return await ModeloSwitch.findAll();
};

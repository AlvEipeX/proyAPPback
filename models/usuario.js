const coneccion = require("../database");
const crypto = require("crypto");

function sha256(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

module.exports = {
  listado: (callBack) => {
    coneccion.query(`select * from usuario`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },

  insertar: (datos, callBack) => {
    coneccion.query(
      `insert into usuario (nombre,apellido,username,fecnac,password,imagen) values (?,?,?,?,?,?)`,
      [datos.nombre, datos.apellido, datos.username, datos.fecnac, datos.password,datos.imagen],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  borrar: (datos, callBack) => {
    coneccion.query(
      `delete from usuario where id=?`,
      [datos.id],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  actualizar: (datos, callBack) => {
    coneccion.query(
      `update usuario set nombre=?,apellido=?,username=?,fecnac=? where id=?`,
      [datos.nombre, datos.apellido, datos.username, datos.fecnac, datos.id],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  verificar: (datos, callBack) => {
    coneccion.query(
      `SELECT * FROM usuario WHERE username = ? AND password = ?`,
      [datos.username, datos.password],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        if (!datos.username || !datos.password) {
          return callBack(error);
        }
        if (results.length === 0) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};

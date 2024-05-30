const coneccion = require("../database");

module.exports = {
  listado: (callBack) => {
    coneccion.query(
      `SELECT * FROM publicacion ORDER BY fec_pub DESC;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  insertar: (datos, callBack) => {
    coneccion.query(
      `insert into publicacion (contenido,likes,fec_pub,id) values (?,?,?,?)`,
      [datos.contenido, datos.likes, datos.fec_pub, datos.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
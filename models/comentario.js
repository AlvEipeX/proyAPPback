const coneccion = require("../database");

module.exports = {
  listado: (callBack) => {
    coneccion.query(
      `SELECT * FROM comentario ORDER BY fec_com DESC;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  listado_com: (datos, callBack) => {
    coneccion.query(
      `SELECT * FROM comentario c,usuario u WHERE c.cod_pub = ? AND c.id = u.id ORDER BY fec_com DESC;`,
      [datos.cod_pub],
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
      `insert into comentario (contenido_com,fec_com,cod_pub,id) values (?,?,?,?)`,
      [datos.contenido_com, datos.fec_com, datos.cod_pub, datos.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};

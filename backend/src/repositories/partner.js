const Db = require("./db");

const TABLE_NAME = "partner";

exports.findById = async (id) => {
  const [rows] = await Db.query(
    `select * from ${TABLE_NAME} where id = ? and deleted_at is null limit 1`,
    [id]
  );
  return rows[0];
};

exports.findByUuid = async (uuid) => {
  const [rows] = await Db.query(
    `select * from ${TABLE_NAME} where uuid = ? and deleted_at is null limit 1`,
    [uuid]
  );
  return rows[0];
};

exports.findByEmail = async (email) => {
  const [rows] = await Db.query(
    `select * from ${TABLE_NAME} where email = ? and deleted_at is null limit 1`,
    [email]
  );
  return rows[0];
};

exports.updateLastLogin = async (email) => {
  const [status] = await Db.query(
    `UPDATE ${TABLE_NAME} SET last_login_at = NOW() WHERE email = ?`,
    [email]
  );
  return status;
};

module.exports = exports;

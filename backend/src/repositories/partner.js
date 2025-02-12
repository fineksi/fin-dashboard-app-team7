const Db = require('./db');

const TABLE_NAME = 'partner';

exports.findById = async (id) => {
    const [rows] = await Db.query(`select * from ${TABLE_NAME} where id = ? and deleted_at is null limit 1`, [id]);
    return rows[0];
};

exports.findByUuid = async (uuid) => {
    const [rows] = await Db.query(`select * from ${TABLE_NAME} where uuid = ? and deleted_at is null limit 1`, [uuid]);
    return rows[0];
};

module.exports = exports

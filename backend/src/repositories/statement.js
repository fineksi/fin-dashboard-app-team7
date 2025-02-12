const Db = require('./db');
const RepoUtil = require('../utils/repo');

const TABLE_NAME = 'statement';

exports.findAll = async (params = {}) => {
    const result = await RepoUtil.findAll(Db, TABLE_NAME, params);
    return result;
};

exports.findById = async (id) => {
    const [rows] = await Db.query(`select * from ${TABLE_NAME} where id = ? and deleted_at is null limit 1`, [id]);
    return rows[0];
};

exports.findByUuid = async (uuid) => {
    const [rows] = await Db.query(`select * from ${TABLE_NAME} where uuid = ? and deleted_at is null limit 1`, [uuid]);
    return rows[0];
};

module.exports = exports;

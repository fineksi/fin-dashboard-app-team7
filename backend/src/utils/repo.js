const TimeUtil = require('./time');

const NODE_ENV = process.env.NODE_ENV;
const unusedvar = 'unused variable';
exports.findAll = async (db, tableName, params = {}) => {
    const {
        wheres = {},
        orders = [[]],
        limit = 500,
        offset = 0,
        queryCount = false,
    } = params;

    const queryText = [];
    const queryValues = [];
    if (wheres && typeof wheres === 'object' && !Array.isArray(wheres)) {
        Object.entries(wheres).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (value.length > 0) {
                    queryText.push(`and ${key} in (?)`);
                    queryValues.push(value);
                } else {
                    if (NODE_ENV === 'local') {
                        console.warn(`Empty value of ${key} in findAll params`);
                    }

                    queryText.push(`and ${key} = ?`);
                    queryValues.push(-123456789);
                }
            } else {
                queryText.push(`and ${key} = ?`);
                queryValues.push(value);
            }
        });
    }

    let querySelect;
    let querySorting;
    let replacers;
    if (queryCount) {
        // Pagination.
        querySelect = 'count(1) as count';
        querySorting = '';
        replacers = queryValues;
    } else {
        // Rows.
        querySelect = '*';
        let orderQuery;
        if (orders?.length) {
            orderQuery = orders.map((o) => o.join(' ')).join(', ');
        }

        querySorting = `order by ${orderQuery || 'id'} limit ? offset ?`;
        replacers = [...queryValues, limit, offset];
    }

    const query = `
select      ${querySelect}
from        ${tableName}
where       deleted_at is null
${queryText.join(' ')}
${querySorting}`;
    const [rows] = await db.query(query, replacers);
    return rows;
};

exports.bulkCreate = async (db, tableName, columns, dataArray) => {
    if (!dataArray || dataArray.length === 0) {
        return { affectedRows: 0, insertIds: [] };
    }

    const columnsStr = columns.map((c) => `\`${c}\``).join(', ');
    const values = dataArray.map((data) => columns.map((column) => data[column]));
    const placeholders = values.map(() => `(${columns.map((c) => (c ? '?' : '')).join(',')})`).join(', ');
    const params = values.flat();

    const sql = `INSERT INTO ${tableName} 
(${columnsStr})
VALUES ${placeholders}`;

    const [{ affectedRows, insertId }] = await db.query(sql, params);
    const insertIds = Array.from({ length: dataArray.length }, (_, index) => insertId + index);
    return { affectedRows, insertIds };
};

const updateRecords = async (db, tableName, updatedData, condition, singleRecord = true, includeDeleted = true) => {
    if (!condition || Object.keys(condition) === 0) return { affectedRows: 0 };

    const updated = { ...updatedData };
    const updateColumns = [];
    const updateValues = [];
    Object.entries(updated).forEach(([key, value]) => {
        updateColumns.push(`${key} = ?`);
        updateValues.push(value);
    });

    const conditionColumns = [];
    const conditionValues = [];
    if (includeDeleted) {
        Object.entries(condition).forEach(([key, value]) => {
            conditionColumns.push(`and ${key} = ?`);
            conditionValues.push(value);
        });
    } else {
        Object.entries(condition).forEach(([key, value], index) => {
            conditionColumns.push(`${index === 0 ? '' : 'and'} ${key} = ?`);
            conditionValues.push(value);
        });
    }

    const deletedCondition = includeDeleted ? 'deleted_at is null' : '';

    const sql = `update ${tableName}
set     ${updateColumns.join(', ')}
where   ${deletedCondition}
${conditionColumns.join(' ')}
${singleRecord ? 'limit   1' : ''}`;
    const [{ affectedRows }] = await db.query(sql, [...updateValues, ...conditionValues]);
    return { affectedRows };
};

exports.updateByKey = async (db, tableName, keyColumn, id, data, includeDeleted = true) => {
    const updatedData = { ...data, updated_at: TimeUtil.now() };
    const condition = {};
    condition[keyColumn] = id;
    const result = await updateRecords(db, tableName, updatedData, condition, true, includeDeleted);
    return result;
};

exports.deleteById = async (db, tableName, id) => {
    const updatedData = { deleted_at: TimeUtil.now() };
    const condition = { id };
    const result = await updateRecords(db, tableName, updatedData, condition, true);
    return result;
};

exports.deleteByUuid = async (db, tableName, uuid) => {
    const updatedData = { deleted_at: TimeUtil.now() };
    const condition = { uuid };
    const result = await updateRecords(db, tableName, updatedData, condition, true);
    return result;
};

exports.deleteManyByCondition = async (db, tableName, condition) => {
    const updatedData = { deleted_at: TimeUtil.now() };
    const result = await updateRecords(db, tableName, updatedData, condition, false);
    return result;
};

module.exports = exports;

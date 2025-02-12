const mysql = require('mysql2/promise');
const ResourceUtil = require('../utils/resource');

let pool;
const init = () => {
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        connectionLimit: process.env.MYSQL_POOL_LIMIT || 10,
        waitForConnections: true,
        queueLimit: 0,
    });

    const cleanupHandler = async () => {
        try {
            console.log('mysql pool is releasing');
            const connection = await pool.getConnection();
            connection.release();
        } catch (err) {
            console.log(err.message);
        }
    };
    ResourceUtil.addCleanupHandler(cleanupHandler);
};
if (process.env.NODE_ENV !== 'test') {
    init();
}

module.exports = pool;

const mysql = require('mysql');

var pool  = mysql.createPool({
    "user"     : 'root',
    "password" : 'root',
    "database" : 'teleagro',
    "host"     : 'localhost',
    "port"     : 3306,
});

var poolMulti  = mysql.createPool({
    "user"     : 'root',
    "password" : 'root',
    "database" : 'teleagro',
    "host"     : 'localhost',
    "port"     : 3306,
    "multipleStatements": true
});

exports.execute = (query, params=[], multi=false) => {
    return new Promise((resolve, reject) => {
        if (multi) {
            poolMulti.query(query, params, (error, result, fields) => {
                if (error) { reject(error); } else { resolve(result) }
            });
        } else {
            pool.query(query, params, (error, result, fields) => {
                if (error) { reject(error); } else { resolve(result) }
            });
        }

    })
}

exports.poolNormal = pool;
exports.poolMulti = poolMulti;
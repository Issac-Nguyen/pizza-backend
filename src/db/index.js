var mysql = require('mysql');
const config = require('../../config');
const Log = require('../services/writeLogService');

class DB {
    constructor(host, user, pwd, dbName) {
        this.pool = mysql.createPool({
            connectionLimit : 10,
            host     : host,
            user     : user,
            password : pwd,
            database : dbName
          });
    }

    init() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    // not connected!
                    console.error('error connecting: ' + err.stack);
                    Log.writeLog(err.stack);
                    return reject(err);
                } 

                console.log('database connected')
                connection.release();
                resolve();
              });
        })
    }

    execute(query, model, connection) {
            if(connection) {
                return new Promise((resolve, reject) => {
                    connection.query(query, model, function (error, results, fields) {
                        if (error) {
                            console.log("ERROR: " + error.message);
                            return reject(error);
                        }
                    resolve(results);
                    });
            });
            } else {
                return new Promise((resolve, reject) => {
                this.pool.getConnection(function(err, connection) {
                    if (err) {
                        console.log("ERROR: " + err.message);
                        return reject(err);
                    }
                    connection.query(query, model, function (error, results, fields) {
                        if (err) {
                            console.log("ERROR: " + err.message);
                            return reject(err);
                        }
                      connection.release();
                      resolve(results);
                    });
                  });
                });
            }
    }

    beginTransaction() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    console.log("ERROR: " + err.message);
                    return reject(err);
                }
                resolve(connection);
            })
        })
    }

    commitTransaction(connection) {
        return new Promise((resolve, reject) => {
            connection.commit(async (err) => {
                if (err) {
                  await this.rollbackTransaction(connection);
                  return reject(err);
                }
                resolve();
              });
        })
    }

    rollbackTransaction(connection) {
        return new Promise((resolve, reject) => {
            connection.rollback();
            resolve()
        })
    }
}

module.exports = new DB(config.db.host, config.db.user, config.db.password, config.db.dbName);
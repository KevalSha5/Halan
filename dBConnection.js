class DBConnection {

    constructor(connection) {
        let {host, user, password, database} = connection;
        let mysql = require('promise-mysql');
        mysql.createConnection({
            host     : host,
            user     : user,
            password : password,
            database : database
        }).then(connection => this.connection = connection);
    }

    add(table, columns, values) {
        let sql = `insert into ${table}(${columns.join()}) (${values.join()})`
        return this.connection.query(sql);
    }

    get(table, columns) {
        let sql = `select ${columns.join()} from ${table}`;
        return this.connection.query(sql);
    }

    getRandom(table, columns) {
        let sql = `select ${columns.join()} from ${table}`;
        return this.connection.query(sql);
    }
}

module.exports = DBConnection;
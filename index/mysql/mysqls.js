var mysql = require('mysql');

var config = {
    user: 'root',
    password: 'root',
    database: 'lemon'
}

var pool = mysql.createPool(config);

module.exports = function(sql, arr, fn) {
    fn = fn ? fn : arr;
    arr = arr || [];
    pool.getConnection(function(err, con) {
        if (err) {
            fn(err)
        } else {
            con.query(sql, arr, function(err, result) {
                if (err) {
                    return fn(err)
                } else {
                    fn(null, result);
                    con.release();
                }
            })
        }
    })
}
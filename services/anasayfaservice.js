var db = openDatabase('mydb', '1.0', 'productdb', 2048);

function listeleprod() {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM product', [], function(tx, results) {
                    resolve(results);
                },
                function(tx, error) {
                    reject(error.message);
                });
        });
    })

}
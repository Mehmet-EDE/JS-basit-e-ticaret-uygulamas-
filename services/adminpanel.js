var db = openDatabase('mydb', '1.0', 'productdb', 2048);
db.transaction(function(a) {
    a.executeSql('CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY,adet INTEGER,fiyat INTEGER,foto VARCHAR(50),name VARCHAR(10))'),
        function(tx, results) { console.log("tablo oluşturuldu."); }
}, function(tx, error) {
    console.log("tablo yaratılmadı:" + tx);
});

function yükle(adet, fiyat, b64, name) {
    return new Promise(function(resolve, reject) {
        db.transaction(
            function(tx) {
                tx.executeSql('INSERT INTO product (adet,fiyat,foto,name) VALUES ( ?, ?, ?,?)', [adet, fiyat, b64, name], function(tx, result) {
                        resolve(alert("Kayıt başarılı" + result));
                    },
                    function(error) {
                        reject(alert("Kayıt başarısız:" + error.message))
                    });
            }
        );
    })
}

function listele() {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM product', [], function(tx, results) {
                resolve(results);

            }, function(error) {
                reject(error.message);
            });
        });
    })

}

function güncelle(adetgnc, fiyatgnc, adgnc, fotognc, idsi) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("UPDATE product SET adet=?, fiyat=?, foto=?,name=? WHERE id=?", [adetgnc, fiyatgnc, fotognc, adgnc, idsi],
                function(tx, result) {
                    resolve(alert("güncelleme başarılı"))
                },
                function(tx, error) {
                    reject(alert("Güncelleme başarısız" + error.message))
                });
        })
    })
}

function productSil(adres) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("DELETE FROM product WHERE id=?", [adres], function(tx, result) {
                resolve(alert("Silme işlemi başarılı"));
            }, function(tx, error) {
                reject(alert("Silme başarısız:" + error.message));
            })
        })
    })
}
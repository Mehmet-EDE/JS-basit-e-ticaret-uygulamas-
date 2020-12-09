 var db = openDatabase('mydb', '1.0', 'productdb', 2048);
 db.transaction(function(a) {
     a.executeSql('CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY,adet INTEGER,urun_id INTEGER,user_id INTEGER, FOREIGN KEY (user_id)REFERENCES account (id),FOREIGN KEY (urun_id) REFERENCES product (id) )'),
         function(tx, results) {
             console.log("başarılı");
         },
         function(tx, error) {
             console.log("başarısız :" + error.massage);
         }

 });

 function sepette(urun_id, user_id) {
     return new Promise(function(resolve, reject) {
         db.transaction(function(tx) {
             tx.executeSql("INSERT INTO cart (adet,urun_id,user_id) VALUES(1,?,?)", [urun_id, user_id], function(tx, results) {
                     resolve(alert("Sepete ekleme başarılı"))
                 },
                 function(tx, error) {
                     resolve(alert("başarısız :" + error.massage));
                 })

         })
     })
 }

 function listelecart() {
     return new Promise(function(resolve, reject) {
         db.transaction(function(tx) {
             tx.executeSql("SELECT product.id,cart.adet,product.fiyat,product.foto,product.name FROM cart LEFT OUTER JOIN product ON cart.urun_id=product.id", [],
                 function(tx, results) {
                     resolve(results);
                 },
                 function(tx, error) {
                     reject(error.message);
                 });
         })
     })
 }

 function güncelleCart(stok, id) {
     return new Promise(function(resolve, reject) {
         db.transaction(function(tx) {
             tx.executeSql("UPDATE product SET adet=? WHERE id=?", [stok, id],
                 function(tx, result) {
                     resolve(alert("Satın alma başarılı" + result));
                 },
                 function(tx, error) {
                     reject(error);
                 })
         })
     })
 }

 function silcart(urun_id) {
     return new Promise(function(resolve, reject) {
         db.transaction(function(tx) {
             tx.executeSql("DELETE FROM cart WHERE urun_id=?", [urun_id], function(tx, results) {
                     resolve(alert("silme işlemi başarılı" + results))
                 },
                 function(tx, error) {
                     reject("Silme başarısız :" + error.massage);
                 })
         })
     })
 }

 function temizlik() {
     return new Promise(function(resolve, reject) {
         db.transaction(function(tx) {
             tx.executeSql("DROP TABLE cart");
         }, function(tx, results) {
             resolve(results)
         }, function(tx, error) {
             reject("Silme işlemi başarısız" + error.message);
         });
     })
 }

 function temizleCart(data2) {
     return new Promise(function(resolve, reject) {
         db.transaction(function(tx) {
             tx.executeSql("DELETE FROM cart WHERE user_id=?", [data2], function(tx, results) {
                     resolve(alert("Çıkış başarılı"));
                 },
                 function(tx, error) {
                     reject(alert("Çıkış başarısız:" + error.message));
                 })
         })
     })
 }

 function güncelleAdet(deger, e) {
     new Promise(function(resolve, reject) {
         db.transaction(function(tx) {
             tx.executeSql("UPDATE cart SET adet=? WHERE urun_id=?", [deger, e], function(tx, result) {
                 resolve(result);
             }, function(error) {
                 reject(error.message);
             })
         })
     })
 }

 function adetGetir() {
     new Promise(function(resolve, reject) {
         db.transaction(function(tx) {
             tx.executeSql("SELECT adet FROM cart WHERE id=?", [e], function(tx, result) {
                 resolve(result);
             }, function(tx, error) {
                 reject(error.massage);
             });
         });
     });
 }
var db = openDatabase('mydb', '1.0', 'login', 2048);
db.transaction(function(a) {
    a.executeSql('CREATE TABLE IF NOT EXISTS account (id INTEGER PRIMARY KEY,mailusr VARCHAR(50),username VARCHAR(50),password VARCHAR(50),rolerow BYTE ) ');
});

function kayıt(id, pass, mail) {
    return new Promise(function(resolve, reject) {
        db.transaction(
            function(tx) {
                tx.executeSql('INSERT INTO account (mailusr ,username, password,rolerow) VALUES ( ?, ?, ?,0)', [mail, id, pass]),
                    function(tx, results) {
                        resolve(alert("Kayıt başarılı"));
                    },
                    function(tx, error) {
                        reject(alert("Kayıt başarısız" + error.message));
                    }
            }

        );
    })
}



function login(user, pass) {
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM account WHERE username=?', [user], function(tx, id) {
            for (i = 0; i <= id.rows.length; i++) {
                localStorage.setItem("id", id.rows[i].id);
                localStorage.setItem("user", id.rows[i].username);
                aa = [id.rows[i].id];
                if (id.rows[i].password === pass && id.rows[i].username === user && id.rows[0].rolerow === 1) {
                    window.open("adminpanel.html", "_self");
                }
                if (id.rows[i].password === pass && id.rows[i].username === user && id.rows[0].rolerow === 0) {
                    window.open("anasayfa.html", "_self");
                }
            }
        });
    });
};

function control(id, pass, mail) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT COUNT(mailusr) FROM account WHERE mailusr=?", [mail], function(tx, results) {
                resolve(results.rows.item.length)
            }, function(tx, error) {
                reject(error.message);
            })
        })
    })
}

// function controlUsername(id, pass, mail) {
//     return new Promise(function(resolve, reject) {
//         db.transaction(function(tx) {
//             tx.executeSql("select count(mailusr) from account where username=?", [id], function(tx, results) {
//                 if (results == 1) {
//                     resolve(alert("Mail adresi kullanımda."))
//                 } else {
//                     asd(id, pass, mail);
//                 }
//             }, function(tx, error) {
//                 reject(alert("Kayıt başarılı"));
//             })
//         })
//     })
// }
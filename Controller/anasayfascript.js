document.getElementById("kullanıcı").innerText = "Kullanıcı adı: " + localStorage.getItem("user")
window.onload = function listele(e) {
    listeleprod().then(function(res) {
        a(res)
    }).catch(function(error) {
        a(err);
    })
}

function sepet(e) {
    window.open("sepet.html", "_self")
}

function a(results, e) {
    var tbl = document.getElementById("mytbl");
    var tablelen = tbl.rows.length;
    var len = results.rows.length,
        i;
    for (i = 0; i < len; i++) {
        msg = "<tr<td id='ürünidsi" + results.rows[i].id + "' style='display:none'>" + results.rows[i].id + "</td><td id='ürün" + results.rows[i].id + "' style='display:none'><td id='fiyat" + results.rows[i].id + "'>" + results.rows[i].fiyat + "</td><td id='foto" + results.rows[i].id + "'><img width=55px; src=" + results.rows[i].foto + "></img></td><td id='ad" + results.rows[i].id + "'>" + results.rows[i].name + "</td><td id='a" + results.rows[i].id + "'><input type='button' class='addtoCart' id='ürün" + results.rows[i].id + "' onclick='satınal(" + results.rows[i].id + ")' value='Sepete ekle'></td></tr>";
        document.getElementById('mytbl').innerHTML += msg;
    }
}

function satınal(e) {
    var urun_id = document.getElementById("ürünidsi" + e).innerText;
    var data = localStorage.getItem("id");
    var user_id = data;
    sepette(urun_id, user_id);
}

function logOut() {
    var data2 = localStorage.getItem("id");
    temizleCart(data2);
    window.open("login-dark.html", "_self");
    var çıkış = localStorage.clear("id");
}
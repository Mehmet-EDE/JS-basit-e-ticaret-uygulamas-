var topDeger = 0;
window.onload = function listele() {
    listelecart().then(function(res) {
        cart(res);
        var len = res.rows.length;
        for (i = 0; i < len; i++) {
            topDeger = parseInt(document.getElementById("producttop" + res.rows[i].id).innerText) + topDeger
        }
        document.getElementById("snc2").innerHTML = "Tutar: " + topDeger
    }).catch(function(error) {
        cart(error);
    })
}
var degerDb;

function cart(results, e) {
    var len = results.rows.length,
        i;
    for (i = 0; i < len; i++) {
        msg = "<tr id='ürün" + results.rows[i].id + "'><td id='ürünidsi" + results.rows[i].id + "' style='display:none'>" + results.rows[i].id + "</td><td class='adet' id='adet" + results.rows[i].id + "'><button class='btnedit' onclick='eksilt(" + results.rows[i].id + ")' id='eksilt" + results.rows[i].id + "'>-</button><input type='text' readonly class='txt ' id='txt" + results.rows[i].id + "'value='" + results.rows[i].adet + "'><button class='btnedit' onclick='artır(" + results.rows[i].id + ")' id='artır" + results.rows[i].id + "'>+</button></td><td id='ürünadet" + results.rows[i].id + "' style='display:none' >" + results.rows[i].adet + "</td><td id='fiyat" + results.rows[i].id + "'>" + results.rows[i].fiyat + "</td><td id='foto" + results.rows[i].id + "'><img width=75px; src=" + results.rows[i].foto + "></img></td><td id='ad" + results.rows[i].id + "'>" + results.rows[i].name + "</td><td id='a" + results.rows[i].id + "'><input type='button' class='btndelete' id='btn" + results.rows[i].id + "' onclick='silrow(" + results.rows[i].id + ")' value='Sil'></td><td id='producttop" + results.rows[i].id + "'>" + (results.rows[i].adet * results.rows[i].fiyat) + "</td></tr>";
        document.getElementById('mytbl2').innerHTML += msg;

    }
    degerDb = results;
}

function artır(e) {
    b = parseInt(document.getElementById("fiyat" + e).innerText);
    deger = parseInt(document.getElementById('txt' + e).value);
    stok = document.getElementById("ürünadet" + e).innerText;
    deger = isNaN(deger) ? 0 : deger;
    deger++;
    document.getElementById('txt' + e).value = deger;
    document.getElementById("producttop" + e).innerHTML = b * deger
    topDeger += b
    document.getElementById("snc2").innerHTML = "Tutar: " + topDeger
    tbl2 = document.getElementById("mytbl2");
    güncelleAdet(deger, e)
}

function eksilt(e) {
    stok = Number(document.getElementById("ürünadet" + e).innerText);
    b = parseInt(document.getElementById("fiyat" + e).innerText);
    deger = parseInt(document.getElementById("txt" + e).value);
    deger = isNaN(deger) ? 0 : deger;
    deger--;
    document.getElementById("txt" + e).value = deger;
    document.getElementById("producttop" + e).innerHTML = b * deger
    topDeger -= b
    document.getElementById("snc2").innerHTML = "Tutar: " + topDeger
    document.getElementById("ürünadet" + e).innerText = parseInt(stok + 1);
    if (document.getElementById("txt" + e).value <= 1) {
        document.getElementById("txt" + e).value = 1;
    }
    güncelleAdet(deger, e)
}


function silrow(e) {
    var urun_id = document.getElementById("ürünidsi" + e).innerText;
    silcart(urun_id)
    location.reload();
}

function allclear() {
    temizlik();
    alert("Sepet temizlendi.")
}

function satınal(e) {

    tbl2 = document.getElementById("mytbl2");
    var uzunluk = degerDb.rows.length;
    for (i = 0; i <= uzunluk; i++) {
        var id = document.getElementById("ürünidsi" + degerDb.rows[i].id).innerText;
        var stok = document.getElementById("ürünadet" + degerDb.rows[i].id).innerText;
        güncelleCart(stok, id);
        temizlik();
    }
    alert("Satın alma başarılı")
}

function güncelle(e) {
    güncelleAdet().then(function(res) {
        artır(res);
    }).catch(function(err) {
        artır(err);
    })
}

function adet(e) {
    adetGetir().then(function(res) {
        document.getElementById("txt" + e).value = res;
    }).catch(function(err) {
        alert(err.message);
    })
}
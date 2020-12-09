var b;

function update() {
    var adet = document.getElementById("adet").value,
        name = document.getElementById("name").value,
        fiyat = document.getElementById("fiyat").value,
        foto = document.getElementById("myImg").src;
    yükle(adet, fiyat, b, name);
}

function previewFile() {
    const preview = document.querySelector("#myImg");
    const file = document.querySelector("#foto").files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
        b = preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }

}
window.onload = function segi(e) {
    listele().then(function(res) {
        listeleadmin(res);
    }).catch(function(error) {
        listeleadmin(error);
    })
}

function listeleadmin(results, e) {
    var len = results.rows.length,
        i;
    for (i = 0; i < len; i++) {
        msg = "<tr id='ürün" + results.rows[i].id + "'><td style='display:none;' id='ürünler" + results.rows[i].id + "'>" + results.rows[i].id + "</td><td id='ürünadet" + results.rows[i].id + "'>" + results.rows[i].adet + "</td><td id='ürünfiyat" + results.rows[i].id + "'>" + results.rows[i].fiyat + "</td><td id='ürünfoto" + results.rows[i].id + "'><img width=55px; src=" + results.rows[i].foto + "></img></td><td id='ürünad" + results.rows[i].id + "'>" + results.rows[i].name + "</td><td id='a" + results.rows[i].id + "'><input type='button' id='editbtn" + results.rows[i].id + "' onclick='düzenle(" + results.rows[i].id + ")' value='Düzenle'><td id='a" + results.rows[i].id + "'><input type='button' id='deletebtn" + results.rows[i].id + "' onclick='deleteItem(" + results.rows[i].id + ")' value='Sil'></tr>";
        document.getElementById('mytbladmin').innerHTML += msg;
    }
}

function düzenle(e) {

    var adetval = document.getElementById("ürünadet" + e).innerText;
    var fiyatval = document.getElementById("ürünfiyat" + e).innerText;
    var adval = document.getElementById("ürünad" + e).innerText;
    var adtxt = document.getElementById("gncadtxt").value = adval;
    var fiyattxt = document.getElementById("gncfyttxt").value = fiyatval;
    var adettxt = document.getElementById("gncadttxt").value = adetval;
    var idsi = document.getElementById("ürünler" + e).innerText;
    document.getElementById("ürünid").innerText = idsi
    document.getElementById("güncelledv").style.display = "inline"

}

function dönüştür() {
    const preview = document.querySelector("#avatar");
    const file = document.querySelector("#gnclfoto").files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
        b = preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }

}

function kaydet(e) {
    var adetgnc = document.getElementById("gncadttxt").value;
    var fiyatgnc = document.getElementById("gncfyttxt").value;
    var adgnc = document.getElementById("gncadtxt").value;
    var fotognc = document.getElementById("avatar").src;
    var idsi = document.getElementById("ürünid").innerText;
    güncelle(adetgnc, fiyatgnc, adgnc, fotognc, idsi)
}

function kapatGüncelleme() {
    document.getElementById("güncelledv").style.display = "none"
}

function deleteItem(e) {
    if (document.getElementById("check" + e).checked) {
        var adres = document.getElementById("ürünler" + e).innerText;
        productSil(adres);
    }
}
function kaydet() {
    var mail = document.getElementById("mail").value;
    var id = document.getElementById("kullanıcıadı").value;
    var pass = document.getElementById("pass").value;
    document.getElementById("kayıt").style.display = "none";
    document.getElementById("login").style.display = "block";
    control(id, pass, mail).then(function(res) {
        controlMail(res)
    }).catch(function(err) {
        controlMail(err);
    })
}

function giriş() {
    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    login(user, password);
}

function kayıtEkranı() {
    document.getElementById("login").style.display = "none";
    document.getElementById("kayıt").style.display = "block";
}

function kapat() {
    document.getElementById("kayıt").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function controlMail(results) {
    if (results <= 0) {
        var mail = document.getElementById("mail").value;
        var id = document.getElementById("kullanıcıadı").value;
        var pass = document.getElementById("pass").value;
        kayıt(id, pass, mail);
    } else {
        alert("Mail kullanımda");
    }
}
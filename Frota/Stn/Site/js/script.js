function enterTeclado2(lcTxAtua, lcTxFocu) {
    $("#" + lcTxAtua).on("keyup", function (e) {
        var theEvent = e || window.event;
        var keyPressed = theEvent.keyCode || theEvent.which;
        if (keyPressed == 13) {
            document.getElementById(lcTxFocu).focus();
        }
        return true;
    });
}

function enterTeclado3(lcTxAtua, lcTxFocu, lcAhClic) {
    $("#" + lcTxAtua).on("keyup", function (e) {
        var theEvent = e || window.event;
        var keyPressed = theEvent.keyCode || theEvent.which;
        if (keyPressed == 13) {
            document.getElementById(lcTxFocu).focus();

            if (typeof document.getElementById(lcAhClic).onclick == "function") {
                document.getElementById(lcAhClic).onclick.apply(document.getElementById(lcAhClic));
            }
        }
        return true;
    });
}


function validaCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) {
        return false;
    }

    // LINHA 10 - Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999") {
        return false;
    } // LINHA 21

    // Valida DVs LINHA 23 -
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
        return false;
    } // LINHA 49

    return true; // LINHA 51
}

function validaCpf(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;

    strCPF = strCPF.replace(/[^\d]+/g, '');

    if (strCPF == "") {
        return false;
    }

    if (strCPF == "00000000000") {
        return false;
    }

    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))
        Resto = 0;

    if (Resto != parseInt(strCPF.substring(9, 10))) {
        return false;
    }

    Soma = 0;

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))
        Resto = 0;

    if (Resto != parseInt(strCPF.substring(10, 11))) {
        return false;
    }

    return true;
}

function jsonDate(lcJsDate) {
    if (lcJsDate == null) { return ""; }

    var ldFuDate = new Date(parseInt(lcJsDate.substr(6)));
    ldFuDate.setHours(0,0,0,0);
    var lcSqDate = ldFuDate.toISOString().slice(0, 10).replace(/-/g, "");
    var lcBrDate = lcSqDate.substr(6) + "/" + lcSqDate.substr(4, 2) + "/" + lcSqDate.substr(0, 4);

    return lcBrDate;
}

function formataCNPJ(lcClCnpj) {
    if (lcClCnpj.trim() == "") {
        return "";
    }
    else {
        return lcClCnpj.substring(0, 2) + "." + lcClCnpj.substring(2, 5) + "." + lcClCnpj.substring(5, 8) + "/" + lcClCnpj.substring(8, 12) + "-" + lcClCnpj.substring(12);
    }
}

function formataCPF(lcClNcpf) {
    if (lcClNcpf.trim() == "") {
        return "";
    }
    else {
        return lcClNcpf.substring(0, 3) + "." + lcClNcpf.substring(3, 6) + "." + lcClNcpf.substring(6, 9) + "-" + lcClNcpf.substring(9);
    }
}

function objetoDataParaStringData(ldWkData) {
    var lnWkDias = ldWkData.getDate(), lnWkMese = ldWkData.getMonth() + 1;
    var lcWkDias = "", lcWkMese = "", lcWkAnos = ldWkData.getFullYear().toString().trim();

    if (lnWkDias < 10) { lcWkDias = "0" + lnWkDias.toString().trim(); }
    else { lcWkDias = lnWkDias.toString().trim(); }

    if (lnWkMese < 10) { lcWkMese = "0" + lnWkMese.toString().trim(); }
    else { lcWkMese = lnWkMese.toString().trim(); }

    return lcWkDias + "/" + lcWkMese + "/" + lcWkAnos;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function pegaHora(d) {
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());

    return h + ":" + m + ":" + s;
}

function brMoney(v) {
    if (isNaN(v)) { v = 0; }

    v = (Math.round((v - 0) * 100)) / 100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v + "0" : v);
    v = String(v);

    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? ',' + ps[1] : ',00';
    var r = /(\d+)(\d{3})/;

    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + '.' + '$2');
    }

    v = whole + sub;

    if (v.charAt(0) == '-') {
        return '-R$' + v.substr(1);
    }

    return "R$ " + v;
}

function brDecimal(v) {
    v = (Math.round((v - 0) * 100)) / 100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v + "0" : v);
    v = String(v);

    var ps = v.split('.');
    var whole = ps[0];
    var sub = ps[1] ? ',' + ps[1] : ',00';
    var r = /(\d+)(\d{3})/;

    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + '.' + '$2');
    }

    v = whole + sub;

    if (v.charAt(0) == '-') {
        return '-' + v.substr(1);
    }

    return v;
}

function htmlDataParaObjetoData(lcWkData) {
    var lmWkData = lcWkData.split("-");
    return new Date(lmWkData[0], lmWkData[1] - 1, lmWkData[2]);
}
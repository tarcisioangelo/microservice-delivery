
function formatBR (value, decimais) {
    decimais = decimais || 2
    var mi = value.length - parseInt(decimais)
    var sm = parseInt(mi / 3)
    var regx = "", repl = ""

    for (var i = 0; i < sm; i++) {
        regx = regx.concat('([0-9]{3})')
        repl = repl.concat('.$' + (i + 1))
    }

    regx = regx.concat('([0-9]{' + decimais + '})') + "$";
    repl = repl.concat(',$' + (sm + 1))
    value = value.toString().replace(new RegExp(regx, 'g'), repl)
    return (mi % 3) === 0 ? value.substr(1) : value
}

function floatToRealLocale(num) {
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function floatToReal(num) {
    let x = 0;

    if (num < 0) {
        num = Math.abs(num)
        x = 1;
    }

    if (isNaN(num))
        num = "0"

    let cents = Math.floor((num * 100 + 0.5) % 100)

    num = Math.floor((num * 100 + 0.5) / 100).toString()

    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.'
            + num.substring(num.length - (4 * i + 3))

    let ret = num + ',' + cents

    if (x == 1)
        ret = ' - ' + ret

    return ret;
}

function realToFloat (num) {

    if(!num) return 0
    
    //retirar todos os pontos
    num = num.replace(/[\.]/g, "")

    //mudar a virgula pelo ponto
    num = num.replace(",", ".")

    //retornar em formato float
    return parseFloat(num).toFixed(2)
}

module.exports = { formatBR, floatToRealLocale, floatToReal, realToFloat }
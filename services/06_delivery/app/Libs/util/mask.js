function removeMask (value, type = 'CPF') {
    if(type === 'CNPJ'){
        value = value.replace(".", "")
        value = value.replace(".", "")
        value = value.replace("-", "")
        value = value.replace("/", "")
    }

    else if(type === 'CPF'){
        value = value.replace(".", "")
        value = value.replace(".", "")
        value = value.replace(".", "")
        value = value.replace("-", "")
    }
    return value;
}

module.exports = { removeMask }

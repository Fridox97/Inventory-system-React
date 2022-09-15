
const Regexnumbers = /\D/g

function phoneNumberFormat(phone) {
    phone = phone.replace(Regexnumbers, '')
    phone = '(' + phone.slice(0,3) + ')-' + phone.slice(3,6) + '-' + phone.slice(6)
    return phone
}

function phoneNumberUnformat(phone) {
    phone = phone.replace(Regexnumbers, '')
    return phone
}

function cedulaFormat(id) {
    id = id.replace(Regexnumbers, '')
    id = id.slice(0,3) + '-' + id.slice(3,10) + '-' + id.slice(10)
    return id
}

function justletters(input){
    if(isNaN(input) || input === ' '){
        return true
    }
    return false
}

function justNumbers(input){
    if(input === undefined){
        return true
    }
    if(isNaN(input)){
        return false
    }
    return true
}

export {phoneNumberFormat, cedulaFormat, justletters, justNumbers, phoneNumberUnformat}
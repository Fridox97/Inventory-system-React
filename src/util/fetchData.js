import axios from "axios"

const users = async () =>{
    return axios.get('https://superkiwi-inventory.herokuapp.com/users')
    .then(res => {
        return res.data})
    .catch(err => console.error(err))

}

const equipos = async () =>{
    return axios.get('https://superkiwi-inventory.herokuapp.com/items')
    .then(res => {
        return res.data})
    .catch(err => console.error(err))

}

const login = async (user, pass) => {
    const body = {
        name: user,
        pass: pass
    }
    return axios.post('https://superkiwi-inventory.herokuapp.com/login',body
    ).then(res => res.data)
    .catch(err => console.error(err))
}

const prestamos = async () =>{
    return axios.get('https://superkiwi-inventory.herokuapp.com/lends')
    .then(res => {
        return res.data})
    .catch(err => console.error(err))

}

const buscar = async (ID,By) =>{
    return axios.get(`https://superkiwi-inventory.herokuapp.com/lends/${By}/${ID}`)
    .then(res => {
        return res.data})
    .catch(err => console.error(err))

}

const realizarPrestamo = async (adminID, userID, itemID, reason, estimatedtime) => {
    const body = {
        adminID: adminID, 
        userID: userID, 
        itemID: itemID, 
        reason: reason, 
        estimatedtime: estimatedtime
    }

    return axios.post('https://superkiwi-inventory.herokuapp.com/lends',body
    ).then(res => {
        return res.data})
    .catch(err => console.error(err))
}

const completar = async (ID) => {
    return axios.get(`https://superkiwi-inventory.herokuapp.com/lends/conclude/${ID}`
    ).then(res => {
        if (res.data){
            return true
        }
        return false
    }).catch(err => console.error(err))
}

const registrar = async (endpoint, body) => {

    return axios.post(`https://superkiwi-inventory.herokuapp.com/${endpoint}`,body
    ).then(res => {
        if(res !== []){
            return true
        }
        return false
    }).catch(err => console.error(err))
}

const borrar = async (endpoint, body) => {

    return axios.post(`https://superkiwi-inventory.herokuapp.com/${endpoint}/delete`,body
    ).then(res => {
        if(res !== []){
            return true
        }
        return false
    }).catch(err => console.error(err))
}

 const modificar = async (endpoint, body) => {

    return axios.put(`https://superkiwi-inventory.herokuapp.com/${endpoint}`,body
    ).then(res => {
        if(res !== []){
            return true
        }
        return false
    }).catch(err => console.error(err))
 }

 const buscarQr = async (ID) =>{
    return axios.get(`https://superkiwi-inventory.herokuapp.com/items/byID/${ID}`)
    .then(res => {
        return res.data})
    .catch(err => console.error(err))

}

export {users, equipos, login, prestamos, buscar, realizarPrestamo, completar, registrar, borrar, modificar, buscarQr}
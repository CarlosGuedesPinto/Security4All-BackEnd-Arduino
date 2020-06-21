import {get, put,remove} from  '../Utils/https'

export function getAllUsers() {
    return get("/user")
}

export function editUser(body) {
    return put("/user", body)
}

// export function getUserTypes() {
//     return get("/user")
// }

export function removeUser(body) {
    return remove("/user/delete/" + body)
}

export function validateUser(body) {
    return put("/user/verify/" + body)
}

export function AdminUser(id, body) {
    return put("/user/editUserType/" + id,body)
}

export function blockUser(id, body) {
    return put("/user/deleteLogic/" + id,body)
}
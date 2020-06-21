import {get,put} from  '../Utils/https' //, post, put, remove

export function getAllPackages() {
    return get("/packages")
}

export function editPack(body,id) {
    return put("/packages/"+ id, body)
}

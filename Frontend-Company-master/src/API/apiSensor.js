import {get, post, put, remove} from  '../Utils/https'

export function getAllSensors() {
    return get("/sensors")
}

export function editSensor(body,id) {
    return put("/sensors/"+ id, body)
}

export function addSensor(body) {
    return post("/sensors", body)
}

export function removeSensor(body) {
    return remove("/sensors/" + body)
}
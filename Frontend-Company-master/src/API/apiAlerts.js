import {get,post} from  '../Utils/https'

export function getAlerts() {
    return get("/alerts")
}

export function createAlert(body) {
    return post("/alerts", body)
}

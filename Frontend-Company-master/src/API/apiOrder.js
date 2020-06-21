import {get,put,remove} from  '../Utils/https' //, post, put, remove

export function getAllOrders() {
    return get("/order/sensors")
}
export function editOrderActive(id,body) {
    return put("/order/active/"+ id, body)
}
export function removeOrder(body) {
    return remove("/order/" + body)
}
export function editInstalationActive(id,body) {
    return put("/order/instalation/"+ id, body)
}
export function editPaymentActive(id,body) {
    return put("/order/payment/"+ id, body)
}
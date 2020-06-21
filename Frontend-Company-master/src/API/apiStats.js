import {get} from  '../Utils/https'

export function getStat1() {
    return get("/statistics/numUsers")
}
export function getStat2() {
    return get("/statistics/numSensorsSold")
}
export function getStat3() {
    return get("/statistics/installation")
}
export function getStat4() {
    return get("/statistics/ordersToPay")
}
export function getStat5() {
    return get("/statistics/numHouses")
}
export function getStat6() {
    return get("/statistics/avgSensor")
}
export function getStat7() {
    return get("/statistics/usersToValidate")
}
export function getStat8() {
    return get("/statistics/numAchievements")
}
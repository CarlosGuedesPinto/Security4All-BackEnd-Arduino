import {get,post, put, remove} from  '../Utils/https'

export function getAllAchievements() {
    return get("/achievement/all")
}

export function addAchievement(body) {
    return post("/achievement/",body)
}

export function editAchievement(body,id) {
    return put("/achievement/"+ id, body)
}

export function removeAchievement(body) {
    return remove("/achievement/" + body)
}
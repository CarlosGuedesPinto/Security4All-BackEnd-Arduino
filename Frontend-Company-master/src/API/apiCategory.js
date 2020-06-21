import {get} from  '../Utils/https'

export function getAllCategorys() {
    return get("/category/all")
}
import {post} from  '../Utils/https'

export function authUser(body) {
    return post("/auth/login", body)
}

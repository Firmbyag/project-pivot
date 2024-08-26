import { jwtDecode } from "jwt-decode"

export const decodeToken = () => {
    const storedToken = localStorage.getItem("bolsalivre_token")
    const token = storedToken ? jwtDecode(storedToken) : undefined   
    return token
}

export const getToken = () => {
    const storedToken = localStorage.getItem("bolsalivre_token")
    return storedToken
}
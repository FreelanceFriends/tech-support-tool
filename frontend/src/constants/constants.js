
export const BASE_URL = process.env.NODE_ENV === "production" ? "/api/v1" : `http://localhost:8080/api/v1`

export const LOGIN = "/user/login/"
export const GET_USER = "/user/"
export const REGISTER_USER = "/user/"
export const UPDATE_USER = "/user/"
export const DELETE_USER = "/user/"

export const TICKET = "/ticket/"
export const GET_ALL_TICKET = "/ticket/"
export const GET_OPEN_TICKETS = "/ticket/?status=OPEN"
export const GET_CLOSED_TICKETS = "/ticket/?status=CLOSED"



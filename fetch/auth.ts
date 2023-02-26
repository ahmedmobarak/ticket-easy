import axios from "axios"
import { Local } from "../enviroment"
import { ApiRoutes } from "../helpers/apiRoutes"
import { IUser } from "../models/user"

export const AuthApi = {
    login: (email: string, password: string) => {
        return axios.post(Local.baseUrl + ApiRoutes.auth.login, {email, password});
    },

    signup: (user: IUser) => {
        return axios.post(Local.baseUrl + ApiRoutes.auth.signup, {user});
    },

    updateUserInfo: (user: IUser) => {
        return axios.patch(Local.baseUrl + ApiRoutes.auth.update + user.id, {user});
    }

}
import axios from "axios"
import { Local } from "../enviroment"
import { ApiRoutes } from "../helpers/apiRoutes"

export const WalletApi = {
    getCurrentBalance: (userId: string) => {
        return axios.get(Local.baseUrl+ApiRoutes.wallet.getBalance+userId);
    }
}
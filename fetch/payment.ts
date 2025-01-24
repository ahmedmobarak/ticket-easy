import axios from "axios"
import { Local } from "../enviroment"
import { ApiRoutes } from "../helpers/apiRoutes"
import LangInterceptor from "./lang.interceptor";

export const EventsApi = {
    getPaymentSheet: (cat: string, lang) => {
        return axios.post(Local.baseUrl + ApiRoutes.payment.paymentSheet);
    }
}
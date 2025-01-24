import axios from "axios"
import { Local } from "../enviroment"
import { ApiRoutes } from "../helpers/apiRoutes"
import LangInterceptor from "./lang.interceptor";

export const EventsApi = {
    getEvents: (cat: string, lang) => {
        return axios.get(Local.baseUrl + ApiRoutes.events.main + cat, {headers: {'lang': lang}});
    },

    listMapEvents:() => {
        return axios.get(Local.baseUrl + ApiRoutes.events.mapEvents);
    }
}
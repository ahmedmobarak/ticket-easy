import axios from "axios"
import { Local } from "../enviroment"
import { ApiRoutes } from "../helpers/apiRoutes"
import LangInterceptor from "./lang.interceptor";

export const EventsApi = {
    getEvents: (cat: string) => {
        return LangInterceptor.get(Local.baseUrl + ApiRoutes.events.main + cat);
    }
}
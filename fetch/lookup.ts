import axios from "axios"
import { Local } from "../enviroment"
import { ApiRoutes } from "../helpers/apiRoutes"

export const LookupAPI = {
    getEventTypes:() => {
        return axios.get(Local.baseUrl + ApiRoutes.lookup.eventTypes);
    }
}
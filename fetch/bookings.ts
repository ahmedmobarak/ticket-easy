import axios from "axios"
import { Local } from "../enviroment"
import { ApiRoutes } from "../helpers/apiRoutes"
import LangInterceptor from "./lang.interceptor"


export const bookingsApi = {
    getUserBookings: (userId: string) => {
        return LangInterceptor.get(Local.baseUrl + ApiRoutes.bookings.main + userId)
    },

    bookByWallet: ({event, walletBookingData, userId}) => {
        return axios.post(Local.baseUrl + ApiRoutes.bookings.wallet, {
            seats: walletBookingData.seats,
            eventId: event._id,
            userId: userId,
            seatsRemainder: event.seats -= walletBookingData.seats,
            type: walletBookingData.type,
            payment: walletBookingData.payment,
            paidAmount: walletBookingData.type == 'normal' ? walletBookingData.seats * event.normal : walletBookingData.seats * event.vip
        })
    },

    bookByCard: ({event, cardBooingData, userId}) => {
        return axios.post(Local.baseUrl + ApiRoutes.bookings.card, {
            card: cardBooingData.cardNo,
            seats: cardBooingData.seats,
            pin: cardBooingData.pin,
            eventId: event._id,
            userId: userId,
            seatsRemainder: event.seats -= cardBooingData.seats,
            type: cardBooingData.type,
            payment: cardBooingData.payment,
            paidAmount: cardBooingData.type == 'normal' ? cardBooingData.seats * event.normal : cardBooingData.seats * event.vip
        })
    }

}
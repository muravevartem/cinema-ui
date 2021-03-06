import {SeatType} from "./HallTypes";
import {ScreeningType} from "./ScreeningTypes";
import {IUser} from "../../models/response/IUser";

export type TicketType = {
    id: number,
    seat: SeatType,
    price: number,
    filmScreening: ScreeningType,
    active: boolean
}

export type PurchaseType = {
    id: number,
    user: IUser
}

export type ReservationType = {
    id: number,
    seat: SeatType,
    expiryDate: string,
    filmScreening: ScreeningType
}
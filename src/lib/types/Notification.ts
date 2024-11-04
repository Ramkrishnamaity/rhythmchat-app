import { UserType } from "./Profile"



export type NotificationType = {
    _id: string,
    sender: UserType,
    isAccepted: boolean
    createdOn: string
}
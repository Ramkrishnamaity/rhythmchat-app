import { UserType } from "./Profile";

type messageType = {
    user: {
        _id: string
        firstName: string
        lastName: string
        image: string
    }
    type: string
    message: string
    createdOn: string
    updatedOn: string
    isDeleted: boolean
}

export type ConversationsType = {
    _id: string
    isGroup: boolean
    name?: string
    image?: string
    description?: string
    messageData: messageType
    user?: UserType
    createdOn: string
    updatedOn: string
}

export type ConversationType = {
    _id: string
    type: string
    message: string
    user: UserType
    createdOn: Date
    updatedOn: Date
    isDeleted: boolean
}[]

export type ConversationProfileType = {
    _id: string
    isGroup: boolean
    name: string
    image: string
}
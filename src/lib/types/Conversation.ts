import { UserType } from "./Profile";

export type messageType = {
    conversationId: string
    user: UserType
    type: string
    message: string
    createdOn: Date
    updatedOn: Date
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
    conversationId: string
    user: UserType
    createdOn: Date
    updatedOn: Date
    isDeleted: boolean
}[]
export type MessageConversationType = {
    _id: string
    type: string
    message: string
    conversationId: string
    user: UserType
    createdOn: Date
    updatedOn: Date
    isDeleted: boolean
}

export type ConversationProfileType = {
    _id: string
    isGroup: boolean
    name: string
    image: string
}
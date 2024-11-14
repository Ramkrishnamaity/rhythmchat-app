
export type UserType = {
    _id: string
    firstName: string,
    lastName: string,
    image: string
}

export type ProfileFormData = {
    firstName: string
    lastName: string
    about: string,
    image: string
}

export type ProfileResponceType = {
    _id: string
    about: string
    firstName: string
    lastName: string
    deviceToken: string
    email: string
    image: string
    updatedOn: Date
}

export type MembersResponseType = {
    _id: string
    firstName: string
    lastName: string
    image: string
    about: string
    isFriend: boolean
    isInvited: boolean
}

export type FriendsResponseType = {
    _id: string
    firstName: string
    lastName: string
    image: string
}
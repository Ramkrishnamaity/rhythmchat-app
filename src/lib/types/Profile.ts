
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

export type AnotherProfileResponceType = {
    _id: string;
    firstName: string;
    lastName: string;
    about: string;
    image: string;
    email: string;
}

export type MembersType = {
    type: string,
    userId: string,
    firstName: string,
    lastName: string,
    image: string,
    isFriend: boolean,
    createdOn: Date
}

export type GroupProfileResponceType = {
    name: string,
    image: string,
    description: string,
    members: MembersType[],
    totalMembers: number
    createdOn: Date
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
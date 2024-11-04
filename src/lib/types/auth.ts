import { ProfileResponceType } from "./Profile"


export type LoginFormData = {
    email: string,
    password: string
}

export type SignUpFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    otp: string
}


export type UserLoginResponse = {
    token: string,
    profile: ProfileResponceType
}

export type ChangeTokenResponse = {
    token: string
}
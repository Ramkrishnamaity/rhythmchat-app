import { ReactNode } from "react";

export type CommonResponseType<T = any> = {
    status: boolean
    message: string
    data?: T
    error?: any
    totalPage?: number
}

export type CommonPropsType = {
    children: ReactNode
}
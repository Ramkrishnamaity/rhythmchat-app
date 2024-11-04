import { CommonResponseType } from "../types/index";
import Axios from "./Axios";


const getRequest = async (url: string, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.get(url, config)
        return response.data
    } catch (error: any) {
        return error.data
    }
}

const postRequest = async (url: string, data: object = {}, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.post(url, data, config)
        return response.data
    } catch (error: any) {
        return error.data
    }
}

const putRequest = async (url: string, data: object = {}, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.put(url, data, config)
        return response.data
    } catch (error: any) {
        return error.data
    }
}

const deleteRequest = async (url: string, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.delete(url, config)
        return response.data
    } catch (error: any) {
        return error.data
    }
}

export { getRequest, postRequest, putRequest, deleteRequest };
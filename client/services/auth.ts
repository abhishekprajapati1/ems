import api from "./api"
import { AxiosResponse } from "axios";

type UserPayload = {
    name: string,
    date_of_birth: string,
    email: string,
    role: string,
    password: string,
}

interface UserAuthResponse extends AxiosResponse {
    success: boolean,
    message: string,
    error?: any,
    token?: any,
}

export const createUser = async (payload: UserPayload) => {
    try {
        const res = await api.post<UserAuthResponse>('user', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const login = async (payload: { email: string, password: string }) => {
    try {
        const res = await api.post<UserAuthResponse>('login', payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const res = await api.get('logout');
        return res.data;
    } catch (error) {
        throw error;
    }
}
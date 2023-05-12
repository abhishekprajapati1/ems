import api from "./api"


export const getMe = async () => {
    try {
        const res = await api.get('user');
        return res.data
    } catch (error) {
        throw error;
    }
}

export const getPunch = async () => {
    try {
        const res = await api.get('punch');
        return res.data;
    } catch (error) {
        throw error;
    }
}
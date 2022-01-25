import client from "../../../api/client";

export const authLogin = async (user) => {
    const {data} = await client.post("/auth", user);
    return data;
}

export const authRegister = async (user) => {
    const {data} = await client.post("/member/registration", user);
    return data;
}

export const getCurrentUser = () => {
    const user = sessionStorage.getItem('user');

    if (user && Object.values(user)) {
        return JSON.parse(user);
    } else {
        throw Error('user tidak ditemukan');
    }
}

export const updateUserProfile = async (userData) => {
    const {data} = await client.put("/member/profile", userData)
    return data;
}
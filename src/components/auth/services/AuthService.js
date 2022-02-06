import client from "../../../api/client";

export const authLogin = async (user) => {
    const {data} = await client.post("/auth", user);
    return data;
}

export const authRegister = async (user) => {
    const {data} = await client.post("/member/registration", user);
    return data;
}

export const updateUserProfile = async (userData) => {
    const {data} = await client.put("/member/profile", userData)
    return data;
}

export const getProfile = async (id) => {
    const {data} = await client.get(`/member/profile?id=${id}`)
    return data;
}

export const userActivation = async (id) => {
    const {data} = await client.get(`/member/activation?id=${id}`)
    return data;
}

export const uploadAvatar = async (id, image) => {
    let formData = new FormData();
    formData.append('profile', image)

    const {data} = await client.post(`/member/profile?id=${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return data;
}

export const getListInterest = async () => {
    const {data} = await client.get("/interest")
    return data;
}

export const createPreference = async (dataUser) => {
    const {data} = await client.post("/member/preference", dataUser)
    return data;
}

export const setUserToLocalStorage = (data) => {
    const user = getUserFromLocalStorage();

    if (user === null) {
        localStorage.setItem("user", (JSON.stringify({memberId: data})))
    }
}

export const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && Object.values(user)) {
        return user;
    } else {
        return null;
    }
}
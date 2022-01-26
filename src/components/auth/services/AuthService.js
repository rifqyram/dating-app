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

export const getProfileAfterUpdate = async (id) => {
    const {data} = await client.get(`/member/profile?id=${id}`)
    return data;
}

export const getListInterest = () => {
    return [
        {
            interest_id: 'a8127c2f-f878-40ab-8903-917954ab814z',
            interest: 'Coffee',
        },
        {
            interest_id: 'b9127c2f-f878-40ab-8903-917954ab814x',
            interest: 'Live Music',
        },
        {
            interest_id: 'c1027c2f-f878-40ab-8903-917954ab814y',
            interest: 'Dog',
        },
        {
            interest_id: 'd1127c2f-f878-40ab-8903-917954ab814z',
            interest: 'Gym',
        },
        {
            interest_id: 'e1227c2f-f878-40ab-8903-917954ab814w',
            interest: 'Beer',
        }
    ];
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

export const authLogout = () => {
    localStorage.removeItem("user");
}
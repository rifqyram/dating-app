import client from "../../../api/client";

export const findPartner = async (id, size, page) => {
    const {data} = await client.get(`/partner/view?id=${id}&pageSize=${size}&pageNo=${page}`);
    return data;
}

export const matchPartner = async (req) => {
    const {data} = await client.post("/partner/match", req);
    return data;
}

export const listChoosenPartner = async (id) => {
    const {data} = await client.get(`/partner/list?id=${id}`);
    return data;
}
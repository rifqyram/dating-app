import client from "../../../api/client";

export const findPartner = async (id, page) => {
    const {data} = await client.get(`/partner/view?id=${id}&pageSize=${page}&pageNo=1`);
    return data;
}

export const matchPartner = async (memberId, partnerId) => {
    const {data} = await client.post("/partner/match", {
        memberId: memberId,
        partnerId: partnerId
    });
    return data;
}

export const listChoosenPartner = async (id) => {
    const {data} = await client.get(`/partner/list?id=${id}`);
    return data;
}
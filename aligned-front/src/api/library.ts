import axios from 'axios';
import {getConfig} from "../config/config";

let ApiBase: string | null = null;

const getApiBase = (): string => {
    if (ApiBase !== null)
        return ApiBase;

    const config = getConfig();
    ApiBase = config.API_URL + '/item';
    return ApiBase;
};

export const getItems = async () => {
    const res = await axios.get(getApiBase());
    return res.data.map((item: any) => ({
        id: item._id || item.id,
        name: item.name,
        url: item.url,
        type: item.type,
        owner: item.owner,
    }));
};

export const getItem = async (id: string) => {
    const res = await axios.get(getApiBase() + `/${id}`);
    return {
        id: res.data._id || res.data.id,
        name: res.data.name,
        url: res.data.url,
        type: res.data.type,
        owner: res.data.owner,
    };
};

export const addItem = async (item: { name: string; url: string; type: string }) => {
    const res = await axios.post(getApiBase(), item);
    return {
        id: res.data._id || res.data.id,
        name: res.data.name,
        url: res.data.url,
        type: res.data.type,
        owner: res.data.owner,
    };
};

export const updateItem = async (id: string, item: { name: string; url: string; type: string }) => {
    const res = await axios.put(`${getApiBase()}/${id}`, item);
    return {
        id: res.data._id || res.data.id,
        name: res.data.name,
        url: res.data.url,
        type: res.data.type,
        owner: res.data.owner,
    };
};

export const deleteItem = async (id: string): Promise<void> => {
    await axios.delete(getApiBase() + `/${id}`);
};

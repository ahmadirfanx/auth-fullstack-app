import { retrieveJWT } from "./LocalStorageService";

const axios = require('axios');

const generateHeaders = (blobResponse: Boolean = false) => {
    const JWT = retrieveJWT();
    const headerData: any = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${JWT}`
        }
    }

    if (blobResponse) headerData.headers.responseType = 'blob'
    return headerData;
}

export async function post(_module: string, _data: any, blobResponse: Boolean = false) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.post(url + _module, _data, generateHeaders(blobResponse));
    return response.data;
}


export async function getById(_module: string, _id: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.get(url + _module + '/' + _id, generateHeaders());
    return response.data;
}

export async function get(_module: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.get(url + _module, generateHeaders());
    return response.data;
}


export async function deleteById(_module: string, _id: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.delete(url + _module + '/soft/' + _id, generateHeaders());
    return response.data;
}
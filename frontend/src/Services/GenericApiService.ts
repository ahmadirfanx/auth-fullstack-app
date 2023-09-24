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

export async function getAll(_module: string, page = 0, size = 0) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    let response;
    // check if with or without pagination
    if (size !== 0) {
        response = await axios.get(url + _module + '?page=' + page + '&size=' + size, generateHeaders());
    } else {
        response = await axios.get(url + _module, generateHeaders());
    }
    return response.data;
}


export async function getById(_module: string, _id: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.get(url + _module + '/' + _id, generateHeaders());
    return response.data;
}

/** Makes a POST Request and receives blob file */
export async function postByFileId(_module: string, _id: any, formdata: any) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const headers: any = { ...generateHeaders(), 'responseType': 'blob' }
    const response = await axios.post(url + _module + '/' + _id, formdata, headers);
    return response.data;
}

export async function get(_module: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.get(url + _module, generateHeaders());
    return response.data;
}

/**
 * Makes multiple Get Calls to the endpoint given in the filesData array of objects 
 * and appends a base64 image to 'source' key in the filesData objects
 */
export async function getMultipleImages(filesData: []) {
    const url = process.env.REACT_APP_REST_ENDPOINT;

    // helper method to convert blob to base64
    const blobToBase64 = async (blob: any) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    }

    const imagePromises = Object.values(filesData).map(async (file: any) => {
        const response = await axios.get(url + file.url, { ...generateHeaders(), responseType: 'blob' });
        const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
        return { ...file, source: await blobToBase64(imageBlob) };
    });

    const images = await Promise.all(imagePromises);
    return images;
}

export async function patch(_module: string, _id: string, _data: any) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.patch(url + _module + '/' + _id, _data, generateHeaders());
    return response.data;
}

export async function bulkPatch(_module: string, _data: any) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.patch(url + _module + '/', _data, generateHeaders());
    return response.data;
}

export async function deleteById(_module: string, _id: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const response = await axios.delete(url + _module + '/soft/' + _id, generateHeaders());
    return response.data;
}

export async function getFileById(_module: string, _id: string) {
    const url = process.env.REACT_APP_REST_ENDPOINT;
    const headers: any = { ...generateHeaders(), 'responseType': 'blob' }
    const response = await axios.get(url + _module + '/' + _id, headers);
    return response.data;
}


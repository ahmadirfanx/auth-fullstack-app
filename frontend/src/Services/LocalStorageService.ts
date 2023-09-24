import jwt_decode from "jwt-decode";

const jwt_data_key: string = process.env.REACT_APP_JWT_DATA_KEY || 'foundation_app_user_data';

export function storeJWT(_token: string) {
    removeJWT();    // remove previous jwt (if any)
    localStorage.setItem(jwt_data_key, JSON.stringify({
        jwt: _token
    }));
}

// Retrieve token from local storage
export function retrieveJWT() {
    const jwt = localStorage.getItem(jwt_data_key);
    if (jwt) {
        return JSON.parse(jwt).jwt;
    } else {
        return null;
    }
}

export function removeJWT() {
    localStorage.removeItem(jwt_data_key);
}

export function decryptJWT(_jwt: string) {
    return jwt_decode(_jwt);
}

export function isJWTExpired(_jwt: string) {
    let decodedToken: any = decryptJWT(_jwt);
    let currentDate = new Date();
    // JWT exp is in seconds
    return decodedToken.exp * 1000 < currentDate.getTime();
}

export function getUserData() {
    const jwt = retrieveJWT();
    if (!jwt) {
        return null;
    } else {
        return decryptJWT(jwt);
    }
}

export function isLoggedIn() {
    const jwt = retrieveJWT();
    if (!jwt) {
        return false;
    } else {
        const validJwt = isJWTExpired(jwt);
        return !validJwt;
    }
}
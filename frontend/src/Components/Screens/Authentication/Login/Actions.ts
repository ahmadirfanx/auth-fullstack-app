import {LOGIN} from "./Types";

export const login = (_isAuthenticated:boolean, _jwt:string, _data:any) => {
    return {
        type: LOGIN,
        isAuthenticated: _isAuthenticated,
        jwt: _jwt,
        data: _data
    }
}

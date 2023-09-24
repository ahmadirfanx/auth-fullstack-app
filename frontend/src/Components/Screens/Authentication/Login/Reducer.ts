import {LOGIN} from "./Types";

const initialState = {
    user: {
        isAuthenticated: false,
        jwt: null,
        data: null
    }
}

const AuthenticationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN: return {
            ...state,
            user: {
                isAuthenticated: action.isAuthenticated,
                jwt: action.jwt,
                data: action.data
            }
        }
        default: return state
    }
}

export default AuthenticationReducer

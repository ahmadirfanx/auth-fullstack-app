import { SWITCH_LANGUAGE } from "./Types";
import { SWITCH_THEME } from "./Types";

const initialState = {
    global: {
        language: 'en',
        theme: 'light'
    }
}

const GlobalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        // For Switching language
        case SWITCH_LANGUAGE: return {
            ...state,
            global: {
                language: action.language
            }
        }
        // For Switching theme
        case SWITCH_THEME: return {
            ...state,
            global: {
                theme: action.theme
            }
        }

        default: return state
    }
}

export default GlobalReducer

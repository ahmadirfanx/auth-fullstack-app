import { combineReducers } from 'redux';
import AuthenticationReducer from "../Components/Screens/Authentication/Login/Reducer";
import GlobalReducer from "../Global/Reducer";

const RootReducer = combineReducers({
    authentication: AuthenticationReducer,
    global: GlobalReducer,
})

export default RootReducer

import { combineReducers } from 'redux';
import  { createUserReducer, 
        getUserReducer, 
        updateUserReducer, 
        findByUserIdReducer } from "./userReducer";

export default combineReducers({
    createUserReducer,
    getUserReducer,
    updateUserReducer,
    findByUserIdReducer,
});
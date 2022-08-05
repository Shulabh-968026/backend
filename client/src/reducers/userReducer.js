import {
    CREATE_USER,CREATE_USER_ERROR,
    GET_USERS,GET_USERS_ERROR,
    UPDATE_USER,UPDATE_USER_ERROR,
    FIND_USER_BY_ID,FIND_USER_BY_ID_ERROR
} from "../actions/userActions";

const initialCreateUserState = {
    user: {},
    error: null
};

export function createUserReducer (state = initialCreateUserState, action) {

    switch(action.type)
    {
        case CREATE_USER:
            return { ...state, user: action.user }
        
        case CREATE_USER_ERROR:
            return { ...state, error: action.error }
        
        default:
            return { ...state }
    }

}



const initialGetUserState = {
    users:{},
    error:null
};

export function getUserReducer(state = initialGetUserState, action) {

    switch(action.type)
    {
        case GET_USERS:
            return { ...state, users: action.users }
        
        case GET_USERS_ERROR:
            return { ...state, error: action.error }
        
        default:
            return { ...state }
    }

}



const initialUpdateUserState = {
    user: {},
    error: null
};

export function updateUserReducer(state = initialUpdateUserState, action) {

    switch(action.type)
    {
        case UPDATE_USER:
            return { ...state, user: action.user }
        
        case UPDATE_USER_ERROR:
            return { ...state, error: action.error }
        
        default:
            return { ...state }
    }

}


const initialFindByUserIdState = {
    user: {},
    error: null
};

export function findByUserIdReducer(state = initialFindByUserIdState, action) {

    switch(action.type)
    {
        case FIND_USER_BY_ID:
            return { ...state, user: action.user }
        
        case FIND_USER_BY_ID_ERROR:
            return { ...state, error: action.error }
        
        default:
            return { ...state }
    }

}
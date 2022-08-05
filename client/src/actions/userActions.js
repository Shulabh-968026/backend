
// add user action

export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";

export const createUserSuccessAction = (user)=>{
    return {
        type:CREATE_USER,
        user
    }
}

export const createUserErrorAction = (error)=>{
    return {
        type:CREATE_USER_ERROR,
        error
    }
}

// get all user action
export const GET_USERS = "GET_USERS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";

export const getUserSuccessAction = (users)=>{
    return {
        type:GET_USERS,
        users
    }
}

export const getUserErrorAction = (error)=>{
    return {
        type:GET_USERS_ERROR,
        error
    }
}

// update user action
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";

export const updateUserSuccessAction = (user)=>{
    return {
        type:UPDATE_USER,
        user
    }
}

export const updateUserErrorAction = (error)=>{
    return {
        type:UPDATE_USER_ERROR,
        error
    }
}

// fetch user by id action
export const FIND_USER_BY_ID = "FIND_USER_BY_ID";
export const FIND_USER_BY_ID_ERROR = "FIND_USER_BY_ID_ERROR";

export const findUserByIdSuccessAction = (user)=>{
    return {
        type:FIND_USER_BY_ID,
        user
    }
}

export const findUserByIdErrorAction = (error)=>{
    return {
        type:FIND_USER_BY_ID_ERROR,
        error
    }
}
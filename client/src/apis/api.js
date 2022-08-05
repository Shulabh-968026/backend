import axios from "axios";
import {
    createUserSuccessAction, createUserErrorAction,
    getUserSuccessAction, getUserErrorAction,
    updateUserSuccessAction, updateUserErrorAction,
    findUserByIdSuccessAction,findUserByIdErrorAction,
} from "../actions/userActions";
import { useDispatch } from "react-redux";

// url for 
export const url = '' //"http://localhost:5000/admin/v1/user"

//export const fetchUser = axios.get(url) 

export const GetAllUsersServices = () =>{
    //const dispatch = useDispatch()
        return (dispatch)=>{
            axios.get(url).then((res)=>{
            dispatch(getUserSuccessAction(res.data))
        }).catch((err)=>{
            dispatch(getUserErrorAction(err["message"]))
        })
    }
}

export const createUserServices =(data)=>{
    //const dispatch = useDispatch()
    return (dispatch,navigate)=>{
        axios.post(url+"/add",data).then((res)=>{
            dispatch(createUserSuccessAction(res.data))
            navigate("/")
        }).catch((err)=>{
            dispatch(createUserErrorAction(err))
        })
    }
}

export const UpdateUserServices = (id,data)=> {
    //const dispatch = useDispatch()
    return (dispatch,navigate)=>{
        axios.patch(url+"/update/"+id,data).then((res)=>{
            dispatch(updateUserSuccessAction(res.data))
            navigate("/")
        }).catch((err)=>{
            dispatch(updateUserErrorAction(err["message"]))
        })
    } 
}

export const findUserByIdServices =(id)=>{
    //const dispatch = useDispatch()
    return (dispatch)=>{
        axios.get(url+"/"+id).then((res)=>{
            dispatch(findUserByIdSuccessAction(res.data))
        }).catch((err)=>{
            dispatch(findUserByIdErrorAction(err["message"]))
        })
    }
}
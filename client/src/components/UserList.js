 import React, { useState,useEffect } from 'react'
 import { Link } from 'react-router-dom';
 import "./style.css";
 import UserListBody from './UserListBody';
 import { GetAllUsersServices, url } from "../apis/api";
 import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getUserErrorAction, getUserSuccessAction } from '../actions/userActions';
import { Alert } from 'react-bootstrap'

 function UserList() {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [showError, setShowError] = useState(false)

    useEffect(()=>{
        axios.get(url).then((res)=>{
            if(res.status === 200){
                dispatch(getUserSuccessAction(res.data))
                setLoading(false)
            }else if(res.status == 404){
                setShowError(true)
            }
        }).catch((err)=>{
            dispatch(getUserErrorAction(err.response.data))
            setLoading(false)
            setShowError(true)
        })
    },[])
    
    let users = []
    users = useSelector(state=>state.userReducer.getUserReducer.users.users);
    const error = useSelector(state=>state.userReducer.getUserReducer.error);
    console.log(users)
    console.log(error)
    const userInfo = users ? users.map((user,index)=><UserListBody count={index+1}user={user} key={user._id}/>):"";
    
    if(loading || error?.success){
        return (<div style={{width:"100vw",height:"100vh", display:"flex",justifyContent:"center",alignItems:"center"}}>
            <button className="btn btn-primary">
                <span className="spinner-border spinner-border-sm"></span>
                Loading..
            </button>
        </div>)
    }else{
        return (  
            
            <div className='container table-responsive mt-3'>
               { !showError  ? <><div className='table-header'>
                   <h3 className='text-uppercase'>User List</h3>
                   <Link to={"/add"} className='btn btn-primary'>New User</Link>
               </div>
               <table className='table table-dark table-hover table-striped text-center mt-3'>
                   <thead>
                       <tr>
                           <th>Id</th>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>Email</th>
                           <th>Status</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           userInfo
                       }
                   </tbody>
               </table>
               </>:""}
               <Alert show={showError} variant="danger">
                    <strong>Error!</strong><p>{ error?.error ? error?.error : error }</p>
               </Alert>
            </div>
          )
    }
    
 }
 
 export default UserList
 import React, { useState,useEffect } from 'react'
 import { Link } from 'react-router-dom';
 import "./style.css";
 import UserListBody from './UserListBody';
 import { GetAllUsersServices } from "../apis/api";
 import { useDispatch, useSelector } from 'react-redux';

 function UserList() {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        GetAllUsersServices()(dispatch)
    },[])
   
    const users = useSelector(state=>state.userReducer.getUserReducer.users.users);
    const error = useSelector(state=>state.userReducer.getUserReducer.error);
    console.log(users)
    const userInfo = users ? users.map((user)=><UserListBody user={user} key={user._id}/>):"";
    return (
     <div className='container table-responsive mt-3'>
        <div className='table-header'>
            <h3 className='text-uppercase'>User List</h3>
            <Link to={"/add"} className='btn btn-primary'>New User</Link>
        </div>
        <table className='table table-dark table-hover table-striped text-center mt-3'>
            <thead>
                <tr>
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
        { error ? <div className="alert alert-danger alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Error!</strong> {error}
                </div> :""}
     </div>
   )
 }
 
 export default UserList
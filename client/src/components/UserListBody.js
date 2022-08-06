import React from 'react'
import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { GetAllUsersServices, UpdateUserServices } from '../apis/api';

function UserListBody(props) {
    const { firstName,lastName, email, status } =  props.user;
    const count  = props.count
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleEdit = (id) =>{
      navigate(`/edit/${id}`)
    }
    const handleChange = (id)=>{
      UpdateUserServices(id,{status:!status})(dispatch,navigate)
      GetAllUsersServices()(dispatch)
    }
  return (
    <tr>
        <td>{count}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td><button style={{margin:"0px",padding:"3px",width:"80px"}} className={status ? "btn btn-success": "btn btn-danger"}>{status ? "Active":"Inactive"}</button></td>
        <td>
          <div className="dropdown">
            <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown"></i>
            <div className="dropdown-menu">
              <button className='btn btn-success dropdown-item' onClick={()=>handleEdit(props.user._id)} ><i className="fa-solid fa-user-pen"></i></button>
              <button className='btn btn-success dropdown-item' onClick={()=>handleChange(props.user._id)} >Change status</button>
            </div>
          </div>
        </td>
    </tr>
  )
}

export default UserListBody
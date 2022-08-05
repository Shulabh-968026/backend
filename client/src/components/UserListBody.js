import React from 'react'
import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { GetAllUsersServices, UpdateUserServices } from '../apis/api';

function UserListBody(props) {
    const { firstName,lastName, email, status } =  props.user;
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
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{status ? "True" : "False"}</td>
        <td>
          <div className="btn-group">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" style={{margin:"0px",padding:"3px",width:"80px"}}>action</button>
            <div className="dropdown-menu">
              <button className='btn btn-success dropdown-item' onClick={()=>handleEdit(props.user._id)} >Edit</button>
              <button className='btn btn-success dropdown-item' onClick={()=>handleChange(props.user._id)} >Change Status</button>
            </div>
          </div>
        </td>
    </tr>
  )
}

export default UserListBody
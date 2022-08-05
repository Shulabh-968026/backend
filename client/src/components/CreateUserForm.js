import React, { useEffect, useState } from 'react'
import "./style.css";
import axios from 'axios'
import { findUserByIdServices,UpdateUserServices, url } from '../apis/api';
import { useNavigate, useParams } from 'react-router-dom';
import { createUserServices } from "../apis/api";
import { useDispatch, useSelector } from 'react-redux';

function CreateUserForm() {
    const dispatch = useDispatch()
    const params = useParams();
    console.log(params.id)
    const isEdit = params.id ? true :false
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        status:true
    })
    useEffect(()=>{
        axios.get(url+"/"+params.id).then((res)=>{
            const user = res.data.user
            console.log(res.data)
            setFormData({
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                status:user.status
            })
        }).catch((err)=>{
            console.log(err)
        })
    },[params.id])

    const response = useSelector(state=>state.userReducer.createUserReducer.user)
    const error = useSelector(state=>state.userReducer.createUserReducer.error)
    const [formDataError,setFormDataError] = useState({
        firstName:"",
        lastName:"",
        email:""
    })
    const navigate = useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formData)
        if(formData.firstName === ""){
            setFormDataError({firstName:"First Name Can't be null"})
            return
        }else if(formData.lastName === ""){
            setFormDataError({lastName:"Last Name Can't be null"})
            return
        }
        else if(formData.email === "" || formData.email.length<11 || !formData.email.endsWith("@gmail.com")){
            setFormDataError({email:"Email can't be null and must end's with @gmail.com"})
            return
        }
        if(isEdit){
            UpdateUserServices(params.id,formData)(dispatch,navigate)
        }
        else{
            createUserServices(formData)(dispatch,navigate);
        }
        

        console.log(response)
    if(response.success){
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            status:true
        })
        setFormDataError({
            firstName:"",
            lastName:"",
            email:""
        })
        }
    }
  return (
    <div className='container mt-3'>
        { error ? <div className="alert alert-danger alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Error!</strong> {error["message"]}
                </div> :""}
        <h4 className='text-uppercase p-2'>{ !isEdit ? "User Creation Form" :"User Edit Form"}</h4>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='firstName' className='labels'>First Name:</label>
                <input
                    type={"text"}
                    name="firstName"
                    value={formData.firstName}
                    className='form-control'
                    placeholder='Enter First Name'
                    onChange={(e)=>setFormData({...formData, firstName:e.target.value})}
                    required
                />
                <p className='text-danger'>{formDataError.firstName}</p>
            </div>
            <div className='mb-3'>
                <label htmlFor='lastName' className='labels'>Last Name:</label>
                <input
                    type={"text"}
                    name="lastName"
                    value={formData.lastName}
                    className='form-control'
                    placeholder='Enter Last Name'
                    onChange={(e)=>setFormData({...formData, lastName:e.target.value})}
                    required
                />
                <p className='text-danger'>{formDataError.lastName}</p>
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='labels'>Email:</label>
                <input
                    type={"email"}
                    name="email"
                    value={formData.email}
                    className='form-control'
                    placeholder='Enter Email'
                    onChange={(e)=>setFormData({...formData, email:e.target.value})}
                    required
                />
                <p className='text-danger'>{formDataError.email}</p>
            </div>
            <div className='mb-3'>
                <label htmlFor='status' className='labels'>Status:</label>
                <select 
                    value={formData.status} className='form-control' 
                    name='status' 
                    onChange={(e)=>setFormData({...formData,status:e.target.value})}>
                    <option value={"true"}>True</option>
                    <option value={"false"}>False</option>
                </select>
            </div>
            <div className='d-grid mt-4'>
                <button type='submit' className='btn btn-success p-2'>{ !isEdit ? "Submit" : "Edit "}</button>
            </div>
        </form>
    </div>
  )
}

export default CreateUserForm
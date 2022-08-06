import React, { useEffect, useState } from 'react'
import "./style.css";
import axios from 'axios'
import { findUserByIdServices,UpdateUserServices, url } from '../apis/api';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { createUserServices } from "../apis/api";
import { useDispatch, useSelector } from 'react-redux';
import { createUserErrorAction, createUserSuccessAction, findUserByIdErrorAction, findUserByIdSuccessAction, updateUserErrorAction, updateUserSuccessAction } from '../actions/userActions';
import { Alert } from 'react-bootstrap';

function CreateUserForm() {
    const dispatch = useDispatch()
    const params = useParams();
    console.log(params.id)
    const isEdit = params.id ? true :false
    const [loading,setLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        status:true,
        firstNameError:"",
        lastNameError:"",
        emailError:""
    })
    useEffect(()=>{
        document.title = isEdit ? "Edit User" : "Add User"
        if(isEdit){
            axios.get(url+"/"+params.id).then((res)=>{
                const user = res.data.user
                console.log(res.data)
                setFormData({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    status:user.status
                })
                dispatch(findUserByIdSuccessAction(res.data))
            }).catch((err)=>{
                dispatch(findUserByIdErrorAction(err.response.data))
            })
        }        
    },[params.id])

    const response = useSelector(state=>state.userReducer.createUserReducer.user)
    const error = useSelector(state=>state.userReducer.createUserReducer.error)
    const navigate = useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formData)
        const letters = /^[A-Za-z]+$/;
        if( formData.firstName === "" || formData.firstName.trim() === "" || !formData.firstName.trim().match(letters)){
            setFormData({...formData,firstNameError:"First Name Can't be null and only character allowed"})
            return
        }else if(formData.lastName === "" || formData.lastName.trim() === "" || !formData.lastName.trim().match(letters)){
            setFormData({...formData,lastNameError:"Last Name Can't be null and only character allowed"})
            return
        }
        else if(formData.email.trim() === "" || formData.email.trim().length<11 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email.trim()))){
            setFormData({...formData,emailError:"Email can't be null and must end's with @gmail.com"})
            return
        }
        if(isEdit){
            axios.patch(url+"/update/"+params.id,formData).then((res)=>{
                dispatch(updateUserSuccessAction(res.data))
                setFormData({
                    firstName:"",
                    lastName:"",
                    email:"",
                    status:true,
                    firstNameError:"",
                    lastNameError:"",
                    emailError:""
                })
                setLoading(false)
                navigate("/")
            }).catch((err)=>{
                setLoading(false)
                setShowError(true)
                dispatch(updateUserErrorAction(err.response.data))
            })
        }
        else{
            setLoading(true)
            axios.post(url+"/add",formData).then((res)=>{
                dispatch(createUserSuccessAction(res.data))
                setFormData({
                    firstName:"",
                    lastName:"",
                    email:"",
                    status:true,
                    firstNameError:"",
                    lastNameError:"",
                    emailError:""
                })
                setLoading(false)
                navigate("/")
            }).catch((err)=>{
                setLoading(false)
                setShowError(true)
                dispatch(createUserErrorAction(err.response.data))
            })
        }
        console.log(response)
    }
     
    if(loading){
        return (<div style={{width:"100vw",height:"100vh", display:"flex",justifyContent:"center",alignItems:"center"}}>
            <button className="btn btn-primary">
                <span className="spinner-border spinner-border-sm"></span>
                Loading..
            </button>
        </div>)
    }else{
        return (
    <div className='container mt-3'>
        { !showError ? <><div className='table-header'>
            <h3 className='text-uppercase'>{ !isEdit ? "User Creation Form" :"User Edit Form"}</h3>
            <Link to={"/"} className='btn btn-primary'>User List</Link>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='firstName' className='labels'>First Name:</label>
                <input
                    type={"text"}
                    name="firstName"
                    value={formData.firstName}
                    className='form-control'
                    placeholder='Enter First Name'
                    onChange={(e)=>setFormData({...formData, firstName:e.target.value,firstNameError:""})}
                    required
                />
                <p className='text-danger'>{formData.firstNameError}</p>
            </div>
            <div className='mb-3'>
                <label htmlFor='lastName' className='labels'>Last Name:</label>
                <input
                    type={"text"}
                    name="lastName"
                    value={formData.lastName}
                    className='form-control'
                    placeholder='Enter Last Name'
                    onChange={(e)=>setFormData({...formData, lastName:e.target.value,lastNameError:""})}
                    required
                />
                <p className='text-danger'>{formData.lastNameError}</p>
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='labels'>Email:</label>
                <input
                    type={"email"}
                    name="email"
                    value={formData.email}
                    className='form-control'
                    placeholder='Enter Email'
                    onChange={
                        (e)=>setFormData({...formData, email:e.target.value,emailError:""})
                    }
                    required
                />
                <p className='text-danger'>{formData.emailError}</p>
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
        </>:""}
        <Alert show={showError} variant="danger">
        <strong>Error!</strong><p>{ error?.error ? error?.error : error }</p>
        </Alert>
    </div>
  )
                }
}

export default CreateUserForm
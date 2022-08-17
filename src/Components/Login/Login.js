import { useFormik } from "formik";
import React from "react";
import logo from '../../logo_transparent.png'
import "./Login.css"
import {user} from '../../data'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const validate=values=>{
    let errors={}

    if(!values.username){
        errors.username='Required'
    }
    else if(values.username!==user.username){
        errors.username='Wrong Username'
    }

    if(!values.password){
        errors.password='Required'
    }
    else if(values.password!==user.password){
        errors.password='Wrong Password'
    }
    return errors
}

function Login(){
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues:{
            username: '',
            password: ''
        },
        onSubmit: values=>{
            axios.post('login2', values).then(res => localStorage.setItem('token', res.data))

            navigate('/list')
        },
        validate,
    })
    return (
        <div className="login">
            <div className="login-left"><img src={logo} /></div>
            <div className="login-right">
                <div className="box">
                    <div className="box-inner">
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Sign In</h2>
                            <input placeholder="username*" id="username" type="text" value={formik.values.username} onChange={formik.handleChange}/>
                            <input placeholder="password*" id="password" type="password" value={formik.values.password} onChange={formik.handleChange} />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
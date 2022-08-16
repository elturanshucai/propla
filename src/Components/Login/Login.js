import { useFormik } from "formik";
import React from "react";
import logo from '../../logo_transparent.png'
import "./Login.css"

function Login(){
    const formik = useFormik({
        initialValues:{
            username: '',
            password: ''
        },
        onSubmit: values=>{
            console.log(values);
        }
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
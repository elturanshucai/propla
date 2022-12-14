import { useFormik } from "formik";
import React, { useState } from "react";
import logo from '../../images/logo_transparent.png'
import "./Login.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Loading from "../UI/Loading";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
    username: Yup.string()
        .required('Ad boş qoyula bilməz'),
    password: Yup.string()
        .required('Parol boş qoyula bilməz')
})

function Login() {

    const navigate = useNavigate()
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        onSubmit: async values => {

            try {
                setLoading(true)
                const res = await axios.post(process.env.REACT_APP_LOGIN_API, values);
                if (res.data) {
                    toast.success('Daxil oldunuz');
                    setLoading(false)
                    navigate('/')
                    localStorage.setItem('token', res.data)
                }
                else {
                    setLoading(false)
                    toast.error('Xəta baş verdi');
                    formik.errors.verify = 'Ad ve ya parol sehvdir'
                    setAlert(true)
                    setTimeout(() => setAlert(false), 2500)
                }
            } catch (err) {
                setLoading(false)
                console.log(err.response);
            }

        },
        validationSchema,
    })

    const alertFn = () => {
        if (formik.errors.username || formik.errors.password) {
            setAlert(true)
            setTimeout(() => setAlert(false), 2500)
        }
    }

    return (
        <div className="login">
            {loading && <Loading />}
            <div className="login-left">
                <img src={logo} alt='' />
                <p>ProPla</p>
            </div>
            <div className="login-right">
                <div className="box">
                    <div className="box-inner">
                        <div className="logo">
                            <img src={logo} alt='' />
                            <p>ProPla</p>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Sign In</h2>
                            <input placeholder="username*" id="username" type="text" value={formik.values.username} onChange={formik.handleChange} />
                            <input placeholder="password*" id="password" type="password" value={formik.values.password} onChange={formik.handleChange} />
                            <button type="submit" onClick={alertFn} >Login</button>
                        </form>
                    </div>
                </div>

                {
                    alert &&
                    <div className="alert">
                        <p>{formik.errors.username && formik.errors.username}</p>
                        <p>{formik.errors.password && formik.errors.password}</p>
                        <p>{formik.errors.verify && formik.errors.verify}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login
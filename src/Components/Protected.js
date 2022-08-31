import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { fnLogin, fnLogout } from '../Store/reducers/projectReducer';
import axios from "axios";


function Protected({ children }) {
  axios.defaults.baseURL = 'http://localhost:5000/'

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const verfiyToken = useCallback(async () => {
    try {
      const token = localStorage.token;
      if (token) {
        const res = await axios.post('verify', { token });
        
        if (res.data) {
          
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage?.getItem('token')
          dispatch(fnLogin())
        } else {
          localStorage.removeItem('token')
          dispatch(fnLogout())
          navigate('/login')
        }

      } else {
        window.location.href='/login'
      }
    } catch (err) {
      console.log(err);
    }
  }, []);


  useEffect(() => verfiyToken, [verfiyToken]);
    return children
}

export default Protected
import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { fnLogin, fnLogout } from '../Store/reducers/projectReducer';
import axios from "axios";


function Protected({ children }) {

  const dispatch=useDispatch()

  const login=useSelector(state=>state.projectReducer.login)

  const verfiyToken = useCallback(async () => {
    try {
      const token = localStorage.token;
      if (token) {
        const res = await axios.post('verify', { token });
        
        if (res.data) {
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

   const navigate = useNavigate()
   if(login===true){
      return children
   }
   else{
      navigate('/login')
   }
}

export default Protected
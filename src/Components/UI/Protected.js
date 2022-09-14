import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";


function Protected({ children }) {
  axios.defaults.baseURL = 'http://10.1.14.29:85/api/'

  const navigate = useNavigate()

  const verfiyToken = useCallback(async () => {
    try {
      const token = localStorage.token;
      if (token) {
        const res = await axios.post(`${process.env.REACT_APP_VERIFY_API}?token=${token}`);

        if (res.data === true) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage?.getItem('token')
        } else {
          localStorage.removeItem('token')
          navigate('/login')
        }

      } else {
        window.location.href = '/login'
      }
    } catch (err) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }, [navigate]);


  useEffect(() => verfiyToken, [verfiyToken]);
  return children
}

export default Protected
import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import List from './Components/Home/List';
import "./App.css"
import Login from './Components/Login/Login';
import Details from './Components/ProjectDetails/Details';
import Protected from './Components/Protected';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function App() {

  const [login, setLogin] = useState(false);

  // const navigate = useNavigate();

  const verfiyToken = useCallback(async () => {
    try {
      const token = localStorage.token;
      console.log(token);
      if (token) {
        const res = await axios.post('verify', { token });
        if (res.data) {
          setLogin(true);
        } else {
          localStorage.removeItem('token')
          window.location.href = 'login';
        }
      } else {
        // navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }, []);


  useEffect(() => verfiyToken, [verfiyToken]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/list'
            element={
              <Protected login={login}> <List /> </Protected>
            } />
          <Route path='/login' element={<Login />} />
          <Route path='/project/:id' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import List from './Components/Home/List';
import "./App.css"
import Login from './Components/Login/Login';
import Details from './Components/ProjectDetails/Details';
import Protected from './Components/UI/Protected';
import Admin from './Components/Admin/Admin';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';


function App() {

  const verfiyToken = useCallback(async () => {
    let array = window.location.href.split('/')
    let end = array[array.length - 1]
    try {
      const token = localStorage.token;
      if (token) {
        const res = await axios.post(`${process.env.REACT_APP_VERIFY_API}?token=${token}`);
        if (res.data === true) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage?.getItem('token')
        } else {
          localStorage.removeItem('token')
          if (end !== 'login') {
            window.location.href = '/login'
          }
        }

      } else {
        if (end !== 'login') {
          window.location.href = '/login'
        }
      }
    } catch (err) {
      localStorage.removeItem('token')
      if (end !== 'login') {
        window.location.href = '/login'
      }
    }
  }, []);


  useEffect(() => verfiyToken, [verfiyToken]);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <List />
            } />

          <Route path='/login' element={<Login />} />

          <Route path='/project/:id'
            element={
              <Details />
            } />

          <Route path='/admin' element={
            <Admin />
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

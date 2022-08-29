import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import List from './Components/Home/List';
import "./App.css"
import Login from './Components/Login/Login';
import Details from './Components/ProjectDetails/Details';
import Protected from './Components/Protected';
import Admin from './Components/Admin/Admin';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Protected> <List /> </Protected>
            } />

          <Route path='/login' element={<Login />} />

          <Route path='/project/:id'
            element={
              <Protected> <Details /> </Protected>
            } />
<<<<<<< HEAD

          <Route path='/admin' element={<Admin />} />
=======
          <Route path='admin' element={<Admin />} />
>>>>>>> 7ca95a059d8bcdc3511ead4f8a5c6fcdf9d98ffd
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

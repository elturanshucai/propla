import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import List from './Components/Home/List';
import "./App.css"
import Login from './Components/Login/Login';
import Details from './Components/ProjectDetails/Details';
import Protected from './Components/Protected';


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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

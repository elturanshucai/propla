import React from 'react'
import Header from './Components/Headder/Header';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import List from './Components/Home/List';
import "./App.css"
import Login from './Components/Login/Login';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<List/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

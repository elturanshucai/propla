import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import List from './Components/Home/List';
import "./App.css"
import Login from './Components/Login/Login';
import Details from './Components/ProjectDetails/Details';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/list' element={<List/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/project/:id' element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

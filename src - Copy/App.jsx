

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashbord from './pages/Dashbord'
import Header from './componets/Header'
import Footer from './componets/Footer'
import View from './pages/View'
import { useState } from 'react'



function App() {
  const [staffDetailsPropes, setStaffDetailsPropes] = useState([]);

  return (
    <>
      <Header/>
     <Routes  >
      <Route path='/' element={<Home/>}/>
      <Route path='/view' element={<View staffDetailsPropes={staffDetailsPropes}/>}/>
      <Route path='/dashbord'  element={<Dashbord setStaffDetailsPropes={setStaffDetailsPropes}/>}/>
     </Routes>
     <Footer/>

     
    </>
  )
}

export default App

import React from 'react'
import { Link } from 'react-router-dom'
import home from '../assets/home3.png'
const Home = () => {
  return (
    <>
    <div style={{minHeight:'100vh'}} className='d-flex justify-content-center align-items-center rounded shadow w-100'>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 style={{fontSize:'80px'}}>
             Staff Management
            </h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit id ex, enim tenetur ut maiores alias magnam sed totam! Adipisci voluptates impedit voluptate possimus sint provident pariatur iusto minus aliquid.</p>
            <Link to={'/dashbord'} className='btn btn-warning'> START TO EXPLOER</Link>  
          </div>
          <div className='col-lg-6'>
          <img className='img-fluid' src={home} alt="" />
          </div>
        </div>
      </div>
    </div>

    

   
    </>
  )
}

export default Home
import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home3.png';

const Home = () => {
  return (
    <>
      <div
        style={{ minHeight: '100vh' }}
        className="d-flex justify-content-center align-items-center rounded shadow w-100"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 text-center text-lg-start">
              <h1 style={{ fontSize: '3rem',marginTop:'100px' }} className="fw-bold">
              Workforce <br /> Management
              </h1>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit id ex, enim tenetur
                ut maiores alias magnam sed totam! Adipisci voluptates impedit voluptate possimus
                sint provident pariatur iusto minus aliquid.
              </p>
              <Link to={'/dashbord'} className="btn btn-warning">
                START TO EXPLORE
              </Link>
            </div>
            <div className="col-lg-6 col-md-12 text-center">
              <img className="img-fluid" src={home} alt="Home" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

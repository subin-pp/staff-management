import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar className="bg-info position-fixed w-100" style={{ zIndex: 1 }}>
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Navbar.Brand style={{ color: 'white' }} className="fs-5 fw-bolder">
            <i className="fa-regular fa-address-card pe-3"></i>
            TeamTrack
          </Navbar.Brand>
        </Link>

        {/* Conditional Search Box */}
        {location.pathname === '/view' && (
          <input
            type="text"
            placeholder="Search..."
            className="form-control w-25"
            style={{
              borderRadius: '20px',
              border: 'solid',
              padding: '5px 20px',
            }}
          />
        )}
      </Container>
    </Navbar>
  );
};

export default Header;

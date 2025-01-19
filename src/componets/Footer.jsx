import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer 
      className="text-dark py-4 shadow-lg "
      style={{ background: '#41c1b6' }}
    >
      <div className="container">
        <div className="row">
          {/* Section 1: Brand Name and Icons */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h2 className="fw-bold">StaffManager</h2>
            <p className="mt-2">
              Efficiently manage your staff with our easy-to-use platform.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-dark fs-4">
                <FaInstagram />
              </a>
              <a href="#" className="text-dark fs-4">
                <FaTwitter />
              </a>
              <a href="#" className="text-dark fs-4">
                <FaFacebook />
              </a>
              <a href="#" className="text-dark fs-4">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className="fw-bold">Quick Links</h4>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-dark text-decoration-none">Dashboard</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Staff Directory</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Add Staff</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Manage Staff</a></li>
            </ul>
          </div>

          {/* Section 3: Staff Management Services */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className="fw-bold">Staff Management</h4>
            <ul className="list-unstyled mt-3">
              <li><a href="#" className="text-dark text-decoration-none">Add New Staff</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Update Staff Details</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Staff Roles</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Staff Performance</a></li>
            </ul>
          </div>

          {/* Section 4: Contact Us */}
          <div className="col-lg-3 col-md-12">
            <h4 className="fw-bold">Stay Updated</h4>
            <p className="mt-3">Subscribe for the latest updates on staff management tools and features.</p>
            <form className="mt-3">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control rounded-pill"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button className="btn btn-dark rounded-pill" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

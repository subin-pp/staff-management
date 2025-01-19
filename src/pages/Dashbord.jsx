import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { saveStaffDetailsAPI,getsStaffDetailsAPI,getStaffDetailsByIdAPI,updateStaffDetailsAPI, deleteStaffDetailsAPI } from "../services/allAPI";
import { Link } from "react-router-dom";



const Dashboard = ({setStaffDetailsPropes }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const handleDetailsClose = () => setShowDetailsModal(false);

  const handleFormClose = () => {
    setShowFormModal(false)
    resetForm()

  } ;
  const handleFormShow = () => setShowFormModal(true);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [imageLink, setImageLink] = useState("");


  const [isValidName, setIsValidName] = useState(true);
  const [isValidAge, setIsValidAge] = useState(true);
  const [isValidPlace, setIsValidPlace] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidImageLink, setIsValidImageLink] = useState(true);

  const [staffDetails,setStaffDetails] = useState([])

  const [selectedStaff, setSelectedStaff] = useState(null);

  const [editingData,setEditingData] = useState([])

  // to show purticular data when click on the modal 
  const handleDetailsShow = (staff) => {
    setSelectedStaff(staff);
    setShowDetailsModal(true);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "name":
        setIsValidName(/^[a-zA-Z\s]+$/.test(value));
        break;
      case "age":
        setIsValidAge(/^(1[89]|[2-9][0-9]|100)$/.test(value));
        break;
      case "place":
        setIsValidPlace(value.trim() !== "");
        break;
      case "phone":
        setIsValidPhone(/^[0-9]{10}$/.test(value));
        break;
      case "imageLink":
        setIsValidImageLink(/^(http|https):\/\//.test(value));
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setPlace("");
    setPhone("");
    setImageLink("");
    setIsValidName(true);
    setIsValidAge(true);
    setIsValidPlace(true);
    setIsValidPhone(true);
    setIsValidImageLink(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields before submission
    validateInput("name", name);
    validateInput("age", age);
    validateInput("place", place);
    validateInput("phone", phone);
    validateInput("imageLink", imageLink);

    if (isValidName && isValidAge && isValidPlace && isValidPhone && isValidImageLink) {
      alert("Form submitted successfully");
      const newStaffMember= {
        name,
        age,
        place,
        phone,
        imageLink,
      };

      
      console.log(newStaffMember); 

      const response = await saveStaffDetailsAPI(newStaffMember); 
      console.log(response);

      resetForm();
    } else {
      alert("Please fix the errors in the form.");
    }
  };


  const getsStaffDetails = async () => {
    try {
      const response = await getsStaffDetailsAPI();
        
      if (response.status >= 200 && response.status<300) {
        setStaffDetails(response.data); 
        setStaffDetailsPropes(response); // if we write setStaffDetailsPropes(response.data); it dosent work
      } else {
        console.error('Failed to fetch data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error while fetching staff details:', error);
    }
  };
  
  useEffect(() => {
    getsStaffDetails(); 
  }, [setStaffDetailsPropes]); 

  const staffDetailsById = async (id) => {
    try {
      const response = await getStaffDetailsByIdAPI(id);
      const data = response.data;
  
      setEditingData(response); // Optional, if you need to keep the entire object
  
      setName(data.name);
      setAge(data.age);
      setPlace(data.place);
      setPhone(data.phone);
      setImageLink(data.imageLink);
  
    } catch (error) {
      console.error("Error fetching staff details by ID:", error);
    }
  };
  

  const updateStaffDatailsById = async (id) => {
    try {
      const updatedData = {name,age,place,phone,imageLink,};
  
      const response = await updateStaffDetailsAPI(id, updatedData);
      console.log(response);
      if (response.status == 200) {
        alert("Staff details updated successfully!");
        handleFormClose();
        getsStaffDetails(); // Refresh the staff details list
      }
    } catch (error) {
      console.error("Error updating staff details:", error);
    }
  };

  const deleteStaffDetails = async(id)=>{
    try {
      const response = await deleteStaffDetailsAPI(id)
      console.log(response);
      getsStaffDetails();
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
 

  
  return (
    <>
      <div className="d-flex align-items-center" style={{ minHeight: "100vh", width: "100%"  }}>
        <div className="row " style={{ height: "100%" }}>
          {/* First Column */}
          <div 
            className="col-lg-5 col-12"
            style={{
              // border: '1px solid white', 
              padding: "10px",
              height:'100%'
              
            }}
          >
            <h1 className="text-center">Add Staff </h1>
            <div className="ps-3 pe-3 pt-3">
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateInput("name", e.target.value);
                }}
                isInvalid={!isValidName}
              />
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter Your Age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  validateInput("age", e.target.value);
                }}
                isInvalid={!isValidAge}
              />
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter Your Place"
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                  validateInput("place", e.target.value);
                }}
                isInvalid={!isValidPlace}
              />
              <Form.Control
                className="mb-2"
                type="number"
                placeholder="Enter Your Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  validateInput("phone", e.target.value);
                }}
                isInvalid={!isValidPhone}
              />
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Upload Your Image"
                value={imageLink}
                onChange={(e) => {
                  setImageLink(e.target.value);
                  validateInput("imageLink", e.target.value);
                }}
                isInvalid={!isValidImageLink}
              />
  
              <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                <Button
                  className="btn btn-success px-4"
                  style={{ minWidth: "120px" }}
                  onClick={handleSubmit}
                  disabled={!name || !age || !place|| !imageLink || !phone}
                >
                  Submit
                </Button>
                <Button
                  className="btn px-4"
                  style={{ minWidth: "120px" }}
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
            
           

          {/* Second Column */}
          <div
            className="col-lg-7 col-12 "
            style={{
              padding: "10px",
            }}
          >
            <h1 className="text-center">Staff Details</h1>
            <div className="d-flex flex-wrap gap-1 justify-content-between ps-3 pe-3 pt-3">
              

             {
              staffDetails.length > 0 ?
              staffDetails.map((data)=>(
                <div
                onClick={()=>handleDetailsShow(data)}
                className="shadow border pt-2 ps-2 pb-2 pe-2 d-flex align-items-center gap-4 flex-column flex-sm-row"
                style={{
                  borderRadius: "20px",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <img
                  style={{
                    width: "75px",
                    height:'75px',
                    borderRadius: "50%",
                  }}
                  src={data.imageLink}
                  alt="Profile"
                />
                <div className="pt-1">
                  <h6>
                    Name: <span>{data.name}</span>
                  </h6>
                  <h6>
                    Phone: <span>{data.phone}</span>
                  </h6>
                </div>
                <div className="d-flex flex-column align-items-center gap-2">
                  <i onClick={(e)=>{
                    e.stopPropagation(); 
                    deleteStaffDetails(data.id);
                  }}
                    className="fa-solid fa-trash-can"
                    style={{ color: "#e83283", fontSize: "20px" }}
                  ></i>
                  <i 
                    className="fa-regular fa-pen-to-square"
                    style={{ color: '#41d7a7', fontSize: '20px' }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleFormShow();
                      staffDetailsById(data.id);
                    }}
                  ></i>
                </div>
              </div>
              )):<div>There is no data</div>

             }
             
            </div>
            <Link  to="/view">
                <Button className="ms-3 mt-3" >View Staffs</Button>
            </Link>
         </div>
        </div>
  
        {/* Staff Details Modal */}
         
      <Modal size="sm" centered show={showDetailsModal} onHide={handleDetailsClose}>
       <Modal.Body>
                
        {selectedStaff && (
      <>
        <div className="text-center mb-4">
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={selectedStaff.imageLink}
            alt="Profile"
          />
        </div>
        <div className="text-start">
          <p>
            <strong>Name:</strong> <span>{selectedStaff.name}</span>
          </p>
          <p>
            <strong>Age:</strong> <span>{selectedStaff.age}</span>
          </p>
          <p>
            <strong>Place:</strong> <span>{selectedStaff.place}</span>
          </p>
          <p>
            <strong>Number:</strong> <span>{selectedStaff.phone}</span>
          </p>
        </div>
      </>
    )}
    <div className="text-end mt-1">
      <Button variant="primary" onClick={handleDetailsClose}>
        Close
      </Button>
    </div>          
    </Modal.Body>
      </Modal>
           
  
        {/* Form Modal */}
        <Modal
          show={showFormModal}
          onHide={handleFormClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Staff Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="ps-3 pe-3 pt-3">
          <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter Your Place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <Form.Control
              className="mb-2"
              type="number"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Upload Your Image"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />


              <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                <Button onClick={()=>updateStaffDatailsById(editingData.data.id)} className="btn btn-success px-4" style={{ minWidth: "120px" }}>
                  Update
                </Button>
                <Button onClick={handleFormClose} className="btn px-4" style={{ minWidth: "120px" }}>
                  Close
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
      
    </>
  );
};

export default Dashboard;
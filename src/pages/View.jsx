import React, { useEffect, useState } from 'react';
const View = ({ staffDetailsPropes, searchTerm }) => {
  const [filteredStaffDetails, setFilteredStaffDetails] = useState([]);

  useEffect(() => {
    console.log("staffDetailsPropes: ", staffDetailsPropes);
    if (staffDetailsPropes?.data) {
      const staffDetails = staffDetailsPropes.data;

      const filtered = staffDetails.filter((staff, index) => {
        const formattedId = String(index + 1).padStart(3, '0'); // Format ID as '001', '002', etc.
        
        return (
          formattedId.includes(searchTerm) || // Check if ID matches the search term
          staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(staff.age).includes(searchTerm) // To handle numeric search, if needed
        );
      });

      setFilteredStaffDetails(filtered);
    
    } else {
      console.log("No staff details available.");
    }
  }, [staffDetailsPropes, searchTerm]); // Re-run whenever staffDetailsPropes or searchTerm changes

  return (
    <div className="d-flex justify-content-center" style={{ minHeight: '100vh', paddingBottom: '30px' }}>
      <div className="container">
        <h1 className="text-center" style={{ marginTop: '80px' }}>All Staffs Data</h1>
        <div className="d-flex flex-wrap justify-content-center mt-4" style={{ gap: '20px' }}>
          {filteredStaffDetails.length > 0 ? (
            filteredStaffDetails.map((staff, index) => {
              const formattedId = String(index + 1).padStart(3, '0'); // Format ID here too

              return (
                <div key={index} className="shadow border d-flex flex-column align-items-center" style={{ width: '280px', height: '390px', borderRadius: '20px', textAlign: 'center', padding: '20px' }}>
                  <div className="text-center mb-1">
                    <img style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} src={staff.imageLink} alt="Profile" />
                  </div>
                  <div className="text-start">
                    <p><strong>ID :</strong> <span style={{ fontSize: '22px' }}>{formattedId}</span></p>
                    <p><strong>Name : </strong> <span>{staff.name}</span></p>
                    <p><strong>Age :</strong> <span>{staff.age}</span></p>
                    <p><strong>Place :</strong> <span>{staff.place}</span></p>
                    <p><strong>Phone :</strong> <span>{staff.phone}</span></p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No staff data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
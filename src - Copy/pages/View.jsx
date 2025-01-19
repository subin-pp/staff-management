import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { saveTaskDetailsAPI, getsTaskDetailsAPI } from '../services/allAPI'; // Import API functions

const View = ({ staffDetailsPropes }) => {
  const [staffDetails, setStaffDetails] = useState(staffDetailsPropes.data || []);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewTaskModal, setShowViewTaskModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [tasks, setTasks] = useState({});  // Store tasks by staff ID
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // State to store form inputs
  const [projectName, setProjectName] = useState('');
  const [role, setRole] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Fetch task data when viewing a task
  const fetchTaskDetails = async (staffId) => {
    setLoading(true);
    try {
      const response = await getsTaskDetailsAPI(staffId);
      if (response.success) {
        setTasks({
          ...tasks,
          [staffId]: response.data,
        });
      } else {
        setError('Failed to fetch task details');
      }
    } catch (err) {
      setError('An error occurred while fetching task details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTask = (staff) => {
    setSelectedStaff(staff);
    setShowAssignModal(true);
  };

  const handleViewTask = (staff) => {
    setSelectedStaff(staff);
    fetchTaskDetails(staff.id); // Fetch task details when viewing the task
    setShowViewTaskModal(true);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedStaff(null);
    setProjectName(''); // Reset the form fields
    setRole('');
    setDueDate('');
  };

  const handleCloseViewTaskModal = () => {
    setShowViewTaskModal(false);
    setSelectedStaff(null);
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();

    const taskData = {
      staffId: selectedStaff.id,
      projectName,
      role,
      dueDate,
    };

    setLoading(true);

    try {
      const response = await saveTaskDetailsAPI(taskData);
      if (response.success) {
        setTasks({
          ...tasks,
          [selectedStaff.id]: taskData,
        });
        setShowAssignModal(false);
      } else {
        setError('Failed to save task details.');
        console.log(response);
        
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <h1 className="text-center" style={{ marginTop: '80px' }}>All Staffs Data</h1>
        <div className="d-flex flex-wrap justify-content-center mt-4" style={{ gap: '20px' }}>
          {staffDetails.length > 0 ? (
            staffDetails.map((staff, index) => (
              <div key={index} className="shadow border d-flex flex-column align-items-center" style={{ width: '280px', height: '380px', borderRadius: '20px', textAlign: 'center', padding: '20px' }}>
                <div className="text-center mb-1">
                  <img style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} src={staff.imageLink} alt="Profile" />
                </div>
                <div className="text-start">
                  <p><strong>ID:</strong> <span style={{ fontSize: '22px' }}>{String(index + 1).padStart(3, '0')}</span></p>
                  <p><strong>Name:</strong> <span>{staff.name}</span></p>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="primary" className="w-75 me-2 btn-sm" onClick={() => handleAssignTask(staff)}>Assign Task</Button>
                  <Button variant="success" className="btn-sm w-75" onClick={() => handleViewTask(staff)}>View Task</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No staff data available.</p>
          )}
        </div>

        {/* Assign Task Modal */}
        <Modal show={showAssignModal} onHide={handleCloseAssignModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Assign Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmitTask}>
              <Form.Group className="mb-3" controlId="formProjectName">
                <Form.Control
                  type="text"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">Select Role</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Full Stack</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDueDate">
                <Form.Label className="ps-1" style={{ color: 'white' }}>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleCloseAssignModal} className="me-2">Cancel</Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Submit'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* View Task Modal */}
        <Modal show={showViewTaskModal} onHide={handleCloseViewTaskModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>View Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Staff ID:</strong> {selectedStaff?.id}</p>
            <p><strong>Staff Name:</strong> {selectedStaff?.name}</p>
            <p><strong>Project Name:</strong> {tasks[selectedStaff?.id]?.projectName || 'No Task Assigned'}</p>
            <p><strong>Role:</strong> {tasks[selectedStaff?.id]?.role || 'No Task Assigned'}</p>
            <p><strong>Due Date:</strong> {tasks[selectedStaff?.id]?.dueDate || 'No Task Assigned'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewTaskModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default View;

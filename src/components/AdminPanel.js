import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import './AdminPanel.css';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [lecturers, setLecturers] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      const lecturersCollection = collection(db, 'lecturers');
      const lecturersSnapshot = await getDocs(lecturersCollection);
      const lecturersList = lecturersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLecturers(lecturersList);
    };
    fetchLecturers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'lecturers', email), { name, email });
      alert(editing ? 'Lecturer updated successfully!' : 'Lecturer added successfully!');
      setEmail('');
      setName('');
      setEditing(null);
      window.location.reload();
    } catch (error) {
      alert('Error saving data: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lecturer?')) {
      try {
        await deleteDoc(doc(db, 'lecturers', id));
        setLecturers(lecturers.filter(lecturer => lecturer.id !== id));
        alert('Lecturer deleted successfully!');
      } catch (error) {
        alert('Error deleting lecturer: ' + error.message);
      }
    }
  };

  const handleEdit = (lecturer) => {
    setEmail(lecturer.email);
    setName(lecturer.name);
    setEditing(lecturer.id);
  };

  const handleCancelEdit = () => {
    setEmail('');
    setName('');
    setEditing(null);
  };

  const filteredLecturers = lecturers.filter(lecturer =>
    lecturer.name.toLowerCase().includes(search.toLowerCase()) ||
    lecturer.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>

      {/* Add Lecturer Section */}
      <h2 className="section-title">➕ Add Lecturer</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-label">Lecturer Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Lecturer Email"
          required
          className="admin-input"
          disabled={editing !== null}
        />
        <label className="admin-label">Lecturer Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Lecturer Name"
          required
          className="admin-input"
        />
        <button type="submit" className="admin-button">
          {editing ? 'Update Lecturer' : 'Add Lecturer'}
        </button>
        {editing && (
          <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* Search Section */}
      <h2 className="section-title">🔍 Search Lecturers</h2>
      <input
        type="text"
        placeholder="Search Lecturer by Name or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="admin-input search-input"
      />

      {/* Lecturers Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLecturers.length > 0 ? (
            filteredLecturers.map((lecturer) => (
              <tr key={lecturer.id}>
                <td>{lecturer.name}</td>
                <td>{lecturer.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(lecturer)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(lecturer.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', fontStyle: 'italic', color: '#777' }}>
                No lecturers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

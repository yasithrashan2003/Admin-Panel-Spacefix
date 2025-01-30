import React, { useState } from 'react';
import { db } from '../firebase'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set the document in Firestore collection
      await setDoc(doc(db, 'lecturers', email), {
        name: name,
        email: email,
      });

      alert('Lecturer data saved successfully!');
    } catch (error) {
      alert('Error saving data: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <label>Lecturer Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Lecturer Email"
        />
        <label>Lecturer Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Lecturer Name"
        />
        <button type="submit">Save Lecturer</button>
      </form>
    </div>
  );
};

export default AdminPanel;

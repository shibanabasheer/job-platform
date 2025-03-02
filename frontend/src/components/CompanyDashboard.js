import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanyDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/candidates')
      .then(res => setCandidates(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (candidate.skills && candidate.skills.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h2>Company Dashboard</h2>
      <input 
        type="text" 
        placeholder="Search by name or skills" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCandidates.map(candidate => (
          <li key={candidate._id}>
            <img src={candidate.profilePic} alt="Profile" width="50" />
            <p><strong>Name:</strong> {candidate.name}</p>
            <p><strong>Experience:</strong> {candidate.experience}</p>
            <p><strong>Skills:</strong> {candidate.skills && candidate.skills.join(', ')}</p>
            <a href={`https://www.linkedin.com/in/${candidate.linkedinId}`} target="_blank" rel="noreferrer">
              View LinkedIn Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDashboard;

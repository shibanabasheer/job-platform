import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    skills: '',
    experience: '',
    location: '',
    preferredRoles: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/candidates/me', { withCredentials: true })
      .then(res => {
        setProfile(res.data);
        setFormData({
          skills: res.data.skills ? res.data.skills.join(', ') : '',
          experience: res.data.experience || '',
          location: res.data.location || '',
          preferredRoles: res.data.preferredRoles ? res.data.preferredRoles.join(', ') : '',
        });
      })
      .catch(err => {
        console.error(err);
        setMessage('Error fetching profile. Please ensure you are logged in.');
      });
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const updatedData = {
      skills: formData.skills.split(',').map(item => item.trim()),
      experience: formData.experience,
      location: formData.location,
      preferredRoles: formData.preferredRoles.split(',').map(item => item.trim()),
    };

    axios.post('http://localhost:5000/api/candidates/update', updatedData, { withCredentials: true })
      .then(res => {
        setProfile(res.data);
        setMessage('Profile updated successfully!');
      })
      .catch(err => {
        console.error(err);
        setMessage('Error updating profile.');
      });
  };

  if (!profile) {
    return <div>{message ? message : 'Loading profile...'}</div>;
  }

  return (
    <div>
      <h2>My Profile</h2>
      <img src={profile.profilePic} alt="Profile" width="100" />
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <form onSubmit={onSubmit}>
        <div>
          <label>Skills (comma separated): </label>
          <input type="text" name="skills" value={formData.skills} onChange={onChange} />
        </div>
        <div>
          <label>Experience: </label>
          <input type="text" name="experience" value={formData.experience} onChange={onChange} />
        </div>
        <div>
          <label>Location: </label>
          <input type="text" name="location" value={formData.location} onChange={onChange} />
        </div>
        <div>
          <label>Preferred Roles (comma separated): </label>
          <input type="text" name="preferredRoles" value={formData.preferredRoles} onChange={onChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;

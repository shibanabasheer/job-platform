import React from 'react';

function Login() {
  const handleLinkedInLogin = () => {
    window.location.href = 'http://localhost:5000/auth/linkedin';
  };

  return (
    <div>
      <h2>Login with LinkedIn</h2>
      <button onClick={handleLinkedInLogin}>Login via LinkedIn</button>
    </div>
  );
}

export default Login;

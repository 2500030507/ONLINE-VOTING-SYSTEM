import { useState } from 'react';
import AuthShell from '../components/AuthShell.jsx';
import Link from '../components/Link.jsx';
import Message from '../components/Message.jsx';
import { readStorage } from '../utils/storage.js';

export default function AdminLoginPage({ navigate }) {
  const [message, setMessage] = useState('');

  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = String(form.get('adminId')).trim().toLowerCase();
    const password = String(form.get('password'));
    const registeredAdmin = readStorage('adminRegistration', null);

    if (localStorage.getItem('adminLocked') === 'true') {
      setMessage('This administrator account is locked. Contact the election officer.');
      return;
    }

    if (!registeredAdmin || id !== registeredAdmin.officerId.toLowerCase() || password !== registeredAdmin.password) {
      setMessage('Invalid Admin ID or password.');
      return;
    }

    sessionStorage.setItem('adminOtp', String(Math.floor(100000 + Math.random() * 900000)));
    sessionStorage.setItem('adminOtpCreated', String(Date.now()));
    navigate('/admin-otp');
  }

  return (
    <AuthShell>
      <p className="eyebrow">SecureVote administration</p>
      <h1>Admin login</h1>
      <p className="intro">Sign in to manage the election. A one-time password is generated after your credentials are validated.</p>
      <form className="form-grid" onSubmit={submit}>
        <label htmlFor="adminId">Admin ID</label>
        <input id="adminId" name="adminId" required placeholder="Enter admin ID" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required placeholder="Enter password" />
        <button type="submit">Continue to verification</button>
        <Message text={message} />
      </form>
      <div className="info-box">Use your registered election officer credentials to continue.</div>
      <Link className="secondary-link" href="/admin-register" navigate={navigate}>New election officer? Register here</Link>
    </AuthShell>
  );
}

import { useEffect, useState } from 'react';
import AuthShell from '../components/AuthShell.jsx';
import Link from '../components/Link.jsx';
import Message from '../components/Message.jsx';

export default function AdminOtpPage({ navigate }) {
  const [message, setMessage] = useState('');
  const otp = sessionStorage.getItem('adminOtp');

  useEffect(() => {
    if (!otp) navigate('/');
  }, [navigate, otp]);

  function submit(event) {
    event.preventDefault();
    const enteredOtp = String(new FormData(event.currentTarget).get('otp')).trim();
    if (!otp || enteredOtp !== otp) {
      setMessage('That OTP is incorrect. Please try again.');
      return;
    }
    sessionStorage.setItem('adminVerified', 'true');
    navigate('/dashboard');
  }

  return (
    <AuthShell>
      <p className="eyebrow">SecureVote administration</p>
      <h1>Verify your device</h1>
      <p className="intro">Enter the six-digit OTP sent to the registered administrator device.</p>
      <div className="info-box">Demo OTP: <strong>{otp || 'Not available'}</strong>. Keep it private.</div>
      <form className="form-grid" onSubmit={submit}>
        <label htmlFor="otp">One-time password</label>
        <input id="otp" name="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" required placeholder="Enter 6-digit OTP" />
        <button type="submit">Verify and open dashboard</button>
        <Message text={message} />
      </form>
      <Link className="secondary-link" href="/" navigate={navigate}>Back to admin login</Link>
    </AuthShell>
  );
}

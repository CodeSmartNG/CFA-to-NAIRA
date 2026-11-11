import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await register(form);
      nav('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md card">
        <h1 className="text-2xl font-bold text-brand-600 mb-1">Create account</h1>
        <p className="text-gray-500 text-sm mb-6">Start exchanging XOF ⇄ NGN</p>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="label">Full name</label>
            <input required value={form.fullName} onChange={set('fullName')} className="input" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" required value={form.email} onChange={set('email')} className="input" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input required value={form.phone} onChange={set('phone')} className="input" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" required minLength={8} value={form.password} onChange={set('password')} className="input" />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters.</p>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already registered? <Link to="/login" className="text-brand-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

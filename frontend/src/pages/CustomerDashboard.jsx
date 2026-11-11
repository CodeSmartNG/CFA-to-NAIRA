import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const [rate, setRate] = useState(null);

  useEffect(() => { api.get('/rates').then(r => setRate(r.data)); }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user.fullName}</h1>
        <button onClick={logout} className="text-red-600">Logout</button>
      </header>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">We buy XOF at</p>
          <p className="text-3xl font-bold">{rate?.buyRate || '—'} NGN</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">We sell XOF at</p>
          <p className="text-3xl font-bold">{rate?.sellRate || '—'} NGN</p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link to="/exchange/new" className="bg-indigo-600 text-white px-5 py-3 rounded-lg">New Exchange</Link>
        <Link to="/exchange/history" className="bg-white border px-5 py-3 rounded-lg">My History</Link>
      </div>
    </div>
  );
}

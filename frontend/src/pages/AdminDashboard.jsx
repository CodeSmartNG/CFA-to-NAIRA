import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

function Stat({ label, value, accent }) {
  return (
    <div className="card">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`text-3xl font-bold ${accent || 'text-gray-900'}`}>{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => { api.get('/reports/dashboard').then(r => setStats(r.data)); }, []);

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
        {!stats && <p className="text-gray-500">Loading…</p>}
        {stats && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Pending requests" value={stats.pending} accent="text-yellow-700" />
            <Stat label="Completed" value={stats.completed} accent="text-green-700" />
            <Stat label="Total transactions" value={stats.totalTx} />
            <Stat label="Registered customers" value={stats.customers} />
          </div>
        )}
        <div className="mt-8 card">
          <p className="text-sm text-gray-500">Cumulative volume sent</p>
          <p className="text-2xl font-bold">
            {stats ? stats.totalSent.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Sum of amountSent across completed transactions (mixed currencies).</p>
        </div>
      </main>
    </div>
  );
}

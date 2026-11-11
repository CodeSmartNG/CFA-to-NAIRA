import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminRates() {
  const [form, setForm] = useState({ buyRate: '', sellRate: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/rates').then(r => setForm({
      buyRate: r.data.buyRate || '', sellRate: r.data.sellRate || ''
    }));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.put('/rates', {
      buyRate: Number(form.buyRate), sellRate: Number(form.sellRate)
    });
    setMsg('Saved');
    setTimeout(() => setMsg(''), 2000);
  };

  return (
    <form onSubmit={save} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Rate Management</h1>
      <label className="block">Buy rate (NGN per 1 XOF)
        <input type="number" step="0.0001" required value={form.buyRate}
          onChange={e => setForm({ ...form, buyRate: e.target.value })}
          className="w-full border p-3 rounded mt-1" />
      </label>
      <label className="block">Sell rate (NGN per 1 XOF)
        <input type="number" step="0.0001" required value={form.sellRate}
          onChange={e => setForm({ ...form, sellRate: e.target.value })}
          className="w-full border p-3 rounded mt-1" />
      </label>
      <button className="bg-indigo-600 text-white w-full p-3 rounded">Save</button>
      {msg && <p className="text-green-700">{msg}</p>}
    </form>
  );
}

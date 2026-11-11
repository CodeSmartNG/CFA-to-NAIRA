import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function NewRequest() {
  const nav = useNavigate();
  const [rate, setRate] = useState(null);
  const [form, setForm] = useState({
    direction: 'XOF_TO_NGN',
    amountSent: '',
    accountName: '', accountNumber: '', bankName: '', momoProvider: ''
  });
  const [error, setError] = useState('');

  useEffect(() => { api.get('/rates').then(r => setRate(r.data)); }, []);

  const preview = () => {
    if (!rate || !form.amountSent) return '—';
    const r = form.direction === 'XOF_TO_NGN' ? rate.buyRate : rate.sellRate;
    return (form.amountSent * r).toFixed(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/requests', {
        direction: form.direction,
        amountSent: Number(form.amountSent),
        payoutDetails: {
          accountName: form.accountName,
          accountNumber: form.accountNumber,
          bankName: form.bankName,
          momoProvider: form.momoProvider
        }
      });
      nav('/exchange/history');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">New Exchange Request</h1>
      <select className="w-full border p-3 rounded" value={form.direction}
        onChange={e => setForm({ ...form, direction: e.target.value })}>
        <option value="XOF_TO_NGN">Sell XOF → Get NGN</option>
        <option value="NGN_TO_XOF">Sell NGN → Get XOF</option>
      </select>
      <input required type="number" min="1" placeholder="Amount to send"
        className="w-full border p-3 rounded" value={form.amountSent}
        onChange={e => setForm({ ...form, amountSent: e.target.value })} />
      <p className="text-gray-600">You'll receive approximately: <b>{preview()}</b></p>
      <input required placeholder="Payout account name" className="w-full border p-3 rounded"
        onChange={e => setForm({ ...form, accountName: e.target.value })} />
      <input required placeholder="Account / MoMo number" className="w-full border p-3 rounded"
        onChange={e => setForm({ ...form, accountNumber: e.target.value })} />
      <input placeholder="Bank name (or Momo provider)" className="w-full border p-3 rounded"
        onChange={e => setForm({ ...form, bankName: e.target.value })} />
      {error && <p className="text-red-600">{error}</p>}
      <button className="bg-indigo-600 text-white w-full p-3 rounded">Submit Request</button>
    </form>
  );
}

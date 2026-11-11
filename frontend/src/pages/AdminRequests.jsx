import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminRequests() {
  const [list, setList] = useState([]);
  const load = () => api.get('/requests').then(r => setList(r.data));
  useEffect(() => { load(); }, []);

  const act = async (id, action) => {
    await api.patch(`/requests/${id}/review`, { action });
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Requests</h1>
      <table className="w-full bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Ref</th>
            <th className="p-2 text-left">Customer</th>
            <th className="p-2 text-left">Direction</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(r => (
            <tr key={r._id} className="border-t">
              <td className="p-2 font-mono">{r.ref}</td>
              <td className="p-2">{r.customer.fullName}</td>
              <td className="p-2">{r.direction}</td>
              <td className="p-2">{r.amountSent} → {r.amountToReceive}</td>
              <td className="p-2">{r.status}</td>
              <td className="p-2 space-x-2 text-center">
                {r.status === 'pending' && <>
                  <button onClick={() => act(r._id,'approve')} className="text-blue-600">Approve</button>
                  <button onClick={() => act(r._id,'reject')} className="text-red-600">Reject</button>
                </>}
                {r.status === 'approved' &&
                  <button onClick={() => act(r._id,'complete')} className="text-green-700">Mark completed</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

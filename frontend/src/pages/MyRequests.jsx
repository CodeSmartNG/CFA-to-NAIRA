import { useEffect, useState } from 'react';
import api from '../services/api';

const color = { pending: 'yellow', approved: 'blue', completed: 'green', rejected: 'red', cancelled: 'gray' };

export default function MyRequests() {
  const [list, setList] = useState([]);
  useEffect(() => { api.get('/requests/mine').then(r => setList(r.data)); }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Requests</h1>
      {list.length === 0 && <p className="text-gray-500">No requests yet.</p>}
      <ul className="space-y-3">
        {list.map(r => (
          <li key={r._id} className="bg-white border p-4 rounded-lg flex justify-between">
            <div>
              <p className="font-mono text-sm">{r.ref}</p>
              <p>{r.direction === 'XOF_TO_NGN' ? 'XOF → NGN' : 'NGN → XOF'}</p>
              <p className="text-sm text-gray-500">
                {r.amountSent} → {r.amountToReceive} @ {r.rateUsed}
              </p>
            </div>
            <span className={`px-3 py-1 rounded text-${color[r.status]}-700 bg-${color[r.status]}-100 self-start text-sm`}>
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

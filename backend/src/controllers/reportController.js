import Transaction from '../models/Transaction.js';
import ExchangeRequest from '../models/ExchangeRequest.js';
import User from '../models/User.js';

export const dashboard = async (_req, res) => {
  const [totalTx, pending, completed, customers] = await Promise.all([
    Transaction.countDocuments(),
    ExchangeRequest.countDocuments({ status: 'pending' }),
    ExchangeRequest.countDocuments({ status: 'completed' }),
    User.countDocuments({ role: 'customer' }),
  ]);
  const volume = await Transaction.aggregate([
    { $group: { _id: null, sent: { $sum: '$amountSent' } } }
  ]);
  res.json({ totalTx, pending, completed, customers, totalSent: volume[0]?.sent || 0 });
};

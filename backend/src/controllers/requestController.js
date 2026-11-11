import ExchangeRequest from '../models/ExchangeRequest.js';
import Rate from '../models/Rate.js';
import Transaction from '../models/Transaction.js';

const genRef = () =>
  `CFA-${new Date().getFullYear()}-${String(Math.floor(Math.random()*1e6)).padStart(6,'0')}`;

export const createRequest = async (req, res) => {
  const { direction, amountSent, payoutDetails } = req.body;
  if (!amountSent || amountSent <= 0) return res.status(400).json({ message: 'Invalid amount' });

  const rate = await Rate.findOne({ pair: 'XOF_NGN' }).sort({ updatedAt: -1 });
  if (!rate) return res.status(400).json({ message: 'Rates not configured' });

  const isXofToNgn = direction === 'XOF_TO_NGN';
  const rateUsed = isXofToNgn ? rate.buyRate : rate.sellRate;
  const rateType = isXofToNgn ? 'buy' : 'sell';
  const amountToReceive = +(amountSent * rateUsed).toFixed(2);

  const request = await ExchangeRequest.create({
    ref: genRef(), customer: req.user._id, direction,
    amountSent, amountToReceive, rateUsed, rateType, payoutDetails
  });
  res.status(201).json(request);
};

export const myRequests = async (req, res) => {
  const list = await ExchangeRequest.find({ customer: req.user._id }).sort({ createdAt: -1 });
  res.json(list);
};

export const cancelRequest = async (req, res) => {
  const r = await ExchangeRequest.findOne({ _id: req.params.id, customer: req.user._id });
  if (!r) return res.status(404).json({ message: 'Not found' });
  if (r.status !== 'pending') return res.status(400).json({ message: 'Cannot cancel' });
  r.status = 'cancelled';
  await r.save();
  res.json(r);
};

// admin
export const listAll = async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const list = await ExchangeRequest.find(filter).populate('customer','fullName email phone').sort({ createdAt: -1 });
  res.json(list);
};

export const reviewRequest = async (req, res) => {
  const { action, adminNote } = req.body; // action: approve|reject|complete
  const r = await ExchangeRequest.findById(req.params.id);
  if (!r) return res.status(404).json({ message: 'Not found' });

  if (action === 'approve' && r.status === 'pending') {
    r.status = 'approved';
  } else if (action === 'reject' && ['pending','approved'].includes(r.status)) {
    r.status = 'rejected';
  } else if (action === 'complete' && r.status === 'approved') {
    r.status = 'completed';
    r.completedAt = new Date();
    await Transaction.create({
      request: r._id, customer: r.customer, direction: r.direction,
      amountSent: r.amountSent, amountToReceive: r.amountToReceive,
      rateUsed: r.rateUsed, settledBy: req.user._id
    });
  } else {
    return res.status(400).json({ message: 'Invalid transition' });
  }

  r.adminNote = adminNote || r.adminNote;
  r.reviewedBy = req.user._id;
  r.reviewedAt = new Date();
  await r.save();
  res.json(r);
};

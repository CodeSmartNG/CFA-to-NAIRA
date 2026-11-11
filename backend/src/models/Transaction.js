import mongoose from 'mongoose';
const s = new mongoose.Schema({
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'ExchangeRequest' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  direction: String,
  amountSent: Number, amountToReceive: Number, rateUsed: Number,
  profit: Number,
  settledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  settledAt: { type: Date, default: Date.now },
}, { timestamps: true });
export default mongoose.model('Transaction', s);

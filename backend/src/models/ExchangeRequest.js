import mongoose from 'mongoose';
const s = new mongoose.Schema({
  ref: { type: String, unique: true, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  direction: { type: String, enum: ['XOF_TO_NGN','NGN_TO_XOF'], required: true },
  amountSent: { type: Number, required: true },
  amountToReceive: { type: Number, required: true },
  rateUsed: { type: Number, required: true },
  rateType: { type: String, enum: ['buy','sell'], required: true },
  payoutDetails: {
    accountName: String, accountNumber: String,
    bankName: String, momoProvider: String
  },
  status: {
    type: String,
    enum: ['pending','approved','rejected','completed','cancelled'],
    default: 'pending'
  },
  adminNote: String,
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date,
  completedAt: Date,
}, { timestamps: true });
export default mongoose.model('ExchangeRequest', s);

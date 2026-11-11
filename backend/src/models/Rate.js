import mongoose from 'mongoose';
const rateSchema = new mongoose.Schema({
  pair: { type: String, default: 'XOF_NGN' },
  buyRate: { type: Number, required: true },
  sellRate: { type: Number, required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
export default mongoose.model('Rate', rateSchema);

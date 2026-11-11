import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer','admin'], default: 'customer' },
  status: { type: String, enum: ['active','suspended'], default: 'active' },
}, { timestamps: true });
export default mongoose.model('User', userSchema);

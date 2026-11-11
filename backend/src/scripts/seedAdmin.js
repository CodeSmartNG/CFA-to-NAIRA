import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import User from '../src/models/User.js';

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.env.ADMIN_EMAIL || 'admin@cfa-change.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists:', email);
  } else {
    await User.create({
      fullName: 'Administrator',
      email,
      phone: '0000000000',
      passwordHash: await bcrypt.hash(password, 10),
      role: 'admin'
    });
    console.log('Admin created:', email, '/ password:', password);
  }
  await mongoose.disconnect();
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });

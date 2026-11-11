import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  if (await User.findOne({ email })) return res.status(409).json({ message: 'Email taken' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, email, phone, passwordHash });
  res.status(201).json({ token: sign(user._id), user: { id: user._id, fullName, email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (!(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: sign(user._id), user: { id: user._id, fullName: user.fullName, email, role: user.role } });
};

export const me = (req, res) => res.json({ user: req.user });

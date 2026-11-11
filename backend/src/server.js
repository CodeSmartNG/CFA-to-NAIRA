import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import rateRoutes from './routes/rates.js';
import requestRoutes from './routes/requests.js';
import reportRoutes from './routes/reports.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/rates', rateRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`API on ${PORT}`)));

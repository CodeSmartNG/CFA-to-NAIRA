import Rate from '../models/Rate.js';

export const getRate = async (_req, res) => {
  const rate = await Rate.findOne({ pair: 'XOF_NGN' }).sort({ updatedAt: -1 });
  res.json(rate || { buyRate: 0, sellRate: 0 });
};

export const updateRate = async (req, res) => {
  const { buyRate, sellRate } = req.body;
  const rate = await Rate.findOneAndUpdate(
    { pair: 'XOF_NGN' },
    { buyRate, sellRate, updatedBy: req.user._id },
    { upsert: true, new: true }
  );
  res.json(rate);
};

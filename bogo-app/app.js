const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bogo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => console.log('MongoDB connection error:', err));

// Offer Schema
const offerSchema = new mongoose.Schema({
  shop: String,
  name: String,
  type: String,
  buyProductId: String,
  buyQuantity: Number,
  getProductId: String,
  getQuantity: Number,
  status: { type: String, default: 'inactive' },
  impressions: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Offer = mongoose.model('Offer', offerSchema);

// Banner Schema
const bannerSchema = new mongoose.Schema({
  shop: String,
  title: String,
  message: String,
  type: String,
  backgroundColor: String,
  textColor: String,
  ctaText: String,
  ctaLink: String,
  status: { type: String, default: 'inactive' },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Banner = mongoose.model('Banner', bannerSchema);

// Routes - Offers
app.post('/api/offers', async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.json({ success: true, offer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/offers/:shop', async (req, res) => {
  try {
    const offers = await Offer.find({ shop: req.params.shop });
    res.json({ offers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/offers/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, offer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/offers/:id', async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Routes - Banners
app.post('/api/banners', async (req, res) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.json({ success: true, banner });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/banners/:shop', async (req, res) => {
  try {
    const banners = await Banner.find({ shop: req.params.shop });
    res.json({ banners });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/banners/:id', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, banner });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/banners/:id', async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/banners/:id/impression', async (req, res) => {
  try {
    await Banner.findByIdAndUpdate(req.params.id, { $inc: { impressions: 1 } });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/banners/:id/click', async (req, res) => {
  try {
    await Banner.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 } });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ BOGO App running on port ${PORT}`);
});

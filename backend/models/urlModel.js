// models/urlModel.js
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visitHistory: [
    {
      TimeNow: { type: String },
    },
  ],
});

export const Url = mongoose.model('Url', urlSchema);
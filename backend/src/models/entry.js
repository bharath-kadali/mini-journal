'use strict';
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

entrySchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Entry', entrySchema);

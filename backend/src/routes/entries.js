'use strict';
const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const mongoose = require('mongoose');
const Entry = require('../models/entry');
const { authMiddleware } = require('../middlewares/auth');

router.use(authMiddleware);

// Create entry
router.post(
  '/',
  [body('date').isISO8601(), body('content').isString().isLength({ min: 1 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { date, content } = req.body;
      const entry = await Entry.create({ userId: req.user.id, date: new Date(date), content });
      res.status(201).json({ id: entry._id.toString(), date: entry.date.toISOString().split('T')[0], content: entry.content });
    } catch (err) {
      next(err);
    }
  }
);

// Get all entries
router.get('/', async (req, res, next) => {
  try {
    const entries = await Entry.find({ userId: req.user.id })
      .sort({ date: -1, createdAt: -1 })
      .lean();
    const out = entries.map((e) => ({ id: e._id.toString(), date: e.date.toISOString().split('T')[0], content: e.content }));
    res.json(out);
  } catch (err) {
    next(err);
  }
});

// Update entry
router.patch(
  '/:id',
  [param('id').custom((v) => mongoose.Types.ObjectId.isValid(v)), body('content').isString().isLength({ min: 1 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { id } = req.params;
      const entry = await Entry.findOne({ _id: id, userId: req.user.id });
      if (!entry) return res.status(404).json({ error: 'Entry not found' });

      entry.content = req.body.content;
      await entry.save();
      res.json({ id: entry._id.toString(), date: entry.date.toISOString().split('T')[0], content: entry.content });
    } catch (err) {
      next(err);
    }
  }
);

// Delete entry
router.delete('/:id', [param('id').custom((v) => mongoose.Types.ObjectId.isValid(v))], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const entry = await Entry.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

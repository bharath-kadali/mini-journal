"use strict";
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Register
router.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing)
        return res.status(409).json({ error: "Email already registered" });

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  }
);

// Login
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

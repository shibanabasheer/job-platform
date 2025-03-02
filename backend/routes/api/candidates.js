const express = require('express');
const router = express.Router();
const Candidate = require('../../models/Candidate');

// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ msg: 'Unauthorized' });
}

// Get all candidates (for company view)
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get profile for logged in candidate
router.get('/me', ensureAuthenticated, async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ linkedinId: req.user.linkedinId });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile for logged in candidate
router.post('/update', ensureAuthenticated, async (req, res) => {
  try {
    const { skills, experience, location, preferredRoles } = req.body;
    let candidate = await Candidate.findOne({ linkedinId: req.user.linkedinId });
    if (candidate) {
      candidate.skills = skills || candidate.skills;
      candidate.experience = experience || candidate.experience;
      candidate.location = location || candidate.location;
      candidate.preferredRoles = preferredRoles || candidate.preferredRoles;
      await candidate.save();
      res.json(candidate);
    } else {
      res.status(404).json({ error: 'Candidate not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

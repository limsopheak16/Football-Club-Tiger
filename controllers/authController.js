const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ msg: 'Password must be at least 8 characters long.' });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ msg: 'Email is already registered.' });
    }
    // Create and save the new user
    user = new User({ 
      username, 
      email, 
      password, 
      role: role || 'user',
    });

    await user.save();
    res.status(201).json({
      msg: 'User registered successfully.',
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid email or password.' });
    }
    const payload = { user: { id: user.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      msg: 'Login successful',
      user:{
        id:user.id,
        username:user.username,
        email:user.email,
        role:user.role,
      },
      token: token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
module.exports = {registerUser,loginUser};
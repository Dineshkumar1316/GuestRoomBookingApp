// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using connection string from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))  // Log connection success
  .catch(err => console.error('MongoDB connection error:', err));  // Log any errors

// Register endpoint
app.post('/api/reg', async (req, res) => {
  const { name, email, password, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const collection = mongoose.connection.db.collection('users');

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const result = await collection.insertOne({ name, email, password, userType });
    res.json({ message: 'Registration successful', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Signin endpoint
app.post('/api/sin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const collection = mongoose.connection.db.collection('users');

    const user = await collection.findOne({ email });

    if (user && user.password === password) {
      res.json({ message: 'Sign-in successful', isUser: user.userType === 'user' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Sign-in failed' });
  }
});

// Dashboard details endpoint
app.get('/api/userdata', async (req, res) => {
  const email = req.query.email;  // Changed to req.query for better practice

  try {
    const collection = mongoose.connection.db.collection('users');

    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      name: user.name,
      number: user.number || 'Not Provided',  // Default value if number is not present
      email: user.email,
    };

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

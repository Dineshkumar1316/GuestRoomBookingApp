// Backend server
const express = require('express');
const app = express();
const port = 3001;
const { MongoClient } = require('mongodb');
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Register details
app.post('/api/reg', async (req, res) => {
  const { name, email, password, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const uri = 'mongodb://localhost:27017/myapp';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('bookingdatas');
    const collection = database.collection('users');

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const result = await collection.insertOne({ name, email, password, userType });
    res.json({ message: 'Registration successful', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Registration failed' });
  } finally {
    await client.close();
  }
});

// Signin
app.post('/api/sin', async (req, res) => {
  const { email, password } = req.body;
  const uri = 'mongodb://localhost:27017/myapp';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('bookingdatas');
    const collection = database.collection('users');

    const user = await collection.findOne({ email });

    if (user && user.password === password) {
      res.json({ message: 'Sign-in successful', isUser: user.userType === 'user' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Sign-in failed' });
  } finally {
    await client.close();
  }
});

// Dashboard details
app.get('/api/userdata', async (req, res) => {
  const { email } = req.query;
  const uri = 'mongodb://localhost:27017/myapp';
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('bookingdatas');
    const collection = database.collection('users');

    const user = await collection.findOne({ email });
    console.log(user);
    const userData = {
      name: user.name,
      number: user.number,
      email: user.email,
    };
    res.send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
});

// Port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

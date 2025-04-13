require('dotenv').config();
const mongoose = require('mongoose');
const Poem = require('./models/Poem');
const poems = require('./poems');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing poems
    await Poem.deleteMany({});
    console.log('Cleared existing poems');

    // Insert new poems
    await Poem.insertMany(poems);
    console.log('Seeded poems successfully');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 
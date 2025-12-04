const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected for Seeding'));

const seedDB = async () => {
  await Post.deleteMany({});
  await User.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const user = await User.create({
    username: 'demoUser',
    email: 'demo@example.com',
    password: hashedPassword
  });

  const posts = [
    {
      title: 'The Future of AI',
      content: 'Artificial Intelligence is transforming the world rapidly. From coding assistants to autonomous driving, the landscape is shifting...',
      imageURL: 'https://via.placeholder.com/600',
      username: user.username,
      authorId: user._id
    },
    {
      title: 'Full Stack Development Guide',
      content: 'Learning the MERN stack is a great way to start your journey into web development. MongoDB, Express, React, and Node form a powerful quartet...',
      imageURL: 'https://via.placeholder.com/600',
      username: user.username,
      authorId: user._id
    }
  ];

  await Post.insertMany(posts);
  console.log('Database Seeded!');
  process.exit();
};

seedDB();
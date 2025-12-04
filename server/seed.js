const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Post = require('./models/Post');

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Seeding'))
  .catch(err => {
    console.error('❌ DB Connection Error:', err);
    process.exit(1);
  });

const seedDB = async () => {
  try {
    // 3. Clear existing data
    await Post.deleteMany({});
    await User.deleteMany({});

    // 4. Create a Demo User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // const user = await User.create({
    //   username: 'DemoUser',
    //   email: 'demo@example.com',
    //   password: hashedPassword
    // });
    // console.log('Created User: demo@example.com / password123');

    const imageURLs = [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1483794344563-d27a8d18014e",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
    ];

    // 5. Titles, intros, reflections
    const titles = [
      'Morning coffee thoughts',
      'Why slow walks clear my head',
      'What I learned from failing fast',
      'Building habits without burning out',
      'A quiet tribute to underrated tools',
      'Notes from a rainy Tuesday',
      'Tiny wins that felt enormous',
      'The playlist that kept me writing',
      'Lessons from deleting a side project',
      'On choosing progress over perfection',
    ];

    const openings = [
      'Today felt like a reminder that momentum is rarely loud.',
      'I started the day convinced I was behind, and ended it feeling oddly proud.',
      'Somewhere between coffee refills and code reviews, this thought stuck with me.',
      'I promised myself I would jot this down before the feeling fades.',
      'It might sound simple, but this moment changed how I showed up today.',
    ];

    const reflections = [
      'Maybe the best ideas don’t show up when we chase them, but when we make space.',
      'I’m learning that consistency looks a lot like kindness to your future self.',
      'The real progress was giving myself permission to enjoy the work.',
      'Sharing this feels vulnerable, but I think that’s the point of a public journal.',
      'If any of this resonates, consider it proof that we’re figuring it out together.',
    ];

    // 6. Create 20 posts
    const posts = [];
    for (let i = 1; i <= 20; i++) {

      const title = `${titles[i % titles.length]} #${i}`;
      const intro = openings[i % openings.length];
      const outro = reflections[i % reflections.length];

      const body =
        `${intro} I scribbled a few lines in my notebook and felt the knot in my chest loosen. ` +
        `There was nothing groundbreaking about the task I finished, but finishing it reminded me why I started this project in the first place. ` +
        `I talked with a friend about it later and we laughed about how dramatic we can be when we’re tired. ${outro}`;

      posts.push({
        title,
        content: body,
        imageURL: imageURLs[i - 1], // ← Updated image here
        username: user.username,
        authorId: user._id,
      });
    }

    await Post.insertMany(posts);
    console.log(`Created ${posts.length} posts successfully.`);

    console.log('Seeding Complete!');
    process.exit();

  } catch (err) {
    console.error('❌ Seeding Failed:', err);
    process.exit(1);
  }
};

seedDB();

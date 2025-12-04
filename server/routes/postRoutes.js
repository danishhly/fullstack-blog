const router = require('express').Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth');

//create 
router.post('/', verifyToken, async(req, res) => {
    try {
        const { title, imageURL, content } = req.body;
        // simple validation
        if (title.length < 5 || title.length > 120) return res.status(400).json({ message: " title must be 5 - 120 chars"});
        if (content.lenght < 50 ) return res.status(400).json({message: "content must be atleast 50 chars"});

        const newPost = new Post({
            title,
            imageURL,
            content,
            username: req.user.username,
            authorId: req.user.id
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read All with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  try {
    // Build search filter
    const query = search 
      ? { title: { $regex: search, $options: 'i' } } 
      : {};

    // Fetch posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    // Count total matching posts
    const count = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// readOne

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(400).json({ message: "Post not found"});
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Deletee

router.delete('/:id', verifyToken, async (req, res) => {
  console.log("POST ID:", req.params.id);
  console.log("USER ID:", req.user.id);
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: "Post not found" });

        if (post.authorId.toString() !== req.user.id) {
            return res.status(403).json({message: "You can only delte your own post"});
        }
        await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Protected
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own posts" });
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
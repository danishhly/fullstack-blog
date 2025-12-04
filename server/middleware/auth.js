const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log("Token received:", token);
    console.log("JWT_SECRET used for verify:", process.env.JWT_SECRET);

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = verified;
        next();
    } catch (err) {
        console.log("JWT VERIFY ERROR:", err.message);
        return res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyToken;

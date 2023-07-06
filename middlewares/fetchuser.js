const jwt = require('jsonwebtoken');
const JWT_SECRET = 'shhhhh';
const fetchuser = (req, res, next) => {
    
    // Getting the value of token using request Headers
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please authenticate using valid token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using valid token' })
    }
}

module.exports = fetchuser;
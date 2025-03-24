const jwt = require('jsonwebtoken');
const { login } = require('../controllers/authcontroller');

const userLogedin = async (req, res, next) => {

    const {token} = req.cookies;
    console.log(token);

    if (!token) {
        return res.redirect("/auth/loginnow");
    }
    
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.id){
            req.body.userID = decoded.id;
        }
        else {
            return res.redirect("/auth/loginnow");
        }
        
        next();

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
    
};


module.exports = userLogedin;
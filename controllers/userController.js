const UserModel = require('../models/user');

const getData = async (req, res) => {

    try {
        
        let {userID} = req.body;

        const user = await UserModel.findOne({_id: userID});

        if (!user){
            return res.json({success: false, message: "User not found."});
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
};


module.exports = getData;
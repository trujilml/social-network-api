const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    getUserById
}
module.exports = userController;
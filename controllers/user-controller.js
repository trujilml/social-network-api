const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    createUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(updatedUser => {
            if (!updatedUser) {
                res.sendStatus(404).json({ message: "No user found!"});
                return;
            }
            res.json(updatedUser);
        })
        .catch(err => res.json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).json({ message: 'No user found!'});
                return;
            }
            res.json(deletedUser);
        })
        .catch(err => res.json(err));
    },

    //add a friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: "No friend found!"});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
    },

    //remove a friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: { friends: params.friendId }},
            { new: true }
        )
        .then(userData => res.json(userData))
        .catch(err => res.json(err));
    }

};


module.exports = userController;
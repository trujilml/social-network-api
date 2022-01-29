const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: {thoughts: _id }},
                { new: true }
            );
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found by this username!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            { new: true, runValidators: true}
        )
        .then(updatedThought => {
            if (!updatedThought) {
                res.status(404).json({ message: 'No thought was found!'});
            }
            res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                res.status(404).json({ message: 'No thought was found!'});
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
},

//add Reaction to thought 
addReaction ({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        {$push: { reactions: body } },
        { new: true, runValidators: true }
    )
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found! '});
            return;
        }
        res.json(thoughtData)
    })
    .catch(err => res.json(err));
},

//remove Reaction from thought
removeReaction({params}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        {$pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
    .then(thoughtData => res.json(thoughtData))
    .catch(err => res.json(err));
}
};


module.exports = thoughtController;
const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    item : {
        type: ObjectID,
        required: true,
        ref: 'Item'
    },
    owner : {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    },
    {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
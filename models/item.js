const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const itemSchema = new mongoose.Schema({
    owner : {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: [{
       type: String,
       required: true,
     }],
     tags: [{
        type: String,
        required: true,
      }],
     
    reviews: [{
        reviewId: {
            type: ObjectID,
            ref: 'Review'
        },
        // name: String,
        // description: {
        //     type: String,
        // },
        // stars: Number
    }], 
    },
    {
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
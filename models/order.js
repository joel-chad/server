const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    owner : {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'IN PROCESSING'
    },
    delivery_time:{
       type: Number,
       default: 48 
    },
    items: [{
        itemId: {
            type: ObjectID,
            ref: 'Item',
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
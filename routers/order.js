const express = require("express")
const Order = require("../models/order")
const Cart = require("../models/cart")
const User = require("../models/user")
const Auth = require("../middleware/auth")


const router = new express.Router()



//get orders
router.get('/orders/all', Auth, async (req, res) => { 
    const owner = req.user._id;
    try {
        const order = await Order.find().sort({ date: -1 });
        if(order) {
            return res.status(200).send(order)
        }
        res.status(404).send('No orders found')
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/orders', Auth, async (req, res) => {
    const owner = req.user._id;
    try {
        const order = await Order.find({ owner: owner }).sort({ date: -1 });
        if(order) {
            return res.status(200).send(order)
        }
        res.status(404).send('No orders found')
    } catch (error) {
        res.status(500).send()
    }
})

//checkout
router.post('/order/checkout', Auth, async(req, res) => {
    try {
        const owner = req.user._id;
        

        //find cart and user 
        let cart = await Cart.findOne({owner})
        let user = req.user
        if(cart) {
        payload = { amount: cart.bill, email: user.email}
            const order = await Order.create({
                owner,
                items: cart.items,
                bill: cart.bill
                })
                    //delete cart
            const data = await Cart.findByIdAndDelete({_id: cart.id})
            return res.status(201).send({status: 'Checkout Successful', order})

           // console.log(response)

        } else {
            res.status(400).send('No cart found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('invalid request')
        
    }
})

//update an item

router.patch('/order/:id', Auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['delivery_time', 'status']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try {
        const order = await Order.findOne({ _id: req.params.id})
    
        if(!order){
            return res.status(404).send()
        }

        updates.forEach((update) => order[update] = req.body[update])
        await order.save()
        res.send(order)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/orders/count', Auth, async(req, res)=>{
    try{
        const count = await Order.count({
            status: 'PAID'
        })
        res.send(count)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router

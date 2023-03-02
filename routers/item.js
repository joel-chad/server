const express = require('express')
const Item = require('../models/item')
const Auth = require('../middleware/auth')
const multerInstance = require('../config/multer')

const router = new express.Router()

//fetch all items
router.get('/items', async(req, res) => {
  
    // if(req.query.user == 1) {
    //     try {
    //        const items = await Item.find({ owner: req.user._id})
    //         res.status(200).send(items)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).send('something went wrong')
    //     }
    // } else {
    try {
        const items = await Item.find({})
        res.status(200).send(items)
    } catch (error) {
        res.status(400).send(error)
    }
// }
})

//fetch an item
router.get('/items/:id', async(req, res) => {
    try{
        const item = await Item.findOne({_id: req.params.id})
        if(!item) {
            res.status(404).send({error: "Item not found"})
        }
        res.status(200).send(item) 
    } catch (error) {
        res.status(400).send(error)
    }
})

//create an item
// router.post('/items',Auth, multerInstance.upload.any('image'), async(req, res, next) => {
//     try {
//         const newItem = new Item({
//             ...req.body,
//             owner: req.user._id,
//             image: req.files
//         })
//         // await newItem.save()
//         // res.status(201).send(newItem)
//         console.log(newItem)
//     } catch (error) {
//         console.log({error})
//         res.status(400).send({message: "error"})
//     }
// })

// uploading multiple images together
router.post("/items", Auth, multerInstance.upload.array("image", 4),async (req, res) =>{
    try {

        const urlArray = []
        for(i=0; i<req.files.length;i++){
            urlArray.push(req.files[i].path)
        }

        const newItem = new Item({
            ...req.body,
            owner: req.user._id,
            image: urlArray
        })
        console.log(newItem)
        await newItem.save()
        res.status(201).send(newItem)
    //   res.send(req.files);
    } catch (error) {
      console.log(error);
      res.send(400);
    }
  });

//update an item

router.patch('/items/:id', Auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try {
        const item = await Item.findOne({ _id: req.params.id})
    
        if(!item){
            return res.status(404).send()
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete item
router.delete('/items/:id', Auth, async(req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete( {_id: req.params.id} )
        if(!deletedItem) {
            res.status(404).send({error: "Item not found"})
        }
        res.send(deletedItem)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router
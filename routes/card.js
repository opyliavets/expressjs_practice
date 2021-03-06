const {Router} = require('express')
const Card = require('../models/card')
const Course = require('../models/course')
const router = Router()

router.post('/add', async (req, res)=>{
    const courses = await Course.getById(req.body.id)
    await Card.add(courses)
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) =>{
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})

router.get('/',async (req, res)=>{
    const card = await Card.fetch()
    res.render('card', {
        title: 'Basket', 
        isCard:true,
        courses: card.courses,
        price: card.price
    })
})

module.exports = router
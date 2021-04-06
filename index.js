const express = require('express')
const path = require('path')
const Handlebars = require('handlebars')
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const cardRoutes = require('./routes/card')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const app = express()

const hbs = expressHandlebars.create({ //створення движка hbs та указання на його розширення
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))// реєстрація движка hbs
app.set('view engine', 'handlebars') // конфігурація для його використання
app.set('views', 'views',) 

app.use(express.static(path.join(__dirname, 'public'))) //реєстрація папки  public як статичної, для доступу до неї express js
app.use(express.urlencoded({extended:true}))

app.use('/',homeRoutes) //використання роутингу для відповідної сторінки
app.use('/add',addRoutes) //використання роутингу для відповідної сторінки
app.use('/courses', coursesRoutes) //використання роутингу для відповідної сторінки
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start(){
    try{
        const urlMongoDB = 'mongodb+srv://oleksandr:zsWBLK3x5azgtyg@cluster0.vmgmq.mongodb.net/shop'
        await mongoose.connect(urlMongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    }catch(e){
        console.log(e);
    } 
}

start()

// passwordMDB = 'zsWBLK3x5azgtyg'
// ipadress = '79.110.132.118'
// urlmongo = 'mongodb+srv://oleksandr:zsWBLK3x5azgtyg@cluster0.vmgmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


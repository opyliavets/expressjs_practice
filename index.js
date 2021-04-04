const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const cardRoutes = require('./routes/card')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const app = express()

const hbs = exphbs.create({ //створення движка hbs та указання на його розширення
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) // реєстрація движка hbs
app.set('view engine', 'hbs') // конфігурація для його використання
app.set('views', 'views',) 

app.use(express.static(path.join(__dirname, 'public'))) //реєстрація папки  public як статичної, для доступу до неї express js
app.use(express.urlencoded({extended:true}))

app.use('/',homeRoutes) //використання роутингу для відповідної сторінки
app.use('/add',addRoutes) //використання роутингу для відповідної сторінки
app.use('/courses', coursesRoutes) //використання роутингу для відповідної сторінки
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
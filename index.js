const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({ //створення движка hbs та указання на його розширення
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) // реєстрація движка hbs
app.set('view engine', 'hbs') // конфігурація для його використання
app.set('views', 'views',) 

app.use(express.static('public')) //реєстрація папки  public як статичної, для доступу до неї express js

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
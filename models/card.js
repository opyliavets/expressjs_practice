const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(require.main.filename), //require.main замість модуля mainModule
    'data',
    'card.json'    
)

class Card{
    static async add(course){
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c=> c.id === course.id)
        const candidate = card.courses[idx]

        if(candidate){
            candidate.count++
            card.courses[idx] = candidate
        } else {
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((resolve, reject)=>{
            fs.writeFile(p, JSON.stringify(card), err =>{
                if(err){
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async remove(id){
        const card = await Card.fetch()                             //TODO: в даному методі є баг
                                                                   //повязаний з тим, що при повторному
        const idx = card.courses.findIndex(c => c.id === id)    //виконанні видалення, не знаходиться
        const course = card.courses[idx]                            //course. Але воно працює, якщо перезавантажити сторінку
        console.log(course);

        if(course.count === 1){
            card.courses = card.courses.filter(c => c.id !== id)
        } else {
            card.courses[idx].count--
        }

        card.price -= course.price

        return new Promise((resolve, reject)=>{
            fs.writeFile(p, JSON.stringify(card), err =>{
                if(err){
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }

    static async fetch(){
        return new Promise((resolve, reject)=>{
            fs.readFile(p, 'utf-8', (err, content)=>{
                if(err){
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card
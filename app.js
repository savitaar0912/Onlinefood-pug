const express = require('express')
const { urlencoded } = require('express')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/Sing", { useNewUrlParser: true })
const path = require('path')
const app = express()

// USE 
app.use('/static', express.static('static'))
app.use(urlencoded())

// SET 
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'template'))

// SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    mail: String,
    phone: String,
    msg: String
})

// MODEL
const Contact = new mongoose.model('Contact', contactSchema)

app.get('/', (req, res) => {
    res.status(200).render('home.pug')
})

app.get('/client', (req, res) => {
    res.status(200).render('client.pug')
})

app.get('/services', (req, res) => {
    res.status(200).render('services.pug')
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
})

app.post('/contact', (req, res) => {
    console.log(req.body);
    // name = req.body.name
    // mail = req.body.mail
    // phone = req.body.phone
    // const para = {'msg' : `Hi ${name}. Form filled successfully`}
    // res.status(200).render('contact.pug' , para)
    var data = new Contact(req.body)
    data.save().then(() => {
        res.send('The item is send to db')
        // res.status(200).render('contact.pug' , para)
    }).catch(() => {
        res.status(400).end(`The data hasn't been sent`)
    })
})

app.get('', (req, res) => {
    res.status(404).send('<b>404 Error</b>')
})

app.listen(80, () => {
    console.log(`The app has started at "http://127.0.0.1"`);
})
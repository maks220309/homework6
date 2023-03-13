const fs = require('fs')
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const server = express()
server.set('views', './pages');
server.set('view engine', 'ejs');
const PORT = 3000
const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.ejs`)
server.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})
server.use(express.static('./pages/style'))
server.get('/', (req, res) => {
    fs.readFile('arr.json', (err, data)=>{
        data = JSON.parse(data)
        res.render(createPath('index'), { data })
    })
})
server.get('/index', (req, res) => {
    fs.readFile('arr.json', (err, data)=>{
        data = JSON.parse(data)
        res.render(createPath('index'), { data })
    })
})
server.get('/page1', (req, res) => {
    res.render(createPath('page1'))
})
server.get('/page2', (req, res) => {
    res.render(createPath('page2'))
})
server.get('/page', (req, res) => {
    res.redirect('/index')
})
server.get('/page3', (req, res) => {
    res.redirect('/page2')
})
server.use((req, res) => {
    res.status(404).render(createPath('error'))
})
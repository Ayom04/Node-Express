const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const data = require('./data')
const PORT = 1432


app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        message: "welcome to my api"
    })
})
app.post('/user/login', (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(200).json({
            message: "Invalid credentials"
        })
    }
    const checkUser= data.find(data => data.email === email && data.password === password)
    if(!checkUser){
        res.status(200).json({
            message: "Invalid credentials"
        })
    }
    res.status(200).json({
        message: "Login successful",
        data: checkUser
    })
})
app.get('/user/id/:email',(req,res)=>{
    const {email} = req.params
    res.status(200).json({
        data: email
    })
})
app.post('/user/signup',(req,res)=>{
    const {name,email,password, age} = req.body
    if(!name ||!email ||!password ||!age){
        res.status(200).json({
            message: "Invalid credentials"
        })
    }
    const tempData = {
        id: data.length++,
        name,
        email,
        password,
        age
    }
    
    

    data.push(tempData)
    res.json({
        message: "Signup successful",
        data
    })
})
app.get('/users', (req, res) => {
    res.status(200).json({
        data: data
    })
})
app.listen(PORT, (req, res)=> {
    console.log(`listening on port ${PORT}`)
})

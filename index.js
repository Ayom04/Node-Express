const express = require("express")
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())

const PORT = 4589;
const data = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
        address: "7 Agunbiade street, Jakarta",
        phone: "08123456789",
        
    },
    {
        id: 2,
        name: "Ayodeji Ayorinde",
        email: "ayokele@gmail.com",
        address: "11, Wonuola street, Akoka",
        phone: "09123456789",
        
    }
]
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to my API"
    })
})
app.post("/", (req, res) =>{
    res.json({
        status: "success",
        message: "logging in!"
    })
})
app.get("/users", (req, res) =>{
    res.json({
        status: "success",
        meesage: "logged in",
        data: data
    })
})
app.post("/user/add", (req, res) =>{
    
    const {name, email, address, phone} = req.body
    if (!name || !email || !phone || !address || email.indexOf("@") === -1){
        res.json({
            status: "fail",
            message: "All field are required"
        })
    }
    const tempData = {
        id: data.length + 1,
        name,
        email,
        address,
        phone,

    }
    data.push(tempData)
    res.json({
        status: 'success',
        message: "Data created successfully"
    })
})
app.put('/user/update', (req,res)=>{
    const {id, name, email, address, phone} = req.body
    if (!id ||!name ||!email ||!phone ||!address || email.indexOf("@") === -1){
        res.json({
                    status: "fail",
                    message: "All field are required"
                })
    }
    const filteredData = data.filter(item => item.id === id)

    filteredData[0].name = name
    filteredData[0].phone = phone
    filteredData[0].email = email
    filteredData[0].address = address
    res.json({
        status:'success',
        message: "Data updated successfully",
        data
    })
})
app.delete("/user/delete", (req,res) =>{
    const {id} = req.body
    if (!id) {
        res.json({
            status: "fail",
            message: "id is  required"
        })
    }
    data.forEach(item => {
        if (item.id === id) {
            data.splice(id, 1)
        }

        })
})
app.get("/user/profile/:email", (req,res)=> {
    const {email} = req.params
    if(!email || email.indexOf('@') === -1) {
        res.json({
            status: "fail",
            message: "email is required"
        })
    }
    res.json({
        statusbar: "success",
        message: email
    })
})
app.get('/user/saving/',(req,res)=>{
    const {token} = req.query
    if(!token) {
        res.json({
            status: "fail",
            message: "token is required"
        })
    }
    res.json({
        statusbar: "success",
        message: token
    })
})
app.listen(PORT, (req,res)=>{
    console.log(`Example app listening on port ${PORT}`)
})

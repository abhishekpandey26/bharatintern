const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const templatePath = path.join(__dirname, '../templates')
const collection = require("./mongodb")
const { executionAsyncResource } = require("async_hooks")

app.use(express.json())
app.set("view engine", "hbs")
// by setting the view engine to hbs ... Express uses handlebars to render the views 
app.set("views", templatePath)
// this code is telling Express to use the "templates" directory as the location for views when rendering templates. 
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))   //this line of code is used to link handlebars with CSS

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})
//responds and renders the signup and the login which is requested by the user 

app.post("/signup", async (req, res) => {
    const data={
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data])

    res.render("login")

})
// this line of code is used to insert the data entered by the user to the mongodb database

app.post("/login", async (req, res) => {
    
   try {
    const check = await collection.findOne({name:req.body.name})
    if(check.password===req.body.password){
        res.render("home")
    }
    else{
        res.send("wrong password")
    }
    

   }
   catch {
    res.send("wrong details")

   }

})

// this above line of code is used to confirm the username and password from the mongodb database

app.listen(3000, () => {
    console.log("server is running ")
})

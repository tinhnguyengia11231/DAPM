const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const Category = require('./scr/models/Category.model')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const allowedOrigins = ["http://localhost:5001"];
dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    })
);

app.use(express.static("public"));

app.post("/",async (req,res)=>{
    const {name} = req.body
    if(!name){
        return res.json({message:"Input required"})
    }

    const newCate = new Category({
        name:name
    })

    newCate.save()
    .then(()=>{
        return res.json({message: "Add successful"})
    })
    .catch((err)=>{
        console.log(err)
        return res.json({message: "Error"})
    })

})

mongoose.connect(
   process.env.StringUrlMongo)
    .then(() => {
        console.log("Connect date successfully")
    })
    .catch((err) => console.log(err))


app.listen(PORT, () => {
    console.log("Server listening to Port", PORT)
})
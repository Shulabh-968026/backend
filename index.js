
const express = require("express");
const app = express();
const path = require("path")
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"})
const PORT = process.env.PORT || 6000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require("cors")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

const userRouter = require("./router/userRouter");
app.use("/admin/v1/user",userRouter)

app.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, 'client','build', 'index.html'));
});
app.all("*",(req,res)=>{
    res.status(404).send(`${req.url} not found!!`)
})
mongoose.connect("mongodb+srv://arpit:U-B5cEbh$w.6C27@cluster0.49lwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port ${PORT}`)
    })
}).catch((err)=>{
    console.log('something is went wrong',err)
})



const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://mithlesh:1234@cluster0.tnbojkw.mongodb.net/asss")
.then(()=>{
    console.log("connected with database");
}).catch(()=>{
    console.log("failed to connect with database");
})
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app = require('./index');
const port = 3000;
let DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.log("Mongo connected")}).catch((err)=>{
    console.error(err);
});
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
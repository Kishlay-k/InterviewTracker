const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 4000;

dotenv.config({
    path: './config.env'
});

const DB = process.env.DB.replace('<password>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch(e => {
      console.log(e);
  })
app.listen(port, () =>{
    console.log("Hello from the server side...");
});
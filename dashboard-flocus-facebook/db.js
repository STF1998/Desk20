const mongoose = require('mongoose');
const dotenv= require('dotenv').config();

console.log(process.env.MONGO_HOSTNAME);

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};


const url = "mongodb+srv://flocusdev:desk20@flocusdb.m6xvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const url = process.env.MONGO_URI;

mongoose.connect(url, options).then(function () {
  console.log('MongoDB is connected');
})
  .catch(function (err) {
    console.log(err);
  });
  
  

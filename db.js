const mongoose = require('mongoose')
const mongonewURI  = 'mongodb://127.0.0.1:27017/mongonewURI?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6'


const connectToMongo = () =>{
    mongoose.connect(mongonewURI).then( () =>
        console.log("Connected   to mongo successfully")).
        catch((e) =>console.log(e.message) 

    )
}
module.exports = connectToMongo
// const mongoURI = "mongodb://127.0.0.1:27017/mongoURI?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6"

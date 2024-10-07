const mongoose = require('mongoose');

const makeConnection = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_IP);
        console.log("Connection to mongoDB successful");    
    } catch (error) {
        console.log("Failed to connect to db",error.message);
        process.exit(1);
    }
}

module.exports = makeConnection;
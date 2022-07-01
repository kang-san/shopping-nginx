const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
    path : "../.env.server"
});

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;

const connectToDB = async () => {
    const connect = await mongoose.connect(`mongodb://${process.env.DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${process.env.DB_HOST}`);
};

module.exports = connectToDB;
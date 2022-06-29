const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(
    {
    path : "../.env.sever"
});

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;

const connectToDB = async () => {
    const connect = await mongoose
        .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(e => console.error(e));
    console.log(`MongoDB Connected :  ${DB_Host}`);
}
module.exports = connectToDB;
const express = require('express');
const connectToDB = require("./database/db.js");
const userRouter = require("./routers/userRouter.js");
const productRouter = require("./routers/productRouter.js");
const orderRouter = require("./routers/orderRouter.js");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
    path : ".env.server"
});


const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CORS 미들웨어 설정
const corsOptions  = {
    origin: process.env.CLIENT_ORIGEN || "http://172.31.7.190:3000"
};

console.log("CLIENT_ORIGIN     " + process.env.CLIENT_ORIGIN)

app.use(cors(corsOptions));

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;

console.log("DB_USER     " + DB_USER)
console.log("DB_password     " + DB_PASSWORD)

connectToDB();

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

const PORT = process.env.NODE_DOCKER_PORT || 5000;
console.log("NODE_DOCKER_PORT     " + process.env.NODE_DOCKER_PORT)

app.listen(PORT, () =>{
    console.log(`Server at http://172.31.7.190:${PORT}`);
});

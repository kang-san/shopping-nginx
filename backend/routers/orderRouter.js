const express = require('express');
const isAuth = require("../utils.js");
const {orderInfoCtrl, orderListCtrl, orderDetailCtrl}
= require("../controllers/orderCtrl.js")

const orderRouter = express.Router();

orderRouter.get('/mine', orderInfoCtrl);

orderRouter.post('/', orderListCtrl);

orderRouter.get('/:id', orderDetailCtrl);


module.exports = orderRouter;
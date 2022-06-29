const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');
const isAuth = require("../utils.js");

const orderCtrl = express.Router();

const orderInfoCtrl = expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({user: req.user._id});
        res.send(orders);
    }
)

const orderListCtrl = expressAsyncHandler(async (req, res) => {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res .status(201)
            .send({ message: 'New Order Created', order: createdOrder });
    }
);

const orderDetailCtrl = expressAsyncHandler(async (req, res) => {
        console.log(req.params.id);
        const order = await Order.findById(req.params.id)
        console.log(order);
        if(order) {
            res.send(order)
        }else{
            res.status(404).send({message: 'Order Not Found'})
        }
    }
);


module.exports = {orderInfoCtrl, orderListCtrl, orderDetailCtrl};
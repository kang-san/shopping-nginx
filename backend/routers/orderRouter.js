const express = require('express');
const {orderSellerFilterCtrl, orderSummeryCtrl, orderInfoCtrl, orderListCtrl, orderDetailCtrl, orderPayCtrl, orderDeleteCtrl, orderDeliverCtrl}
= require("../controllers/orderCtrl.js")
const {
    isAdmin,
    isAuth,
    isSellerOrAdmin,
    mailgun,
    payOrderEmailTemplate,
} = require('../utils.js') ;

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isSellerOrAdmin, orderSellerFilterCtrl);

orderRouter.get('/summary', isAuth, isAdmin, orderSummeryCtrl);

orderRouter.get('/mine', orderInfoCtrl);

orderRouter.post('/', orderListCtrl);

orderRouter.get('/:id', orderDetailCtrl);

orderRouter.put('/:id/pay', isAuth, orderPayCtrl);

orderRouter.delete('/:id', isAuth, isAdmin, orderDeleteCtrl);

orderRouter.put( '/:id/deliver', isAuth, isAdmin, orderDeliverCtrl);


module.exports = orderRouter;
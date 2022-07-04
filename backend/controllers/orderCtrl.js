const {mailgun, payOrderEmailTemplate} = require("../utils") ;

const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');




const orderSellerFilterCtrl = expressAsyncHandler(async (req, res) => {
        const seller = req.query.seller || '';
        const sellerFilter = seller ? { seller } : {};

        const orders = await Order.find({ ...sellerFilter }).populate(
            'user',
            'name'
        );
        res.send(orders);
    }
);

const orderSummeryCtrl = expressAsyncHandler(async (req, res) => {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ]);
        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);
        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalPrice' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const productCategories = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);
        res.send({ users, orders, dailyOrders, productCategories });
    }
);

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

const orderPayCtrl = expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'email name'
        );
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            const updatedOrder = await order.save();
            try {
                mailgun()
                    .messages()
                    .send(
                        {
                            from: 'Amazona <amazona@mg.yourdomain.com>',
                            to: `${order.user.name} <${order.user.email}>`,
                            subject: `New order ${order._id}`,
                            html: payOrderEmailTemplate(order),
                        },
                        (error, body) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(body);
                            }
                        }
                    );
            } catch (err) {
                console.log(err);
            }

            res.send({ message: 'Order Paid', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    }
);

const orderDeleteCtrl = expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            const deleteOrder = await order.remove();
            res.send({ message: 'Order Deleted', order: deleteOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    }
);

const orderDeliverCtrl = expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.send({ message: 'Order Delivered', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    }
);

module.exports = {orderSellerFilterCtrl, orderSummeryCtrl, orderInfoCtrl, orderListCtrl, orderDetailCtrl, orderPayCtrl, orderDeleteCtrl, orderDeliverCtrl};
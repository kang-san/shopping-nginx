
const express = require('express');
const isAdmin = require("../utils.js");
const isAuth = require("../utils.js");
const  {productAllCtrl, productDummyCtrl, productDetailCtrl, productCreateCtrl, productUpdateCtrl}
= require("../controllers/productCtrl.js");

const productRouter = express.Router();

productRouter.get('/', productAllCtrl);

productRouter.get('/seed', productDummyCtrl);

productRouter.get('/:id', productDetailCtrl);

// productRouter.post('/createproduct', isAuth, isAdmin, productCreateCtrl);

// productRouter.put('/:id', isAuth, isAdmin, productUpdateCtrl);

module.exports = productRouter;

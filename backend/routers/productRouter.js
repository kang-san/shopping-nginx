
const express = require('express');
const { isAdmin, isAuth } = require("../utils.js");
const  {productAllCtrl, productCategoriesCtrl, productDummyCtrl, productDetailCtrl, productCreateCtrl,
    productUpdateCtrl, productDeleteCtrl, productReviewsCtrl}
= require("../controllers/productCtrl.js");

const productRouter = express.Router();

productRouter.get('/', productAllCtrl);

productRouter.get('/categories', productCategoriesCtrl)

productRouter.get('/seed', productDummyCtrl);

productRouter.get('/:id', productDetailCtrl);

productRouter.post('/createproduct', isAuth, isAdmin, productCreateCtrl);

productRouter.put('/:id', isAuth, isAdmin, productUpdateCtrl);

productRouter.delete('/:id', isAuth, isAdmin, productDeleteCtrl);

productRouter.post( '/:id/reviews', isAuth, productReviewsCtrl);


module.exports = productRouter;

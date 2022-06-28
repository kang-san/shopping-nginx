import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import {isAdmin, isAuth} from "../utils.js";

const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {

        const products = await Product.find({});
        console.log("Product 요청받음 " + JSON.stringify(products))

        res.send(products);
    })
);

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
        console.log("seed 시도")
    })
);

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

productRouter.post(
    '/createproduct',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res)=> {
        console.log(".......... 서버"+JSON.stringify(req.body))
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            price: 0,
            category: req.body.category,
            brand: req.body.brand,
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: req.body.description,
        });
        const createdProduct = await product.save();
        res.send({
            _id: createdProduct._id,
            name: createdProduct.name,
            price: createdProduct.price,
            image: createdProduct.image,
            category: createdProduct.category,
            brand: createdProduct.brand,
            countInStock: createdProduct.countInStock,
            description : createdProduct.description,
        });
    })
)

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res)=> {
        const productId = req.params.id;
        console.log(productId);
        const product = await Product.findById(productId);
        if(product){
            // 검색 상품이 있으면 데이터 업데이트
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            // 업데이트된 데이터 저장
            const updatedProduct = await product.save();
            // 프런트로 전성
            res.send({message: 'Product Updated', product: updatedProduct});
        } else {
            res.status(404).send({message: 'Product Not Found'})
        }
    })
)
export default productRouter;

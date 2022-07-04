const expressAsyncHandler = require('express-async-handler');
const data = require('../data.js');
const Product = require('../models/productModel.js');

const productAllCtrl = expressAsyncHandler(async (req, res) => {

        const pageSize = 3;
        const page = Number(req.query.pageNumber) || 1;
        const name = req.query.name || '';
        const category = req.query.category || '';
        const seller = req.query.seller || '';
        const order = req.query.order || '';
        const min =
            req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
        const max =
            req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
        const rating =
            req.query.rating && Number(req.query.rating) !== 0
                ? Number(req.query.rating)
                : 0;

        const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
        const sellerFilter = seller ? { seller } : {};
        const categoryFilter = category ? { category } : {};
        const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
        const ratingFilter = rating ? { rating: { $gte: rating } } : {};
        const sortOrder =
            order === 'lowest'
                ? { price: 1 }
                : order === 'highest'
                ? { price: -1 }
                : order === 'toprated'
                    ? { rating: -1 }
                    : { _id: -1 };
        const count = await Product.count({
            ...sellerFilter,
            ...nameFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        });
        const products = await Product.find({
            ...sellerFilter,
            ...nameFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        })
            .populate('seller', 'seller.name seller.logo')
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        res.send({ products, page, pages: Math.ceil(count / pageSize) });
    }
);

const productCategoriesCtrl = expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories);
    }
);

const productDummyCtrl = expressAsyncHandler(async (req, res) => {
        await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
        console.log("seed 시도")
    }
);

const productDetailCtrl = expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).populate('seller');
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }
);

const productCreateCtrl = expressAsyncHandler(async (req, res)=> {
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
    }
);

const productUpdateCtrl = expressAsyncHandler(async (req, res)=> {
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
    }
);

const productDeleteCtrl = expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            const deleteProduct = await product.remove();
            res.send({ message: 'Product Deleted', product: deleteProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }
);

const productReviewsCtrl = expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            if (product.reviews.find((x) => x.name === req.user.name)) {
                return res
                    .status(400)
                    .send({ message: 'You already submitted a review' });
            }
            const review = {
                name: req.user.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((a, c) => c.rating + a, 0) /
                product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: 'Review Created',
                review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }
);

module.exports = {productAllCtrl, productCategoriesCtrl, productDummyCtrl, productDetailCtrl,
    productCreateCtrl, productUpdateCtrl, productDeleteCtrl, productReviewsCtrl};

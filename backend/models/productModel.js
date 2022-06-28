import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{type: String, required: true, unique: true},
        image:{type: String, required: true},
        brand:{type: String, required: true},
        category:{type: String, required: true},
        description:{type: String, required: true},
        price:{type: Number, required: false},
        countInStock:{type: Number, required: false},
        rating:{type: Number, required: false},
        numReviews:{type: Number, required: false},
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Product', productSchema);
export default Product;

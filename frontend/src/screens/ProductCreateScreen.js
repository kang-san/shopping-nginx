import React, {useEffect, useState} from 'react';
import {createProduct} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useDispatch, useSelector} from "react-redux";

export default function ProductCreateScreen(props){
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/productlist';

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ image, setImage ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState(0);
    const [ brand, setBrand ] = useState('');
    const [ description, setDescription ] = useState('');

    const productCreate = useSelector(state => state.productCreate);
    const { loading, error, product } = productCreate;

    const dispatch = useDispatch();
    useEffect(()=> {
        if(product){
            props.history.push(redirect)
        }
    }, [dispatch, product, props.history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        // 상품생성 action
        dispatch(createProduct({
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }))
    }
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <h1>Create Product </h1>
                { loading ? <LoadingBox></LoadingBox>
                    : error ? <MessageBox variant="danger">{error}</MessageBox>
                        : <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    required
                                    onChange={(e)=> setName(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    required
                                    onChange={(e)=> setPrice(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="image">Image</label>
                                <input
                                    id="image"
                                    type="text"
                                    placeholder="Enter image"
                                    value={image}
                                    required
                                    onChange={(e)=> setImage(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <input
                                    id="category"
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    required
                                    onChange={(e)=> setCategory(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="countInStock">CountInStock</label>
                                <input
                                    id="countInStock"
                                    type="number"
                                    placeholder="Enter countInStock"
                                    value={countInStock}
                                    required
                                    onChange={(e)=> setCountInStock(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="brand">Brand</label>
                                <input
                                    id="brand"
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand}
                                    required
                                    onChange={(e)=> setBrand(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    required
                                    onChange={(e)=> setDescription(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label></label>
                                <button
                                    className="primary"
                                    type="submit"
                                >
                                    Create Product
                                </button>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}

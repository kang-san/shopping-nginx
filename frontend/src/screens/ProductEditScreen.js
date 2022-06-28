import React, {useEffect, useState} from 'react';
import {detailsProduct, updateProduct} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";

export default function ProductEditScreen(props){
    const productId = props.match.params.id;

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ image, setImage ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ description, setDescription ] = useState('');

    const productDetails = useSelector(state=> state.productDetails)
    const { loading, error, product } = productDetails;
    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;
    console.log(`로딩 ${loading} 에러 ${error} `)

    const dispatch = useDispatch();
    useEffect(()=> {
        if(successUpdate){
            props.history.push('/productlist')
            dispatch({type: PRODUCT_UPDATE_RESET});
        }
        // 상품 상세 데이터 가져오기
        console.log(JSON.stringify(product))
        // console.log(`받아온것 ${product._id}  props로 받은것 ${productId}`)
        if(!product || product._id !== productId ||successUpdate){
            console.log("디테일 요청하기")
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [dispatch, product, productId, successUpdate, props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        // 업데이트 product
        dispatch(updateProduct({
            _id: productId,
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
                <h1>Edit Product ${productId}</h1>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
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
                                onChange={(e)=> setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Enter price"
                                value={price}
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
                                onChange={(e)=> setCategory(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="countInStock">CountInStock</label>
                            <input
                                id="countInStock"
                                type="text"
                                placeholder="Enter countInStock"
                                value={countInStock}
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
                                onChange={(e)=> setDescription(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label></label>
                            <button
                                className="primary"
                                type="submit"
                            >
                                Update
                            </button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

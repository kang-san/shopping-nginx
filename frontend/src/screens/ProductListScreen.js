import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

export default function ProductListScreen(props){

    const productList = useSelector(state=> state.productList);
    const { loading, error, products }= productList;

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/productlist';

    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        dispatch(listProducts());
        // console.log("유즈이펙트 들어옴")
    }, [dispatch, successCreate, createdProduct, props.history])

    const deleteHandler =() => {
        //dispatch delete action
    }

    const createHandler = () => {
        // 상품 생성 화면으로 이동
        props.history.push(`/productcreate?redirect=${redirect}`)
    }
    return(
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>
            { loadingCreate && <LoadingBox></LoadingBox>}
            { errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            { loading ? <LoadingBox></LoadingBox>
              : error ? <MessageBox variant="danger">{error}</MessageBox>
              : (
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map((product)=> (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => props.history.push(`/product/${product._id}/edit`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => deleteHandler(product)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}
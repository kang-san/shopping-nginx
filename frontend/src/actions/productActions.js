import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS
} from "../constants/productConstants";
import Axios from "axios";
const ROOT_URL =  'http://172.31.93.123:5000';

Axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('auth_jwt_token')) {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
}
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const listProducts = () => async (dispatch) => {
    dispatch({
       type: PRODUCT_LIST_REQUEST
    });
    try{
        console.log("product List URL ===========>>>>   "+ Axios.defaults.baseURL);
        const { data } = await Axios.get('/api/products')
            .catch((Error)=>{console.log(Error)});
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    }catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message
        })
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    });
    try{
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
        console.log(`~~~~~~~~~~~~~ ${JSON.stringify(data)}`)
    }catch (error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message
        });
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_UPDATE_REQUEST,
        payload: product,
    })
    const {userSignin: {userInfo}} = getState();
    console.log(`액션 : ${userInfo._id}`);
    console.log(JSON.stringify(product))
    try {
        const {data} = await Axios.put(`/api/products/${product._id}`, product, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProduct = (product) => async(dispatch, getState) => {
    dispatch({
        type: PRODUCT_CREATE_REQUEST,
        payload: product,
    })
    const {userSignin: {userInfo}} = getState();
    console.log(product)

    try{
        const { data } = await Axios.post(`/api/products/createproduct`, product, {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
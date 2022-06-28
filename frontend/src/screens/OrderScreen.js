import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {detailsOrder} from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {Link} from "react-router-dom";

export default function OrderScreen(props){
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state)=> state.orderDetails);
    const {loading, error, order} = orderDetails;
    console.log("오더 "+ JSON.stringify(order))

    const dispatch = useDispatch();
    console.log("오더 스크린 들어옴1"+ JSON.stringify(order))
    useEffect(()=>{
        console.log("오더 스크린 유즈이펙트 2===> " + orderId)

        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId])
    return(
        loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
                <div>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
                                            <strong>Address:</strong> {order.shippingAddress.address},
                                            {order.shippingAddress.city}, {'   '}
                                            {order.shippingAddress.postalCode},
                                            {order.shippingAddress.country},
                                        </p>
                                        {order.isDelivered ? (
                                            <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                        ) : (
                                            <MessageBox variant="danger">Not Delivered</MessageBox>
                                        )}
                                    </div>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? (
                                            <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                        ) : (
                                            <MessageBox variant="danger">Not Paid</MessageBox>
                                        )}
                                    </div>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="small"
                                                            ></img>
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div>
                                                            {item.qty}* ${item.price} = ${item.qty* item.price}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Items</div>
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>
                                                <strong>Order Total</strong>
                                            </div>
                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        )

    )
}
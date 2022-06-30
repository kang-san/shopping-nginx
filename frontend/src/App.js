
import React from 'react';

import {BrowserRouter, Link, Route} from "react-router-dom";
import Home from "./screens/Home";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import {useDispatch, useSelector} from "react-redux";
import SignininScreen from "./screens/SignininScreen";
import {signout} from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistroyScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import ProductListScreen from "./screens/ProductListScreen";
import AdminRoute from "./components/AdminRoute";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";


function App() {

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }


      return (
          <BrowserRouter>
              <div className="grid_container">
                  <header className="row">
                      <div>
                          <Link to="/" className="brand">amazona</Link>
                      </div>
                      <div>
                          <Link to="/cart">Cart
                              {cartItems.length > 0 && (
                                  <span className="badge">{cartItems.length}</span>
                              )}
                          </Link>
                          { userInfo ? (
                              <div className="dropdown">
                                  <Link to="#">
                                      {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                  </Link>
                                  <ul className="dropdown-content">
                                      <li>
                                          <Link to="/orderhistory">Order History</Link>
                                      </li>
                                      <li>
                                          <Link to="/profile">Profile</Link>
                                      </li>
                                      <li>
                                          <Link to="#signout" onClick={signoutHandler}>
                                              Sign Out
                                          </Link>
                                      </li>
                                  </ul>
                              </div>
                          ) : (
                              <Link to="/signin">Sign in</Link>
                          )}
                          { userInfo && userInfo.isAdmin && (
                              <div className="dropdown">
                                  <Link to="#admin">
                                      Admin <i className="fa fa-caret-down"></i>
                                  </Link>
                                  <ul className="dropdown-content">
                                      <li>
                                          <Link to="/dashboard">DashBoard</Link>
                                      </li>
                                      <li>
                                          <Link to="/productlist">Products</Link>
                                      </li>
                                      <li>
                                          <Link to="/orderlist">Orders</Link>
                                      </li>
                                      <li>
                                          <Link to="/userlist">Users</Link>
                                      </li>
                                  </ul>
                              </div>
                          )}
                      </div>
                  </header>
                  <main>
                      <Route path="/cart/:id?" component={CartScreen} />
                      <Route path="/product/:id" component={ProductScreen} exact/>
                      <Route path="/product/:id/edit" component={ProductEditScreen} />
                      <Route path={"/productcreate"} component={ProductCreateScreen} />
                      <Route path="/signin" component={SignininScreen}/>
                      <Route path="/register" component={RegisterScreen}/>
                      <Route path="/shipping" component={ShippingAddressScreen}/>
                      <Route path="/payment" component={PaymentMethodScreen}/>
                      <Route path="/placeorder" component={PlaceOrderScreen}/>
                      <Route path="/order/:id" component={OrderScreen}/>
                      {/*<Route path={"/orderhistory"} component={OrderHistroyScreen}/>*/}
                      <PrivateRoute path={"/profile"} component={ProfileScreen}/>
                      <AdminRoute path={"/productlist"} component={ProductListScreen}></AdminRoute>

                      <Route path="/" component={Home} exact/>
                  </main>
                  <footer className="row center">
                      All right reserved SAN
                  </footer>
              </div>
          </BrowserRouter>
      );
}

export default App;

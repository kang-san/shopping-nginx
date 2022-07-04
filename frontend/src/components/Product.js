import React from 'react';
import {Link} from 'react-router-dom';
import RRating from './RRating';

export default function Product(props) {
  const { product } = props;

  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <RRating
          RRating={product.RRating}
          numReviews={product.numReviews}
        ></RRating>
        <div className="row">
          <div className="price">${product.price}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

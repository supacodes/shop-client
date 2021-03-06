import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ICartProduct } from '../../interfaces/cart-interfaces';
import CartContext from '../../context/cart/cartContext';

const CartItem: React.FC<{
  product: ICartProduct;
}> = ({ product }) => {
  const { addCartProduct, removeCartProduct, decreaseQuantity } = useContext(
    CartContext,
  );

  return (
    <div className="cart-item">
      <div className="cart-item__product">
        <img
          className="cart-item__product--img"
          alt={product.name}
          src={product.coverImage}
        />
        <Link
          to={`/products/${product.slug}`}
          className="cart-item__product--link"
        >
          <h3>{product.name}</h3>
          <p>#{product.id}</p>
        </Link>
      </div>
      <div className="cart-item__quantity">
        <button
          type="button"
          onClick={() => decreaseQuantity(product.id)}
          className="cart-item__quantity--reduce"
        >
          -
        </button>
        <input
          className="cart-item__quantity--count"
          value={product.count}
          type="text"
          onChange={() => {}}
        />
        <button
          onClick={() => addCartProduct(product)}
          type="button"
          className="cart-item__quantity--add"
        >
          +
        </button>
      </div>
      <div>
        <p className="cart-item__price">${product.price}</p>
        <p>
          {product.count > 1 &&
            `x${product.count} = $${+(product.price * product.count).toFixed(
              2,
            )}`}
        </p>
      </div>
      <button
        onClick={() => removeCartProduct(product.id)}
        className="cart-item__remove"
      >
        &times;
      </button>
    </div>
  );
};

export default CartItem;

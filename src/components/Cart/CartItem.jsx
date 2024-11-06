// src/components/Cart/CartItem.jsx
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <p>{item.product.name}</p>
      <p>Price: ${item.product.price}</p>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => updateCartItem(item.productId, Number(e.target.value))}
      />
      <button onClick={() => removeFromCart(item.productId)}>Remove</button>
    </div>
  );
};

export default CartItem;

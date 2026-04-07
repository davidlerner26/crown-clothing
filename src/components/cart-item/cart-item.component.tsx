import { type FC, memo } from 'react';

import { CartCount, CartItemContainer, ItemDetails } from './cart-item.styles';

import type { CartItem as TCartItem } from '../../store/cart/cart.types';
import { CurrencyFormatter } from '../currency-formatter/currency-formatter.component';
import { Arrow, RemoveButton } from '../checkout-item/checkout-item.styles';
import { useDispatch } from 'react-redux';
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.action';

type CartItemProps = {
  cartItem: TCartItem;
  cartItems: TCartItem[];
};

const CartItem: FC<CartItemProps> = memo(({ cartItem, cartItems }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const quantityText = `${quantity} x `;
  const dispatch = useDispatch();
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <div>
          <span>{name}</span>
          <CartCount>
            <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
            <span>
              {quantityText}
              <CurrencyFormatter
                price={price}
                currencyCode="USD"
                locale="en-US"
              />
            </span>
            <Arrow onClick={addItemHandler}>&#10095;</Arrow>
          </CartCount>
        </div>
        <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;

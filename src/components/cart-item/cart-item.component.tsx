import { type FC, memo } from 'react';

import { CartItemContainer, ItemDetails } from './cart-item.styles';

import type { CartItem as TCartItem } from '../../store/cart/cart.types';
import { CurrencyFormatter } from '../currency-formatter/currency-formatter.component';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x{' '}
          <CurrencyFormatter price={price} currencyCode="USD" locale="en-US" />
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;

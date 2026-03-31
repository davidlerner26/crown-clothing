import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import type { CategoryItem } from '../../store/categories/category.types';

import Button from '../button/button.component';

import { BUTTON_TYPE_CLASSES } from '../button/button-type-classes';
import { CurrencyFormatter } from '../currency-formatter/currency-formatter.component';
import { Footer, Name, ProductCartContainer } from './product-card.styles';

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <CurrencyFormatter price={price} currencyCode="USD" locale="en-US" />
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;

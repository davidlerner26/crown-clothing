import { useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
  TotalRow,
} from './checkout.styles';
import { BUTTON_TYPE_CLASSES } from '../../components/button/button-type-classes';
import { CurrencyFormatter } from '../../components/currency-formatter/currency-formatter.component';
import Button from '../../components/button/button.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const tableColumns = [
    'Product',
    'Description',
    'Quantity',
    'Price',
    'Remove',
  ];

  const payNow = () => {
    if (currentUser) {
      navigate('/payment');
    } else {
      navigate('/auth');
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        {tableColumns.map((tableColumn, idx) => (
          <HeaderBlock key={idx}>
            <span>{tableColumn}</span>
          </HeaderBlock>
        ))}
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <TotalRow>
        <Total>
          Total:{' '}
          <CurrencyFormatter
            price={cartTotal}
            currencyCode="USD"
            locale="en-US"
          />
        </Total>
        <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={payNow}>
          Pay now
        </Button>
      </TotalRow>
    </CheckoutContainer>
  );
};

export default Checkout;

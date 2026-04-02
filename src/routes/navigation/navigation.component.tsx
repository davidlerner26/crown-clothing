import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';

import CrownLogo from '../../assets/crown.svg';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
  NavLinkButton,
} from './navigation.styles';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { ClickOutside } from '../../components/cick-outside/cick-outside.component';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const signOutUser = () => dispatch(signOutStart());
  const { pathname } = useLocation();
  const items = [
    { to: '/shop', label: 'SHOP' },
    { to: '/auth', label: 'SIGN IN' },
  ];

  const isCurrentRoute = (item: { to: string }) => {
    return pathname.startsWith(item.to);
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <img src={CrownLogo} alt="Crown logo" />
        </LogoContainer>
        <NavLinks>
          {items.map((item) => {
            if (item.to === '/auth' && currentUser) {
              return (
                <NavLinkButton
                  key="sign-out"
                  type="button"
                  onClick={signOutUser}
                >
                  SIGN OUT
                </NavLinkButton>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                $isCurrentRoute={isCurrentRoute(item)}
              >
                {item.label}
              </NavLink>
            );
          })}
          <CartIcon />
        </NavLinks>
      </NavigationContainer>
      {isCartOpen && (
        <ClickOutside onClickOutside={() => dispatch(setIsCartOpen(false))}>
          <CartDropdown />
        </ClickOutside>
      )}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

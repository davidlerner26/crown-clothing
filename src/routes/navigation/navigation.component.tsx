import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';
import {
  selectCurrentUser,
  selectSignOutError,
  selectSignOutSuccess,
} from '../../store/user/user.selector';

import CrownLogo from '../../assets/crown.svg';

import { ClickOutside } from '../../components/cick-outside/cick-outside.component';
import ErrorMessage from '../../components/error-message/error-message.component';
import { setIsCartOpen } from '../../store/cart/cart.action';
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinkButton,
  NavLinks,
} from './navigation.styles';
import { useEffect } from 'react';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const error = useSelector(selectSignOutError);
  const isSignOutSuccess = useSelector(selectSignOutSuccess);
  const errorMessage: string = error ? 'Failed to sign out current user.' : '';

  const signOutUser = () => dispatch(signOutStart());
  const { pathname } = useLocation();
  const items = [
    { to: '/shop', label: 'SHOP' },
    { to: '/auth', label: 'SIGN IN' },
  ];

  const isCurrentRoute = (item: { to: string }) => {
    return pathname.startsWith(item.to);
  };

  useEffect(() => {
    if (isSignOutSuccess) {
      navigate('/', { replace: true });
    }
  }, [isSignOutSuccess]);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <img src={CrownLogo} alt="Crown logo" />
        </LogoContainer>
        <ErrorMessage errorMessage={errorMessage} />
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
    </>
  );
};

export default Navigation;

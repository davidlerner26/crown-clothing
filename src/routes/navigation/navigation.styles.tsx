import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

type NavigationProps = {
  $isCurrentRoute?: boolean;
};

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px 20px;
    margin-bottom: 20px;
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

const navLinkStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

const isCurrentRouteStyles = css`
  border-bottom: 1px solid currentColor;
`;

export const NavLink = styled(Link)<NavigationProps>`
  ${navLinkStyles}
  ${({ $isCurrentRoute }) => ($isCurrentRoute ? isCurrentRouteStyles : '')}
`;

export const NavLinkButton = styled.button`
  ${navLinkStyles}
  background: none;
  border: none;
  font: inherit;
`;

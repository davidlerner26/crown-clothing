import styled from 'styled-components';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 0.5rem;

  img {
    width: 30%;
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  span {
    font-size: 1rem;
  }
`;

export const CartCount = styled.div`
  display: flex;
  column-gap: 0.25rem;
`;

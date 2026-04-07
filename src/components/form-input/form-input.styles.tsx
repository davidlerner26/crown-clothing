import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';
const errorColor = 'red';

type FormInputLabelProps = {
  shrink?: boolean;
  error?: string;
};

type FormInputProps = {
  error?: string;
};

const shrinkLabelStyles = css<FormInputProps>`
  top: -14px;
  font-size: 12px;
  color: ${({ error }) => (error ? errorColor : mainColor)};
`;

const errorStyles = css`
  border-color: ${errorColor};
  color: ${errorColor};
`;

export const FormInputContainer = styled.div`
  position: relative;
`;

export const FormInputLabel = styled.label<FormInputLabelProps>`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles};
  ${({ error }) => error && errorStyles};
`;

export const Input = styled.input<FormInputProps>`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 1.5rem 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }

  ${({ error }) => error && errorStyles};
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const FormInputError = styled.small`
  position: absolute;
  color: ${errorColor};
  bottom: -25px;
`;

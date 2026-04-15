import { type FC, type InputHTMLAttributes } from 'react';

import type { FieldError } from 'react-hook-form';
import {
  FormInputContainer,
  FormInputError,
  FormInputLabel,
  Group,
  Input,
} from './form-input.styles';

type FormInputProps = {
  label: string;
  error: FieldError | undefined;
  currentValue: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({
  label,
  error,
  currentValue,
  ...otherProps
}) => {
  const message = error?.message ?? '';

  return (
    <FormInputContainer>
      <Group>
        <Input error={message} {...otherProps} />
        {label && (
          <FormInputLabel
            error={message}
            shrink={Boolean(currentValue?.length)}
          >
            {label}
          </FormInputLabel>
        )}
      </Group>
      <FormInputError>{message && <span>{message}</span>}</FormInputError>
    </FormInputContainer>
  );
};

export default FormInput;

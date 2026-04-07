import type { FC, InputHTMLAttributes } from 'react';

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
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, error, ...otherProps }) => {
  return (
    <FormInputContainer>
      <Group>
        <Input error={error?.message} {...otherProps} />
        {label && (
          <FormInputLabel
            error={error?.message}
            shrink={Boolean(
              otherProps.value &&
              typeof otherProps.value === 'string' &&
              otherProps.value.length,
            )}
          >
            {label}
          </FormInputLabel>
        )}
      </Group>
      <FormInputError>
        {error?.message && <span>{error.message}</span>}
      </FormInputError>
    </FormInputContainer>
  );
};

export default FormInput;

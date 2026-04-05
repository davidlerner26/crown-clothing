import type { FC, InputHTMLAttributes, ReactNode } from 'react';

import type { FieldError } from 'react-hook-form';
import { FormInputLabel, Group, Input } from './form-input.styles';

type FormInputProps = {
  label: string;
  error: FieldError | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, error, ...otherProps }) => {
  return (
    <>
      <Group>
        <Input {...otherProps} />
        {label && (
          <FormInputLabel
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
      {error && <span>{error as ReactNode}</span>}
    </>
  );
};

export default FormInput;

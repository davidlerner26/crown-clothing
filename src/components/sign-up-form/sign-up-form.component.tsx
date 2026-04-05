import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import Alert from '@mui/material/Alert';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUpStart } from '../../store/user/user.action';
import {
  selectCurrentUser,
  selectSignUpError,
} from '../../store/user/user.selector';
import { SignUpContainer } from './sign-up-form.styles';

export type Inputs = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const error = useSelector(selectSignUpError);
  let errorMessage = null;
  if (error) {
    errorMessage = error.message;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    event?.stopPropagation();
    const { displayName, email, password } = data;

    dispatch(signUpStart(email, password, displayName));
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      {errorMessage && errorMessage !== '' && (
        <Alert severity="error">{errorMessage}</Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          {...register('displayName', { required: true })}
          label="Display Name"
          type="text"
          name="displayName"
          error={errors.displayName}
        />

        <FormInput
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          label="Email"
          type="email"
          name="email"
          error={errors.email}
        />

        <FormInput
          {...register('password', { required: true, minLength: 6 })}
          label="Password"
          type="password"
          name="password"
          error={errors.password}
        />

        <FormInput
          {...register('confirmPassword', { required: true })}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          error={errors.confirmPassword}
        />
        <Button type="submit" disabled={errors ? false : false}>
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;

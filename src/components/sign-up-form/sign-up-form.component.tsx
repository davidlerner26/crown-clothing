import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { AuthErrorCodes, type AuthError } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUpStart } from '../../store/user/user.action';
import {
  selectCurrentUser,
  selectSignUpError,
} from '../../store/user/user.selector';
import ErrorMessage from '../error-message/error-message.component';
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
  let errorMessage = '';
  if (error) {
    if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
      errorMessage = 'Cannot create user, email already in use.';
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = '';
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
      <ErrorMessage errorMessage={errorMessage} />
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

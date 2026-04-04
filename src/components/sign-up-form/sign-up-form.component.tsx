import { type AuthError, AuthErrorCodes } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUpStart } from '../../store/user/user.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import { SignUpContainer } from './sign-up-form.styles';

type Inputs = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
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
  console.log(errors);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { displayName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create user, email already in use');
      } else {
        console.error('user creation encountered an error', error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          {...register('displayName', { required: true })}
          label="Display Name"
          type="text"
          name="displayName"
        />

        <FormInput
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          label="Email"
          type="email"
          name="email"
        />

        <FormInput
          {...register('password', { required: true, minLength: 6 })}
          label="Password"
          type="password"
          name="password"
        />

        <FormInput
          {...register('confirmPassword', { required: true })}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;

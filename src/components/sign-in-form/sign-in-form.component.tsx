import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignInError } from '../../store/user/user.selector';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { AuthErrorCodes, type AuthError } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import { BUTTON_TYPE_CLASSES } from '../button/button-type-classes';
import ErrorMessage from '../error-message/error-message.component';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';

export type Inputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const error = useSelector(selectSignInError);
  let errorMessage = '';
  if (error) {
    if (
      (error as AuthError).code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
    ) {
      errorMessage = 'Invalid email or password.';
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = '';
  }

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    event?.stopPropagation();
    const { email, password } = data;

    dispatch(emailSignInStart(email, password));
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <ErrorMessage errorMessage={errorMessage} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          {...register('email', {
            required: 'Email is required',
          })}
          label="Email"
          type="email"
          error={errors.email}
        />

        <FormInput
          {...register('password', {
            required: 'Password is required',
          })}
          label="Password"
          type="password"
          name="password"
          error={errors.password}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;

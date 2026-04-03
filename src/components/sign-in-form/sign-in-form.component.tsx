import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import Alert from '@mui/material/Alert';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';
import { BUTTON_TYPE_CLASSES } from '../button/button-type-classes';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [displayError, setDisplayError] = useState('');
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
    } catch (error) {
      console.error('user sign in failed', error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      {displayError && <Alert severity="error">This is an error Alert.</Alert>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
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

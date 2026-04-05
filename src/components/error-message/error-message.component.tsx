import Alert from '@mui/material/Alert';

type ErrorMessageProps = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <>
      {errorMessage && errorMessage !== '' && (
        <Alert severity="error">{errorMessage}</Alert>
      )}
    </>
  );
};

export default ErrorMessage;

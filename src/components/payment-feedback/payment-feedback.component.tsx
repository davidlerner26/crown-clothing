import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentFeedback = ({
  isPaymentSuccessful,
}: {
  isPaymentSuccessful: boolean;
}) => {
  return isPaymentSuccessful ? (
    <>
      <CheckCircleIcon
        color="success"
        sx={{ width: '150px', height: '150px' }}
      />
      <h2>Payment was successful</h2>
    </>
  ) : (
    <>
      <ErrorIcon sx={{ color: 'red', width: '150px', height: '150px' }} />
      <h2>Failed to process payment</h2>
    </>
  );
};

export default PaymentFeedback;

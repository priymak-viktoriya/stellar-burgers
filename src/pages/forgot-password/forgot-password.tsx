import { ForgotPasswordUI } from '@ui-pages';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '@utils/burger-api';
import type { SyntheticEvent } from 'react';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (!email) return;
    forgotPasswordApi({ email })
      .then(() => navigate('/reset-password', { state: { email } }))
      .catch((err) => setError((err as Error).message));
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
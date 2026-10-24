import { ResetPasswordUI } from '@ui-pages';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '@utils/burger-api';
import type { SyntheticEvent } from 'react';

export const ResetPassword = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (!password || !token) return;
    resetPasswordApi({ password, token })
      .then(() => navigate('/login'))
      .catch((err) => setError((err as Error).message));
  };

  return (
    <ResetPasswordUI
      errorText={error}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
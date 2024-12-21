import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { login } from '../../store/auth.slice';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(credentials)).unwrap();
      navigate('/emails');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Login
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </Box>
  );
};

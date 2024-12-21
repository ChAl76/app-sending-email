import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { AppDispatch } from '../../store/store';
import { register } from '../../store/auth.slice';

export const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register(credentials));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Register
      </Typography>
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
        label="Email"
        type="email"
        margin="normal"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Register
      </Button>
    </Box>
  );
};

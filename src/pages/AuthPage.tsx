import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  CircularProgress,
} from '@mui/material';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';

export const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/emails', { replace: true });
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 8, p: 4 }}>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box sx={{ mt: 3 }}>{tab === 0 ? <LoginForm /> : <RegisterForm />}</Box>
      </Paper>
    </Container>
  );
};

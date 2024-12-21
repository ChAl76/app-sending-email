import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import { EmailForm } from '../components/email/EmailForm';
import { EmailList } from '../components/email/EmailList';
import { RootState } from '../store/store';
import { logout } from '../store/auth.slice';

export const EmailPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Email App
          </Typography>
          <Typography sx={{ mr: 2 }}>
            {user?.username} ({user?.email})
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Emails</Typography>
          <EmailForm />
        </Box>
        <EmailList />
      </Container>
    </Box>
  );
};

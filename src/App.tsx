import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { AuthPage } from './pages/AuthPage';
import { EmailPage } from './pages/EmailPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { store } from './store/store';

const theme = createTheme();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/emails"
        element={
          <ProtectedRoute>
            <EmailPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/emails" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

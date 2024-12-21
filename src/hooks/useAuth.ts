import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { login } from '../store/auth.slice';
import { storage } from '../utils/storage';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const restoreSession = async () => {
      const savedCredentials = storage.getCredentials();

      if (savedCredentials && !user) {
        try {
          await dispatch(login(savedCredentials)).unwrap();
          navigate('/emails');
        } catch (error) {
          storage.clearCredentials();
          navigate('/auth');
        }
      }
    };

    restoreSession();
  }, [dispatch, navigate, user]);

  return { user, isLoading };
};

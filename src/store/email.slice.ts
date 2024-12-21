import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { emailApi } from '../api/email.api';
import { Email, CreateEmailDto } from '../types/auth.types';

interface EmailState {
  emails: Email[];
  totalCount: number;
  currentPage: number;
  rowsPerPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: EmailState = {
  emails: [],
  totalCount: 0,
  currentPage: 1,
  rowsPerPage: 10,
  isLoading: false,
  error: null,
};

export const fetchEmails = createAsyncThunk(
  'email/fetchEmails',
  async (
    { page, rowsPerPage }: { page: number; rowsPerPage: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await emailApi.getEmails(page, rowsPerPage);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch emails');
    }
  }
);

export const sendEmail = createAsyncThunk(
  'email/sendEmail',
  async (emailData: CreateEmailDto, { dispatch, rejectWithValue }) => {
    try {
      const response = await emailApi.sendEmail(emailData);
      dispatch(setCurrentPage(0));
      return response;
    } catch (error) {
      return rejectWithValue('Failed to send email');
    }
  }
);

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emails = action.payload.results;
        state.totalCount = action.payload.count;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(sendEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setRowsPerPage } = emailSlice.actions;
export default emailSlice.reducer;

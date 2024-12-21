import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import {
  fetchEmails,
  setCurrentPage,
  setRowsPerPage,
} from '../../store/email.slice';

export const EmailList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { emails, totalCount, currentPage, rowsPerPage, isLoading } =
    useSelector((state: RootState) => state.email);

  useEffect(() => {
    dispatch(fetchEmails({ page: currentPage, rowsPerPage }));
  }, [dispatch, currentPage, rowsPerPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setRowsPerPage(event.target.value));
  };

  return (
    <Paper sx={{ mt: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email.id}>
                <TableCell>{email.id}</TableCell>
                <TableCell>{email.recipient}</TableCell>
                <TableCell>{email.subject}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 20, 30]}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

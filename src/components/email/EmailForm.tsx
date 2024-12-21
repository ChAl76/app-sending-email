import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { AppDispatch, RootState } from '../../store/store';
import { sendEmail } from '../../store/email.slice';

export const EmailForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [emailData, setEmailData] = useState({
    recipient: '',
    subject: '',
  });

  const handleSubmit = async () => {
    if (!currentUser) return;

    const message = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    await dispatch(
      sendEmail({
        sender: currentUser.id,
        recipient: emailData.recipient,
        subject: emailData.subject,
        message,
      })
    );

    setOpen(false);
    setEmailData({ recipient: '', subject: '' });
    setEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Email
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>New Email</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              disabled
              label="From"
              value={currentUser?.email || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="To"
              value={emailData.recipient}
              onChange={(e) =>
                setEmailData({ ...emailData, recipient: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Subject"
              value={emailData.subject}
              onChange={(e) =>
                setEmailData({ ...emailData, subject: e.target.value })
              }
              margin="normal"
            />
            <Box sx={{ border: 1, borderColor: 'grey.300', mt: 2, p: 2 }}>
              <Editor editorState={editorState} onChange={setEditorState} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

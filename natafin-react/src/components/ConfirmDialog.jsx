import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}) {
  const isDeleteAction = confirmLabel === 'Ya, Hapus'

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          className: 'confirm-dialog-paper',
        },
      }}
    >
      <DialogTitle
        id="confirm-dialog-title"
        className="confirm-dialog-title"
      >
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          id="confirm-dialog-description"
          className="confirm-dialog-message"
          component="p"
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions className="confirm-dialog-actions">
        <Button
          onClick={onCancel}
          variant="outlined"
          className="confirm-dialog-cancel"
        >
          Batal
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          autoFocus
          className={`confirm-dialog-confirm ${
            isDeleteAction ? 'confirm-dialog-danger' : ''
          }`}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog

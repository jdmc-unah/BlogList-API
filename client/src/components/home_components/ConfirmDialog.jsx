
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmDialog = ({open, setOpen, handleAccept})=>{
    
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                Confirmación
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                ¿Está seguro que desea borrar el blog? <br /> Esta acción no puede deshacerse.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleAccept} autoFocus>
                Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
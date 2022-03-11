import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IChapter } from 'models/IChapter';
import { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormChapterType } from 'features/course/types';

interface Default {
    currentChapter: IChapter;
}

interface Prop {
    isOpen: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
    control: Control<FormChapterType>;
}

function ModalChapter({ isOpen, handleClickOpen, handleClose, control }: Prop) {
    return (
        <div>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>Thêm mới chương học</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    Thêm mới chương học vào trong khóa học này*/}
                    {/*</DialogContentText>*/}
                    <Controller
                        control={control}
                        name={'currentChapter.name'}
                        render={({ field }) => (
                            <TextField
                                autoFocus
                                margin='dense'
                                id='name'
                                label='Tên chương học'
                                type='email'
                                fullWidth
                                variant='standard'
                                {...field}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleClose}>Thêm mới</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalChapter;

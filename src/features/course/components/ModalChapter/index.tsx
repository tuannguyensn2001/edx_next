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
    handleSubmit: () => void;
    mode: 'create' | 'edit';
}

function ModalChapter({
    isOpen,
    handleClickOpen,
    handleClose,
    control,
    handleSubmit,
    mode,
}: Prop) {
    return (
        <div>
            <Dialog
                fullWidth
                maxWidth={'sm'}
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    {mode === 'create'
                        ? 'Thêm mới chương học'
                        : 'Sửa chương học'}
                </DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    Thêm mới chương học vào trong khóa học này*/}
                    {/*</DialogContentText>*/}
                    <Controller
                        rules={{
                            required: 'Tên chương học không được để trống',
                        }}
                        control={control}
                        name={'currentChapter.name'}
                        render={({ field, fieldState: { invalid, error } }) => (
                            <TextField
                                error={invalid}
                                autoFocus
                                margin='dense'
                                id='name'
                                label='Tên chương học'
                                type='email'
                                fullWidth
                                variant='standard'
                                helperText={error?.message}
                                {...field}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button variant={'contained'} onClick={handleSubmit}>
                        {mode === 'create' ? 'Thêm mới' : 'Cập nhật'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalChapter;

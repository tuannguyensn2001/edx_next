import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Control, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FormLesson } from 'models/ILesson';

interface Prop {
    isOpen: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
    // control: Control<FormChapterType>;
    handleSubmit: () => void;
    mode: 'create' | 'edit';
    control: Control<FormLesson>;
}

function ModalLesson({
    isOpen,
    handleClickOpen,
    handleClose,
    handleSubmit,
    mode,
    control,
}: Prop) {
    return (
        <Dialog fullWidth maxWidth={'sm'} open={isOpen} onClose={handleClose}>
            <DialogTitle>
                {mode === 'create' ? 'Thêm mới bài học' : 'Sửa bài học'}
            </DialogTitle>
            <DialogContent>
                {/*<DialogContentText>*/}
                {/*    Thêm mới chương học vào trong khóa học này*/}
                {/*</DialogContentText>*/}
                <Controller
                    rules={{
                        required: 'Tên bài học không được để trống',
                    }}
                    control={control}
                    name={'name'}
                    render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                            error={invalid}
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Tên bài học'
                            fullWidth
                            variant='outlined'
                            helperText={error?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    rules={{
                        required: 'Video url không được để trống',
                    }}
                    control={control}
                    name={'videoURL'}
                    render={({ field, fieldState: { invalid, error } }) => (
                        <TextField
                            error={invalid}
                            autoFocus
                            margin='dense'
                            id='video_url'
                            label='Link video bài học'
                            fullWidth
                            variant='outlined'
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
    );
}

export default ModalLesson;

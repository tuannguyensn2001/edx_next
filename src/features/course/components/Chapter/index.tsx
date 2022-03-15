import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IChapter } from 'models/IChapter';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { memo } from 'react';
import { useConfirm } from 'material-ui-confirm';

interface Prop extends IChapter {
    handleClickEdit: (chapter: IChapter) => void;
    handleDelete: (id: string) => void;
}

function Chapter({
    name,
    handleClickEdit,
    _id,
    id,
    order,
    handleDelete,
}: Prop) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const confirm = useConfirm();

    const onChange = () => {
        setIsOpen((prevState) => !prevState);
    };

    const clickEdit = () => {
        handleClickEdit({ _id, name, id, order });
    };

    const clickDelete = () => {
        confirm({
            title: 'Xóa chương học',
            description: 'Bạn có chắc chắn muốn xóa chương học',
            confirmationButtonProps: {
                variant: 'contained',
            },
        }).then((r) => {
            if (!id) return;
            handleDelete(id);
        });
    };

    return (
        <>
            <Accordion expanded={isOpen} onChange={onChange}>
                <AccordionSummary
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>{name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <div className={'tw-flex tw-justify-end'}>
                            <Button variant={'contained'} onClick={clickEdit}>
                                Sửa
                            </Button>
                            <Button onClick={clickDelete} variant={'outlined'}>
                                Xóa
                            </Button>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default Chapter;

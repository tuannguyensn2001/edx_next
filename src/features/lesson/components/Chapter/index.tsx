import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import LessonItem from 'features/lesson/components/LessonItem';

const CustomDetail = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function Chapter() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const onChange = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div>
            <Accordion expanded={isOpen} onChange={onChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                >
                    <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <CustomDetail>
                    <LessonItem />
                    <LessonItem />
                    <LessonItem />
                    <LessonItem />
                </CustomDetail>
            </Accordion>
        </div>
    );
}

export default Chapter;

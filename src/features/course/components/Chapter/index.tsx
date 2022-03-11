import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IChapter } from 'models/IChapter';
import { useState } from 'react';

function Chapter({ name }: IChapter) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onChange = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <Accordion expanded={isOpen} onChange={onChange}>
            <AccordionSummary
                aria-controls='panel1a-content'
                id='panel1a-header'
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default Chapter;

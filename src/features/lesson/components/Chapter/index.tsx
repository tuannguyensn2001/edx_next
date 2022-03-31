import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import LessonItem from 'features/lesson/components/LessonItem';
import { IChapter } from 'models/IChapter';

const CustomDetail = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
}));

const CustomSummary = styled(AccordionSummary)(({ theme }) => ({
    backgroundColor: '#e5e5e5',
}));

interface Prop {
    chapter: IChapter;
}

function Chapter({ chapter }: Prop) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const isEmptyLesson = useMemo<boolean>(() => {
        return chapter?.lessons?.length === 0 || !chapter.lessons;
    }, [chapter]);

    const onChange = () => {
        if (isEmptyLesson) return;
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div>
            <Accordion expanded={isOpen} onChange={onChange}>
                <CustomSummary
                    // expandIcon={<ExpandMoreIcon />}
                    expandIcon={!isEmptyLesson && <ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                >
                    <Typography>{chapter.name}</Typography>
                </CustomSummary>
                <CustomDetail>
                    {chapter?.lessons?.map((lesson) => (
                        <LessonItem lesson={lesson} key={lesson.id} />
                    ))}
                </CustomDetail>
            </Accordion>
        </div>
    );
}

export default Chapter;

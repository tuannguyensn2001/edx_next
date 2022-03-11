import DefaultLayout from 'layouts/Default';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import FormEditCourse from 'features/course/components/FormEditCourse';
import FormChapter from 'features/course/components/FormChapter';

function EditCourse() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <DefaultLayout>
            <div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        <Tab label='Thông tin khóa học' {...a11yProps(0)} />
                        <Tab label='Bài giảng' {...a11yProps(1)} />
                        <Tab label='Thông tin khác' {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <FormEditCourse />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FormChapter />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </div>
        </DefaultLayout>
    );
}

export default EditCourse;

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

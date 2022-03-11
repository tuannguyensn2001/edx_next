import Header from 'components/layouts/Header';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Prop {
    children: JSX.Element | JSX.Element[];
}

function DefaultLayout({ children }: Prop) {
    return (
        <div>
            <Header />
            <div className={'tw-px-20'}>{children}</div>
        </div>
    );
}

export default DefaultLayout;

import Header from 'components/layouts/Header';

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

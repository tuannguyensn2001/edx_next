import Chapter from 'features/lesson/components/Chapter';
import Playlist from 'features/lesson/components/Playlist';
import Content from 'features/lesson/components/Content';

function Lesson() {
    return (
        <div>
            <div className={'tw-h-[60px] tw-bg-gray-700'}></div>

            <div>
                <div className='tw-grid tw-grid-cols-12  tw-divide-x'>
                    <div className='tw-col-span-8'>
                        <Content />
                    </div>
                    <div className='tw-col-span-4'>
                        <Playlist />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lesson;

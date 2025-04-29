import React from 'react';

const items = [
    {
        id: '1',
        title: 'Web Design',
    },
    {
        id: '2',
        title: 'Graphic Design',
    },
    {
        id: '3',
        title: 'App Development',
    },
    {
        id: '4',
        title: 'Digital Marketing',
    },
    {
        id: '5',
        title: 'Web Development',
    },
    {
        id: '6',
        title: 'App Design',
    }
]

const TabButton = ({theme}) => {
    return (
        <div className={`${theme === 'theme3' ? 'border border-white/10' : theme === 'theme2' ? 'bg-primary/20' : ''} overflow-x-auto description-1 font-normal flex md:text-sm items-center rounded justify-between lg:px-5 md:px-2 md:py-2  text-[#888AA0] lg:py-3  `}>
            {
                items.map( item => <button key={item.id} className={` ${theme === 'theme3' || 'theme2' ? 'hover:bg-primary hover:text-white' : ''} px-2 description-1 py-1 sm:py-2 sm:px-3 lg:px-6 translate-transform duration-300 hover:shadow-custom-light hover:text-black`}>
                    {item.title}
                </button> )
            }
        </div>
    );
};

export default TabButton;
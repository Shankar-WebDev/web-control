import { useState } from 'react';
import { ArrowLeftFromLine, Settings } from 'lucide-react';
import RosIcon from './components/RosIcon';
import Section from './components/Section';
import { Outlet } from 'react-router-dom';

import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';


function MainPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const isModeOneActive = location.pathname === '/mode1';
    const isModeTwoActive = location.pathname === '/mode2';
    const isModeThreeActive = location.pathname === '/mode3';

    const [activeSection, setActiveSection] = useState('');

    const [section1State, setSection1State] = useState('idle');
    const [section2State, setSection2State] = useState('idle');
    const [section3State, setSection3State] = useState('idle');
    const isSection1Maximized = () => section1State === 'maximized';
    const isSection2Maximized = () => section2State === 'maximized';
    const isSection3Maximized = () => section3State === 'maximized';

    const isSection1Fullscreened = () => section1State === 'fullscreened';
    const isSection2Fullscreened = () => section2State === 'fullscreened';
    const isSection3Fullscreened = () => section3State === 'fullscreened';

    const isSection1Hidden = () => section1State === 'hidden';
    const isSection2Hidden = () => section2State === 'hidden';
    const isSection3Hidden = () => section3State === 'hidden';

    const handleSectionClick = (section: string) => {
	setActiveSection(section);
    };

    const handleState = (section: string, state: string) => {
	if (section === 'section2') {
	    if (state === 'maximize') {
		if (section3State === 'maximized') { setSection3State('minimized') }
		setSection2State('maximized');
	    }
	    if (state === 'minimize') {
		setSection2State('minimized');
	    }
	    if (state === 'zoom-in') {
		setSection2State('fullscreened');
		setSection1State('hidden');
		setSection3State('hidden');
	    }

	    if (state === 'zoom-out') {
		setSection2State('idle');
		setSection1State('idle');
		setSection3State('idle');
	    }
	} else if (section === 'section3') {
	    if (state === 'maximize') {
		if (section2State === 'maximized') { setSection2State('minimized') }
		setSection3State('maximized');
	    }
	    if (state === 'minimize') {
		setSection3State('minimized');
	    }
	    if (state === 'zoom-in') {
		setSection3State('fullscreened');
		setSection1State('hidden');
		setSection2State('hidden');
	    }
	    if (state === 'zoom-out') {
		setSection2State('idle');
		setSection1State('idle');
		setSection3State('idle');
	    }
	} else if (section === 'section1') {
	    if (state === 'maximize') {
		setSection1State('maximized');
	    }
	    if (state === 'minimize') {

		if (section1State !== 'fullscreened') { setSection1State('minimized'); }
	    }
	    if (state === 'zoom-in') {
		setSection1State('fullscreened');
		setSection2State('hidden');
		setSection3State('hidden');
	    }
	    if (state === 'zoom-out') {
		setSection2State('idle');
		setSection1State('idle');
		setSection3State('idle');
	    }
	}
	setActiveSection(section);
    };


    const [modalIsOpen, setModalIsOpen] = useState(false);



    function openModal() { setModalIsOpen(true); }



    function closeModal() { setModalIsOpen(false); }

    return (
	    <div className=" font-press-start text-white h-[100vh] flex flex-col bg-[#0f0f0f] select-none">
	    <div className="h-[50px] w-auto flex justify-center items-center justify-between p-[10px]">
            <RosIcon width={40} height={40} color="#a1a1a1" />

            <div className='flex flex-row justify-center align-center gap-[10px]'>
            <div className='flex items-center h-[30px] p-[5px] mt-[1px] rounded-[5px] text-center'>
            <span className='underline text-[25px] text-gray-400 hover:text-green-400'>http://localhost:8000</span>
        </div>
            <div className='hover:bg-[#464646] p-[5px] text-[#a1a1a1] rounded-[10px] transition-transform duration-300 ease-in-out hover:scale-110 hover:-rotate-90'><Settings className='text-[#a1a1a1]' onClick={openModal} /> </div>
            </div>
	    </div>
	    <div className="flex-1 flex flex-row p-[10px] pt-[0px] gap-[10px]">




            <div
        className={`flex-1 flex flex-col gap-[10px] ${isSection1Fullscreened() ? 'hidden' : ''}`}
        style={{
            maxHeight: 'calc(100vh - 60px)',
        }}
            >

            <Section fullscreen={isSection2Fullscreened()} isHidden={isSection2Hidden()} section='section2'
        minimized={isSection2Maximized()}
        activeSection={activeSection} handleState={(state) => handleState('section2', state)} handleSectionClick={(section) => handleSectionClick(section)} ><h1> Macros</h1><h2>silver biullte</h2> section1</Section>
            <Section fullscreen={isSection3Fullscreened()} isHidden={isSection3Hidden()} section='section3'
        minimized={isSection3Maximized()}
        activeSection={activeSection} handleState={(state) => handleState('section3', state)} handleSectionClick={(section) => handleSectionClick(section)} ><h1> Macros</h1><h2>fasdfsd</h2> section2</Section>
            </div>


            <Section fullscreen={isSection1Fullscreened()} isHidden={isSection1Hidden()} sideMinimized={true} section='section1'
        minimized={isSection1Maximized()}
        activeSection={activeSection} handleState={(state) => handleState('section1', state)} handleSectionClick={(section) => handleSectionClick(section)} >
            <h1>
            <a onClick={() => navigate('mode1')} className={`relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center ${isModeOneActive ? "text-white" : ""}`}>
            <div className="absolute inset-0 -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
            <span className="relative z-10">Mode One</span>
            </a>

            <div className="border-r-2 border-[#464646] z-11 right-0 h-3"></div>


            <a onClick={() => navigate('mode2')} className={`relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center ${isModeTwoActive ? "text-white" : ""}`}>
            <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
            <span className="relative z-10">Mode Two</span>
            </a>

            <div className="border-r-2 border-[#464646] z-11 right-0 h-3"></div>

            <a onClick={() => navigate('mode3')} className={`relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center ${isModeThreeActive ? "text-white" : ""}`}>

            <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
            <span className="relative z-10">Mode Three</span>
            </a>

        </h1>




            <h2>        <ArrowLeftFromLine className='p-[5px]' />
            </h2>

            <body className='overflow-scroll'><Outlet /></body></Section>

	</div>

	{/* <Modal
	    isOpen={modalIsOpen}
	    onRequestClose={closeModal}
	    contentLabel="Example Modal"
	    style={{
            overlay: {
            backgroundColor: 'rgba(90, 90, 90, 0.1)',
            zIndex: 10,
            backdropFilter: 'blur(12px)',
            },
            content: {
            background: 'rgba(90, 10, 182, 0.1)',
            color: 'lightsteelblue',
            borderRadius: '10px',
            padding: '20px',
            },
	    }}
	    >
	    <div className="relative font-press-start select-none relative">
            <h2 className="text-lg font-bold mb-4">Configurations</h2>
            <button
            onClick={closeModal}
            className="absolute top-[40px] right-[40px] h-[80px] w-[80px] text-red-500 hover:text-red-700"
            >
            &times;
            </button>
            <form className="space-y-4">
            {[...Array(5)].map((_, index) => (
            <input
            key={index}
            type="text"
            placeholder={`Input ${index + 1}`}
            className="w-full p-2 bg-gray-400 text-black rounded border border-gray-300"
            />
            ))}
            <div className="flex justify-end space-x-2">
            <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={closeModal}
            >
            Apply
            </button>
            <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={closeModal}
            >
            OK
            </button>
            </div>
            </form>
	    </div>
	    </Modal> */}

	    <Modal
	isOpen={modalIsOpen}
	onRequestClose={closeModal}
	contentLabel="Example Modal"
	style={{
	    overlay: {
		backgroundColor: 'rgba(90, 90, 90, 0.1)',
		zIndex: 10,
		backdropFilter: 'blur(12px)',
	    },
	    content: {
		background: 'rgba(90, 10, 182, 0.1)',
		color: 'lightsteelblue',
		borderRadius: '10px',
		padding: '20px',
	    },
	}}
	    >
	    <div className="font-press-start select-none relative">
	    <div className='flex flex-row w-full justify-between'><h2 className="text-lg font-bold mb-4">Configurations</h2>
	    <button
	onClick={closeModal}
	className="relative h-8 w-8 text-red-500 hover:text-red-700 text-2xl"
	    >
	    &times;
	</button></div>
	    <form className="space-y-4">
	    {[...Array(5)].map((_, index) => (
		    <input
		key={index}
		type="text"
		placeholder={`Input ${index + 1}`}
		className="w-full p-2 bg-gray-400 text-black rounded border border-gray-300"
		    />
	    ))}
	    <div className="flex justify-end space-x-2">
            <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={closeModal}
            >
            Apply
        </button>
            <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={closeModal}
            >
            OK
        </button>
	    </div>
	    </form>
	    </div>
	    </Modal>


	</div>
    );
}

export default MainPage;

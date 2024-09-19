import { useState } from 'react';
import { ArrowLeftFromLine, Settings } from 'lucide-react';
import RosIcon from './components/RosIcon';
import Section from './components/Section';
import { Outlet } from 'react-router-dom';

import { useNavigate, useLocation } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isTopicsActive = location.pathname === '/topics';
  const isServicesActive = location.pathname === '/services';
  const isActionsActive = location.pathname === '/actions';

  const [activeSection, setActiveSection] = useState('');

  const [section1State, setSection1State] = useState('idle');
  const [section2State, setSection2State] = useState('idle');
  const [section3State, setSection3State] = useState('idle');
  const isSection1Maximized = () => section1State === 'maximized';
  const isSection2Maximized = () => section2State === 'maximized';
  const isSection3Maximized = () => section3State === 'maximized';

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
    } else if (section === 'section3') {
      if (state === 'maximize') {
        if (section2State === 'maximized') { setSection2State('minimized') }
        setSection3State('maximized');
      }
      if (state === 'minimize') {
        setSection3State('minimized');
      }
    } else if (section === 'section1') {
      if (state === 'maximize') {
        setSection1State('maximized');
      }
      if (state === 'minimize') {
        setSection1State('minimized');
      }
    }
    setActiveSection(section);
  };

  return (
    <div className="text-white h-[100vh] flex flex-col bg-[#0f0f0f] select-none">
      <div className="h-[50px] w-auto flex justify-center items-center justify-between p-[10px]">
        <RosIcon width={40} height={40} color="#a1a1a1" />
        <div className='flex items-center bg-[#333333] h-[30px] p-2 rounded-[5px] text-center'>
          <span className='underline text-gray-400 hover:text-green-500'>http://localhost:8000</span>
        </div>
        <Settings className='text-[#a1a1a1]' />
      </div>
      <div className="flex-1 flex flex-row p-[10px] pt-[0px] gap-[10px]">




      <div
      className="flex-1 flex flex-col gap-[10px]"
      style={{
        maxHeight: 'calc(100vh - 60px)',
      }}
    >

          <Section section='section2'
            minimized={isSection2Maximized()}
            activeSection={activeSection} handleState={(state) => handleState('section2', state)} handleSectionClick={(section) => handleSectionClick(section)} ><h1> Macros</h1><h2>silver biullte</h2> section1</Section>
          <Section section='section3'
            minimized={isSection3Maximized()}
            activeSection={activeSection} handleState={(state) => handleState('section3', state)} handleSectionClick={(section) => handleSectionClick(section)} ><h1> Macros</h1><h2>fasdfsd</h2> section2</Section>
        </div>


        <Section sideMinimized={true} section='section1'
          minimized={isSection1Maximized()}
          activeSection={activeSection} handleState={(state) => handleState('section1', state)} handleSectionClick={(section) => handleSectionClick(section)} >
          <h1>        
          <a onClick={() => navigate('topics')} className={`relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center ${isTopicsActive? "text-white" : ""}`}>
             <div className="absolute inset-0 -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
            <span className="relative z-10">Topics</span>
          </a>
          
          <div className="border-r-2 border-[#464646] z-11 right-0 h-3"></div>


            <a onClick={() => navigate('services')} className={`relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center ${isServicesActive? "text-white" : ""}`}>
              <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
              <span className="relative z-10">Services</span>
            </a>

          <div className="border-r-2 border-[#464646] z-11 right-0 h-3"></div>

            <a onClick={() => navigate('actions')} className={`relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center ${isActionsActive? "text-white" : ""}`}>
   
              <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
              <span className="relative z-10">Actions</span>
            </a>

          </h1>

          <h2>        <ArrowLeftFromLine className='p-[5px]' />
</h2>

          <body  className='overflow-scroll'><Outlet/></body></Section>

      </div>
    </div>
  );
}

export default MainPage;

import { useState } from 'react';
import { ArrowLeftFromLine, Settings } from 'lucide-react';
import RosIcon from './components/RosIcon';
import Section from './components/Section';
function App() {
  const [activeSection, setActiveSection] = useState('');

  const [section2State, setSection2State] = useState('idle');
  const isSection2Maximized = () => section2State === 'maximized';
  const isSection2Minimized = () => section2State === 'minimized';

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  const handleState = (section: string, state: string) => {
    if (state === 'maximize') {setSection2State('maximized')}
    if (state === 'minimize') {setSection2State('minimized')}
    setActiveSection(section);
  };

  return (
    <div className="text-white h-screen flex flex-col bg-[#0f0f0f]">
      <div className="h-[50px] w-full flex justify-center items-center justify-between p-[10px]">
        <RosIcon width={40} height={40} color="#a1a1a1" />
        <div className='flex items-center bg-[#333333] h-[30px] p-2 rounded-[5px] text-center'>
          <span className='underline text-gray-400 hover:text-green-500'>http://localhost:8000</span>
        </div>
        <Settings className='text-[#a1a1a1]' />
      </div>
      <div className="flex-1 flex flex-row p-[10px] pt-[0px] gap-[10px]">


        <Section section='section1' activeSection={activeSection} handleSectionClick={() => handleSectionClick('section1')}> <h1>          <a className="relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center">
          <div className="border-r-2 border-[#464646] absolute right-0 h-3"></div>
          <div className="absolute inset-0 -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
          <span className="relative z-10">Topics</span>
        </a>
          <a className="relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center">
            <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
            <span className="relative z-10">Services</span>
          </a>
          <a className="relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center">
            <div className="border-r-2 border-[#464646] absolute left-0 h-3"></div>
            <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px]"></div>
            <span className="relative z-10">Actions</span>
          </a>

        </h1>

          <h2>        <ArrowLeftFromLine className='p-[5px]' />

            <span className="relative">Back</span></h2>

          <body>content</body></Section>
        <div className='flex flex-col min-w-[50vw] gap-[10px]'>


          <Section section='section2'
            minimized={isSection2Maximized()}
            activeSection={activeSection} handleState={(state) => handleState('section2', state)} handleSectionClick={(section) => handleSectionClick(section)} ><h1> Macros</h1> section1</Section>
          <Section section='section3' activeSection={activeSection} handleSectionClick={(section) => handleSectionClick(section)}> <h1>Log</h1> section1</Section>
        </div>
      </div>
    </div>
  );
}

export default App;

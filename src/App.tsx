import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { Maximize, Minimize, Settings } from 'lucide-react';
import { ArrowLeftFromLine } from 'lucide-react';
import RosIcon from './components/RosIcon';

function App() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
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
        <section
          className={`relative flex-1 bg-[#262626] text-[#a1a1a1] rounded-[10px] box-border group ${activeSection === 'section1' ? 'border-green-500' : ''}`}
          onClick={() => handleSectionClick('section1')}
        >
          {/* Outset Border Effect */}
          <div className={`absolute inset-0 border-[1px] ${activeSection === 'section1' ? 'border-[#3d3d3d]' : 'border-transparent'} rounded-[10px] border-outset pointer-events-none`} />

          <h1 className="h-[40px] bg-[#333333] rounded-t-[10px] flex items-center justify-between px-[5px] relative">
            <div className="flex items-center">
              <a className="relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center">
                <div className="border-r-2 border-[#464646] absolute right-0 h-3"></div>
                <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px] "></div>
                <span className="relative z-10">Topics</span>
              </a>
              <a className="relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center">
                <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px] "></div>
                <span className="relative z-10">Services</span>
              </a>
              <a className="relative text-start p-4 pt-0 pb-0 rounded-[5px] flex group/heading items-center">
                <div className="border-r-2 border-[#464646] absolute left-0 h-3"></div>
                <div className="absolute inset-0 -left-[2px] -right-[2px] -top-[2px] -bottom-[2px] bg-[#464646] opacity-0 group-hover/heading:opacity-100 rounded-[5px] "></div>
                <span className="relative z-10">Actions</span>
              </a>
            </div>
            {/* Only show icons on section hover */}
            <div className="absolute inset-0 flex items-center gap-[5px] p-[5px] justify-end opacity-0 group-hover:opacity-100">
              <Maximize className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]" />
              <Minimize className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]" />
              <ChevronDown className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]" />
              <ChevronUp className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]" />
              <ChevronRight className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]" />
              <ChevronLeft className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]" />
            </div>
          </h1>
          <h2 className='h-[35px] bg-[#262626] border-b-2 border-[#333333] flex justify-start gap-[5px] px-[5px] items-center'>
            <ArrowLeftFromLine className='p-[5px]' />
            <span className="relative">Back</span>
          </h2>
          <div className='p-5'>
            section 1
          </div>
        </section>
        <section
          className={`relative flex-1 bg-[#262626] rounded-[10px] box-border ${activeSection === 'section2' ? 'border-green-500' : ''}`}
          onClick={() => handleSectionClick('section2')}
        >
          {/* Outset Border Effect */}
          <div className={`absolute inset-0 border-[1px] ${activeSection === 'section2' ? 'border-[#3d3d3d]' : 'border-transparent'}  rounded-[10px] border-outset pointer-events-none`} />
          <div className='p-5'>
            section 2
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

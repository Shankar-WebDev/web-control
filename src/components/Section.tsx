import React, { ReactNode, Children, ReactElement } from 'react';
import { Maximize, Minimize, ChevronDown, ChevronUp } from 'lucide-react'; // Ensure the path is correct for your icons
import './Section.css'
interface SectionProps {
  sideMinimized?: Boolean;
  minimized: Boolean;
  fullscreen: Boolean;
  isHidden: Boolean;
  section: string;
  activeSection: string;
  handleSectionClick: (section: string) => void;
  handleState: (state: string) => void;
  children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ sideMinimized, section, minimized, fullscreen, isHidden, activeSection, handleSectionClick, handleState, children }) => {
  // Helper functions to extract specific elements
  const extractElement = (type: React.ElementType) => {
    const found = Children.toArray(children).find(child => React.isValidElement(child) && (child as ReactElement).type === type);
    return found ? (found as ReactElement).props.children : null;
  };

  const headingContent = extractElement('h1');
  const subHeadingContent = extractElement('h2');
  const bodyContent = React.Children.toArray(children).filter(child => !React.isValidElement(child) || (child as ReactElement).type !== 'h1' && (child as ReactElement).type !== 'h2');


  const shouldHideHeading = !subHeadingContent;

  return (
    <section
      className={`${minimized ? 'h-[40px] flex-2' : 'section flex-1'} ${(minimized && sideMinimized) ? 'w-[40px]' : "min-w-[49vw]"} relative flex-basis bg-[#262626] text-[#a1a1a1] rounded-[10px] box-border group ${activeSection === section ? 'border-green-500' : ''} ${isHidden ? 'hidden' : ''}`}
      onClick={() => handleSectionClick(section)} // Use the section prop for the click handler
    >
      {/* Outset Border Effect */}
      <div className={`absolute inset-0 border-[1px] ${activeSection === section ? 'border-[#5d5d5d]' : 'border-transparent'} rounded-[10px] border-outset pointer-events-none`} />

      <h1 className={` h-[40px] bg-[#333333] rounded-t-[10px] ${minimized ? 'rounded-b-[10px]' : ''} ${(sideMinimized && minimized) ? 'left-[40px] transform origin-top-left rotate-90 full-height-width' : ''} inset-0 border-[1px] border-outset ${activeSection === section ? 'border-[#5d5d5d]' : 'border-transparent'} flex items-center justify-between px-[5px] relative`}>
        <div onClick={() => { console.log('down clicked'); handleState('minimize') }} className="flex items-center">
          {headingContent}
        </div>
        {/* Only show icons on section hover */}
        <div className="absolute inset-0 flex items-center gap-[5px] p-[4px] justify-end opacity-0 group-hover:opacity-100">
          {!fullscreen && (
            <>
            <Maximize
              className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]"
              onClick={() => {
                console.log('maximize clicked');
                handleState('zoom-in');
              }}
            />
            {minimized && (
              <ChevronUp
                className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]"
                onClick={() => {
                  console.log('chevron up clicked');
                  handleState('minimize');
                }}
              />
            )}

            {!minimized && (
              <ChevronDown
                className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]"
                onClick={() => {
                  console.log('chevron down clicked');
                  handleState('maximize');
                }}
              />
            )}
          </>
          )}


          {fullscreen && (

          <Minimize
            className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]"
            onClick={() => {
              console.log('minimize clicked');
              handleState('zoom-out');
            }}
          />
          )}

          {/* <ChevronRight className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]" />
          <ChevronLeft className="hover:bg-[#464646] p-[5px] text-[#a1a1a1] h-[30px] w-[30px] rounded-[5px]" /> */}
        </div>
      </h1>
      <h2 className={`${minimized ? 'hidden' : ''} ${shouldHideHeading ? 'hidden' : ''
        } h-[35px] bg-[#262626] border-b-2 border-[#333333] flex justify-start gap-[5px] px-[5px] items-center`}>

        {subHeadingContent}
      </h2>
      <div className={`p-2 body-height ${minimized ? 'hidden' : ''}`}>
        {bodyContent} {/* Render remaining children directly */}
      </div>
    </section>
  );
};

export default Section;

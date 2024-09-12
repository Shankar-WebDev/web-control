import React from 'react';

interface PaneProps {
  state: 'minimized' | 'maximized';
  minimize: 'vertical' | 'horizontal';
  onMinimize: () => void;
  onMaximize: () => void;
  children: React.ReactNode;
}

const Pane: React.FC<PaneProps> = ({ state, minimize, onMinimize, onMaximize, children }) => {
  const isMinimized = state === 'minimized';

  // Determine the styles based on minimize mode and state
  const paneStyles = {
    width: isMinimized && minimize === 'vertical' ? '50px' : 'auto',
    height: isMinimized && minimize === 'horizontal' ? '50px' : 'auto',
    minWidth: '50px', // Minimum width to avoid collapsing
    minHeight: '50px', // Minimum height to avoid collapsing
  };

  return (
    <div
      className={`relative bg-gray-200 border border-gray-400`}
      style={paneStyles}
    >
      <div className="flex gap-2 p-2 space-x-2">
        <button onClick={onMinimize} className="bg-red-500 hover:bg-red-600 rounded text-white p-2">Min</button>
        <button onClick={onMaximize} className="bg-blue-500 hover:bg-blue-600 rounded text-white p-2">Max</button>
      </div>
      {children}
    </div>
  );
};

export default Pane;

import React from 'react';
import TwistPublisher from '../components/TwistPublisher';
import LogSubscriber from '../components/LogSubscriber';

const Topics = () => {
  return (
    <>
        <div className='bg-red-900/20 rounded-[10px]'>
        <div>Publsher Pane</div>
        <TwistPublisher/></div>
        <div className='bg-red-900/20 rounded-[10px]'>
        <div>Subscriber Pane</div>
        <LogSubscriber/></div>
        
    </>
  );
};

export default Topics;


import TwistPublisherModeOne from '../components/TwistPublisherModeOne.tsx';

import ServiceCallerOne from '../components/ServiceCallerOne.tsx';

import DiagnosticSubscriber from '../components/DiagnosticSubscriber.tsx';
import WebSocketComponent from '../components/WebSocketComponent.tsx';

export const ModeOne = () => {
    return (<>
	    <h2>"this is mode one, very simple direct webapp to robot's zenoh client"</h2>
	    <TwistPublisherModeOne/>
		<ServiceCallerOne/>
		
	    </>
	   )
}

export const ModeTwo = () => {
    return (<>
		<DiagnosticSubscriber/>
	</>
    )
}

export const ModeThree = () => {
    return (<>
		<WebSocketComponent/>
	    </>
    )
}

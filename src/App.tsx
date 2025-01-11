import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';

import { ModeOne, ModeTwo, ModeThree } from './Pages/Demos';

import Introduction from './Pages/Introduction';
import Services from './Pages/Services';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route index element={<Introduction />} />
                <Route path="mode1" element={<ModeOne />} />
                <Route path="mode2" element={<ModeTwo />} />		                
                <Route path="mode3" element={<ModeThree />} />
                		                
                <Route path="services" element={<Services />} />
            </Route>
        </Routes>
    );
}

export default App;
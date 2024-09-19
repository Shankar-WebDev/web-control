import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Actions from './Pages/Actions';
import Services from './Pages/Services';
import Topics from './Pages/Topics';
function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route index element={<div>hello</div>} />
                <Route path="topics" element={<Topics />} />
                <Route path="services" element={<Services />} />
                <Route path="actions" element={<Actions />} />
            </Route>
        </Routes>
    );
}

export default App;
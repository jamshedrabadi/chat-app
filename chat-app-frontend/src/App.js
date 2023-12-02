import './App.css';

import { Route } from 'react-router-dom'
import Homepage from './pages/Homepage.js';
import Chatpage from './pages/Chatpage.js';

function App() {
    return (
        <div className="App">
            <Route path='/' component={Homepage} exact />
            <Route path='/chats' component={Chatpage} />
        </div>
    );
}

export default App;

import React from 'react';
import Home from './pages/Home';
import Hero from './components/Hero';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {

    return (
        <div className='w-full'>
            <Hero />
            <Home />
            <Toaster
                position="bottom-right"
            />
        </div>
    );
};

export default App;

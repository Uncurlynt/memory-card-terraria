import { useState } from 'react';
import StartScreen from './components/StartScreen';
import Gameplay from './components/Gameplay';
import Compendium from './components/Compendium';
import { VIEW_MODES, GAME_LEVELS } from './config/settings';

function App() {
    const [currentView, setCurrentView] = useState(VIEW_MODES.HOME);
    const [level, setLevel] = useState(GAME_LEVELS.EASY);

    const renderScreen = () => {
        switch (currentView) {
            case VIEW_MODES.PLAY:
                return (
                    <Gameplay
                        onNavigate={setCurrentView}
                        difficulty={level}
                    />
                );
            case VIEW_MODES.LIBRARY:
                return <Compendium onNavigate={setCurrentView} />;
            case VIEW_MODES.HOME:
            default:
                return (
                    <StartScreen
                        onNavigate={setCurrentView}
                        onSetLevel={setLevel}
                    />
                );
        }
    };

    return (
        <div className="app-root">
            {renderScreen()}
        </div>
    );
}

export default App;
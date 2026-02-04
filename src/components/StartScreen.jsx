import { useState } from 'react';
import { VIEW_MODES, GAME_LEVELS } from '../config/settings';

const MENU_SECTIONS = {
    TOP: 'top',
    LEVEL_SELECT: 'select_lvl',
};

export default function StartScreen({ onNavigate, onSetLevel }) {
    // Хук состояния для управления текущей секцией меню
    const [section, setSection] = useState(MENU_SECTIONS.TOP);

    // Переход к выбору уровня
    const handlePlay = () => setSection(MENU_SECTIONS.LEVEL_SELECT);

    // Переход к "Compendium"
    const handleCompendium = () => onNavigate(VIEW_MODES.LIBRARY);

    // Запуск игры с выбранным уровнем
    const startGame = (lvl) => {
        onSetLevel(lvl);
        onNavigate(VIEW_MODES.PLAY);
    };


    return (
        <div className="start-screen-layout">
            <div className="brand-logo-container">
                <img
                    src="/terraria-logo.webp"
                    alt="Terraria Logo"
                    className="game-logo"
                />
            </div>
            <div className="menu-controls">
                {section === MENU_SECTIONS.TOP ? (
                    <>
                        <button onClick={handlePlay}>
                            Play
                        </button>
                        <button onClick={handleCompendium}>
                            Compendium

                        </button>
                    </>
                ) : (
                    <div className="level-grid">
                        <button onClick={() => startGame(GAME_LEVELS.EASY)}>Easy</button>
                        <button onClick={() => startGame(GAME_LEVELS.NORMAL)}>Normal</button>
                        <button onClick={() => startGame(GAME_LEVELS.HARD)}>Hard</button>
                        <button style={{marginTop: '20px'}} onClick={() => setSection(MENU_SECTIONS.TOP)}>
                            Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
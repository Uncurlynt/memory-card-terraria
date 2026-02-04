import React from 'react';
import { VIEW_MODES } from '../config/settings';
import MemoryTile from './MemoryTile';
import { useGame } from '../hooks/useGame';

export default function Gameplay({ onNavigate, difficulty }) {
    const { deck, currentScore, highScore, gameState, handleTileClick, restart } = useGame(difficulty);

    return (
        <div className="game-wrapper">
            <div className="hud-panel">
                <div className="hud-item">Points: {currentScore}</div>
                <button className="exit-btn" onClick={() => onNavigate(VIEW_MODES.HOME)}>Give Up</button>
                <div className="hud-item">Record: {highScore}</div>
            </div>

            <div className="board-container">
                {deck.map(w => (
                    <MemoryTile
                        key={w.data.id}
                        item={w}
                        onSelect={handleTileClick}
                        isUnlocked={true}
                    />
                ))}
            </div>

            {gameState !== null && gameState !== 0 && (
                <div className="result-overlay">
                    <div className={`result-card ${gameState === 1 ? 'victory' : 'defeat'}`}>
                        <h2>{gameState === 1 ? 'Mission Complete' : 'Game Over'}</h2>
                        <div className="action-buttons">
                            <button onClick={restart}>Try Again</button>
                            <button onClick={() => onNavigate(VIEW_MODES.HOME)}>Menu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

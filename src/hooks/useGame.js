import { useState, useEffect } from 'react';
import { weaponData } from '../data/weapons';
import { GAME_STATE, LEVEL_CONFIG } from '../config/settings';
import { extractRandomBatch, randomizeOrder } from '../lib/array-helpers';
import { storage } from '../lib/storage';

/**
 * @typedef {Object} GameState
 * @property {Array<any>} deck
 * @property {Array<string>} history
 * @property {number} currentScore
 * @property {number} highScore
 * @property {number} gameState
 */

/**
 * @param {string} difficulty
 * @returns {GameState}
 */

function getInitialGameState(difficulty) {
    const scoreKey = `hs_${difficulty}`;

    return {
        deck: extractRandomBatch(
            weaponData,
            LEVEL_CONFIG[difficulty]
        ),
        history: [],
        currentScore: 0,
        highScore: Number(storage.get(scoreKey, 0)),
        gameState: GAME_STATE.ACTIVE
    };
}

export function useGame(difficulty) {
    /** @type {[GameState, Function]} */
    const [state, setState] = useState(() => getInitialGameState(difficulty));

    useEffect(() => {
        setState(getInitialGameState(difficulty));
    }, [difficulty]);

    const {
        deck,
        history,
        currentScore,
        highScore,
        gameState
    } = state;

    const handleTileClick = (item) => {
        const id = item.data.id;

        if (history.includes(id)) {
            setState(prev => ({
                ...prev,
                gameState: GAME_STATE.DEFEAT
            }));
            return;
        }

        const nextScore = currentScore + 1;
        const isVictory = nextScore === deck.length;

        storage.addUnique('collectedCards', id);

        if (nextScore > highScore) {
            storage.set(`hs_${difficulty}`, nextScore);
        }

        setState(prev => ({
            ...prev,
            history: [...prev.history, id],
            currentScore: nextScore,
            highScore: Math.max(prev.highScore, nextScore),
            gameState: isVictory ? GAME_STATE.VICTORY : prev.gameState,
            deck: isVictory ? prev.deck : randomizeOrder(prev.deck)
        }));
    };

    const restart = () => {
        setState(getInitialGameState(difficulty));
    };

    return {
        deck,
        currentScore,
        highScore,
        gameState,
        handleTileClick,
        restart
    };
}
